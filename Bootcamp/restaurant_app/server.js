const express = require('express')
const Handlebars = require('handlebars')
const app = express()
const expressHandlebars = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const { Restaurant, Menu, Item, sequelize } = require('./models')
const data = require('./restaurants.json')
const { restart } = require('nodemon')
const hbs = expressHandlebars.create({
    helpers: {
        pluralize: function (menus) {
            if(menus.length > 1) {
                return 'Menus'
            } else {
                return 'Menu'
            }
        }
    }, 
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})

app.use(express.static('public'))
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


//--------------------ROUTING--------------------//

//CRUD - restaurants
//READ - all
app.get('/', async (req, res) => {
    const restaurants = await Restaurant.findAll({
        include: 'menus'
    })
    //res.render(filename, data)
    res.render('index', {restaurants})
})

//READ - single restaurant
app.get('/restaurants/:id', async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id)
    const menus = await restaurant.getMenus({
        include: 'items'
    })
    res.render('restaurant', {restaurant, menus})
})

//CREATE
app.post('/restaurants', async (req, res) => {
    const restaurant = await Restaurant.create(req.body)
    //res.redirect(someURL)
    res.redirect('/')
})

//UPDATE
//1. We need to first get the filename where the update will be completed
//2. Then we will complete update using a form which means post http request
app.get('/restaurants/:id/edit', async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id)
    res.render('restaurant-edit', {restaurant})
})
app.post('/restaurants/:id', async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id)
    await restaurant.update(req.body)
    res.redirect(`/restaurants/${restaurant.id}`)
})

//DELETE
app.get('/restaurants/:id/delete', async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id)
    await restaurant.destroy()
    res.redirect('/')
})


//CRUD - menus
//CREATE
app.post('/restaurants/:id/menus', async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id)
    await restaurant.createMenu(req.body)
    res.redirect(`/restaurants/${restaurant.id}`)
})

//UPDATE
app.get('/restaurants/:id/menus/:menu_id/edit', async (req, res) => {
    const menu = await Menu.findByPk(req.params.menu_id)
    res.render('menu-edit', {menu})
})
app.post('/restaurants/:id/menus/:menu_id', async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id)
    const menu = await Menu.findByPk(req.params.menu_id)
    await menu.update(req.body)
    res.redirect(`/restaurants/${restaurant.id}`)
})

//DELETE
app.get('/restaurants/:id/menus/:menu_id/delete', async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id)
    const menu = await Menu.findByPk(req.params.menu_id)
    await menu.destroy()
    res.redirect(`/restaurants/${restaurant.id}`)
})


//CRUD - items
//CREATE
app.get('/restaurants/:id/menus/:menu_id/items', async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id)
    const menu = await Menu.findByPk(req.params.menu_id)
    res.render('item-add', {restaurant, menu})
})
app.post('/restaurants/:id/menus/:menu_id/items', async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id)
    const menu = await Menu.findByPk(req.params.menu_id)
    await menu.createItem(req.body)
    res.redirect(`/restaurants/${restaurant.id}`)
})

//UPDATE
app.get('/restaurants/:id/menus/:menu_id/items/:item_id/edit', async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id)
    const menu = await Menu.findByPk(req.params.menu_id)
    const item = await Item.findByPk(req.params.item_id)
    res.render('item-edit', {restaurant, menu, item})
})
app.post('/restaurants/:id/menus/:menu_id/items/:item_id', async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id)
    const item = await Item.findByPk(req.params.item_id)
    await item.update(req.body)
    res.redirect(`/restaurants/${restaurant.id}`)
})

//DELETE
app.get('/restaurants/:id/menus/:menu_id/items/:item_id/delete', async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id)
    const item = await Item.findByPk(req.params.item_id)
    await item.destroy()
    res.redirect(`/restaurants/${restaurant.id}`)
})


//Other pages
app.get('/about', (req, res) => {
    res.render('about')
})
app.get('/contact', (req, res) => {
    res.render('contact')
})


app.listen(3000, async () => {
    sequelize.sync().then(async () => {
        const restaurants = await Restaurant.findAll()
        if(restaurants.length > 0) return
        const taskQueue = data.map(async (json_restaurant) => {
                const restaurant = await Restaurant.create({name: json_restaurant.name, image: json_restaurant.image})
                const menus = await Promise.all(json_restaurant.menus.map(async (_menu) => {
                    const items = await Promise.all(_menu.items.map(({name, price}) => Item.create({name, price})))
                    const menu = await Menu.create({title: _menu.title})
                    return menu.setItems(items)
                }))
                return await restaurant.setMenus(menus)
            })
        await Promise.all(taskQueue).then(restaurants => {
            console.log(JSON.stringify(restaurants, null, 2))
        }).catch(console.error)
    })
})