const { Restaurant, Menu, Item, db } = require('./models')
const data = require('./restaurants.json')

beforeAll(async () => {
    await db.sync().then(async () => {
        const taskQueue = data.map(async (json_restaurant) => {
                const restaurant = await Restaurant.create({name: json_restaurant.name, image: json_restaurant.image})
                const menus = await Promise.all(json_restaurant.menus.map(async (_menu) => {
                    const items = await Promise.all(_menu.items.map(({name, price}) => Item.create({name, price})))
                    const menu = await Menu.create({title: _menu.title})
                    return menu.setItems(items)
                }))
                return await restaurant.setMenus(menus)
            })
        return Promise.all(taskQueue)
    })
})

describe('Restaurant', () => {
    test('restaurants are created', async () => {
        const centoUno = await Restaurant.create({name: 'Cento Uno', image: 'image.url'})
        const frenchTable = await Restaurant.create({name: 'French Table', image: 'image.url'})
        const restaurants = await Restaurant.findAll()
        expect(centoUno.id).toBe(9)
        expect(frenchTable.name).toBe('French Table')
        expect(restaurants.length).toBe(10)
    })
})

describe('Menu', () => {
    test('menus are created', async () => {
        const sideMenu = await Menu.create({title: 'Side Menu'})
        const brunchMenu = await Menu.create({title: 'Brunch Menu'})
        const menus = await Menu.findAll()
        expect(sideMenu.id).toBe(19)
        expect(brunchMenu.title).toBe('Brunch Menu')
        expect(menus.length).toEqual(20)
    })
})

describe('Item', () => {
    test('items can be created', async () => {
        const fries = await Item.create({name: 'Fries', price: 4})
        const veggies = await Item.create({name: 'Veggies', price: 5})
        const items = await Item.findAll()
        expect(veggies.id).toBe(86)
        expect(fries.name).toBe('Fries')
        expect(items.length).toEqual(86)
    })
})

describe('Relationships', () => {
    test('restaurant has menus and items', async () => {
        const restaurant = await Restaurant.findOne({
            where: {
                name: 'Bayroot'
            }, 
            include: [
                {all: true, nested: true}
            ]
        })

        const menu = await Menu.findOne({
            where: {
                title: 'Grill'
            },
            include: 'items'
        })
        expect(restaurant.name).toBe('Bayroot')
        expect(restaurant.menus[0].title).toBe('Grill')
        expect(menu.items[0].name).toBe('Houmous Shawarma Lamb')
        expect(restaurant.menus[0].items[0].name).toBe('Houmous Shawarma Lamb')
    })
})
