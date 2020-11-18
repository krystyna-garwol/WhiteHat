const db = require("./db")
class Restaurant {
    static findAll = () => {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM restaurants;', async function (err, rows) {
                if (err) return reject(err)
                const restaurants = await Promise.all(rows.map(row => new Restaurant(row)))
                resolve(restaurants)
            })
        })
    }
    constructor(data) {
        const restaurant = this
        restaurant.id = data.id
        restaurant.name = data.name
        restaurant.image = data.image
        restaurant.menus =[]
        if(data.id) {
            return new Promise((resolve, reject) => {
                db.all('SELECT * FROM menus WHERE restaurant_id=?;', [restaurant.id], async function (err, rows) {
                    restaurant.menus = await Promise.all(rows.map(row => new Menu(row)))
                    resolve(restaurant)
                })
            })
        } else {
            return new Promise((resolve, reject) => {
                db.run('INSERT INTO restaurants(name, image) VALUES(?,?);', [restaurant.name, restaurant.image], function (err) {
                    restaurant.id = this.lastID
                    resolve(restaurant)
                })
            })
        }
    }

    async addMenu(title) {
        const menu = await new Menu({title: title, restaurant_id: this.id})
        this.menus.push(menu)
    }
}


class Menu {
    static findAll = () => {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM menus;', async function (err, rows) {
                if (err) return reject(err)
                const menus = await Promise.all(rows.map(row => new Menu(row)))
                resolve(menus)
            })
        })
    }
    constructor(data) {
        const menu = this
        menu.id = data.id
        menu.title = data.title
        menu.items =[]
        if (data.id) {
            return new Promise((resolve, reject) => {
                db.all('SELECT * FROM items WHERE menu_id=?;', [menu.id], async function(err, rows) {
                    menu.items = await Promise.all(rows.map(row => new Item(row)))
                    resolve(menu)
                })
            })
        } else {
            return new Promise((resolve, reject) => {
                db.run('INSERT INTO menus(title, restaurant_id) VALUES(?,?);', [menu.title, Restaurant.restaurant_id], function (err) {
                    menu.id = this.lastID
                    resolve(menu)
                })
            })
        }
    }

    async addItem(name, price) {
        const item = await new Item({name: name, price: price, menu_id: this.id})
        this.items.push(item)
    }
}

class Item {
    static findAll = () => {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM items;', async function (err, rows) {
                if (err) return reject(err)
                const items = await Promise.all(rows.map(row => new Item(row)))
                resolve(items)
            })
        })
    }
    constructor(data) {
        const item = this
        item.id = data.id
        item.name = data.name
        item.price = data.price
        if (data.id) {
            return Promise.resolve(item)
        } else {
            return new Promise((resolve, reject) => {
                db.run('INSERT INTO items(name, price, menu_id) VALUES(?,?,?);', [item.name, item.price, Menu.menu_id], function (err) {
                    item.id = this.lastID
                    resolve(item)
                })
            })
        }
    }
}


module.exports = {Restaurant, Menu, Item}