const loader = require('./index')
const db = require('./db')
const {Restaurant, Menu, Item} = require('./models')


beforeAll(done => {
    db.exec(`
        CREATE TABLE restaurants(id INTEGER PRIMARY KEY, name TEXT, image TEXT);
        CREATE TABLE menus(id INTEGER PRIMARY KEY, title TEXT, restaurant_id INTEGER); 
        CREATE TABLE items(id INTEGER PRIMARY KEY, name TEXT, price FLOAT, menu_id INTEGER);
    `, loader.bind(null, done))
});


describe('loader', () => {
    test('should add restaurants to the database', (done) => {
        loader(() => {
            db.get('SELECT COUNT(id) AS total FROM restaurants;', function(err, row){
                //objets in databases are represented as rows
                //we should have 8 restaurants objects in our database
                expect(row.total).toBe(8)
                done()
            })
        });
    });
    test('should add menus to the restaurants', (done) => {
        loader(() => {
            db.get('SELECT COUNT(id) AS total FROM menus;', function(err, row){
                expect(row.total).toBe(18)
                done()
            })
        })
    });
    test('should add items to the menus', (done) => {
        loader(() => {
            db.get('SELECT COUNT(id) AS total FROM items;', function(err, row){
                expect(row.total).toBe(84)
                done()
            })
        })
    });
});



describe('Restaurant', () => {
    test('when its created it is added to the database', async () => {
        const restaurant = await new Restaurant({name: 'Fresh and Wild', image: 'image.url'})
        expect(restaurant.id).toBe(9)
    })
    test('when you fetch a restaurant from the database you are returned an instance of the Restaurant class', async () => {
        const restaurants = await Restaurant.findAll()
        expect(Array.isArray(restaurants)).toBeTruthy()
        expect(restaurants[8] instanceof Restaurant).toBeTruthy()
        expect(restaurants[8].name).toBe('Fresh and Wild')
        expect(restaurants[0].id).toBe(1)
    })
})

describe('Menu', () => {
    test('when its created it is added to the Fresh and Wild new Restaurant', async () => {
        const menu = await new Menu({title: 'Xmas Menu', restaurant_id: 9})
        expect(menu.id).toBe(19)
    })
    test('when you fetch a menu from the database you are returned an instance of the Menu class', async () => {
        const menus = await Menu.findAll()
        expect(Array.isArray(menus)).toBeTruthy()
        expect(menus[18] instanceof Menu).toBeTruthy()
        expect(menus[18].title).toBe('Xmas Menu')
        expect(menus[18].id).toBe(19)
    })
})

describe('Item', () => {
    test('when its created it is added to the Fresh and Wild new Menu', async () => {
        const item = await new Item({name: 'Duck in cranberry sauce', price: 20, menu_id: 19})
        expect(item.id).toBe(85)
    })
    test('when you fetch an item from the database you are returned an instance of the Item class', async () => {
        const items = await Item.findAll()
        //console.log(items)
        expect(Array.isArray(items)).toBeTruthy()
        expect(items[84] instanceof Item).toBeTruthy()
        expect(items[84].name).toBe('Duck in cranberry sauce')
        expect(items[84].id).toBe(85)
    })
})

describe('ORM', () => {
    test('able to access the price of the item in the menu of restaurant', async () => {
        const centoUno = await new Restaurant({name: 'Cento Uno', image: 'image.url'})
        await centoUno.addMenu('Sides Menu', 10)
        const sideMenu = centoUno.menus[0]
        await sideMenu.addItem('Fries', 3)
        expect(centoUno.menus[0].title).toBe('Sides Menu')
        expect(centoUno.menus[0].items[0].price).toEqual(3)
    })
})



