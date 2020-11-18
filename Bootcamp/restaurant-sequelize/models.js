const {Sequelize, DataTypes, Model} = require('sequelize')
const path = require('path')
const db = process.env.NODE_ENV === 'test'
    ? new Sequelize('sqlite::memory:', null, null, {dialect: 'sqlite', logging: false})
    : new Sequelize({dialect: 'sqlite', storage: path.join(__dirname, 'data.db')})


//---Restaurant---
class Restaurant extends Model {}
Restaurant.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING
}, {sequelize: db})


//---Menu---
class Menu extends Model {}
Menu.init({
    title: DataTypes.STRING
}, {sequelize: db})


//---Item---
class Item extends Model {}
Item.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
}, {sequelize: db})

//--Relationships
Restaurant.hasMany(Menu, {as: 'menus'})
Menu.belongsTo(Restaurant)
Menu.hasMany(Item, {as: 'items'})
Item.belongsTo(Menu)

module.exports = {Restaurant, Menu, Item, db}