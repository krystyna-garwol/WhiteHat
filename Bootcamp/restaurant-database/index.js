const db = require('./db')
const restaurants = require('./restaurants.json')

//recursive function that will call itself until specified base case happens
function insertRestaurants(restaurants, callback) {
    //base case for the recursive function to stop running
    if (restaurants.length === 0) return callback()
    //we are using pop in here but we could also use shift to extract 1 object from the json file and recursively one by one input it into database
    const restaurant = restaurants.pop()
    //each time the recursion function is running we are adding 1 object to database and remove 1 from the json file, reducing the length of the json file array, until there are no objects left, this is when recursive function stops running
    db.run('INSERT INTO restaurants(name, image) VALUES(?,?);', [restaurant.name, restaurant.image], function(err) {
        //we need to get the restaurant ID to link it to the menu that we will want to add to the restaurant, it's like JOIN statement that we used in sql queries
            const restaurant_id = this.lastID
            insertMenus(restaurant.menus, restaurant_id, function() {
                insertRestaurants(restaurants, callback)
            }) 
        }
    )
};


function insertMenus(menus, restaurants, callback) {
    if (menus.length === 0) return callback()
    const menu = menus.pop()
    db.run('INSERT INTO menus(title, restaurant_id) VALUES(?,?);', [menu.title, restaurants.restaurant_id], function(err) {
        const menu_id = this.lastID
        insertItems(menu.items, menu_id, function() {
            insertMenus(menus, restaurants, callback)
        })
    })
};


function insertItems(items, menus, callback) {
    if (items.length === 0) return callback()
    const item = items.pop()
    db.run('INSERT INTO items(name, price, menu_id) VALUES(?,?,?);', [item.name, item.price, menus.menu_id], function(err) {
        insertItems(items, menus, callback)
    })
};


function loader(callback) {
    insertRestaurants(restaurants, callback)
};

module.exports = loader