const Item = require('./item')
const Menu = require('./menu')
const Restaurant = require('./restaurant')
const Rating = require('./rating')


const soup1 = new Item('Tomato Soup', '5£')
const soup2 = new Item('Leek Soup', '6£')
const soup3 = new Item('Potato Soup', '4£')
const soup4 = new Item('Cucumber Soup', '3£')
const soup5 = new Item('Onion Soup', '7£')

const setMenu = new Menu('Set Menu', 'iconS')
const lunchMenu = new Menu('Lunch Menu', 'iconL')
const drinksMenu = new Menu('Drinks Menu', 'iconD')
const centoUno = new Restaurant('Cento Uno', 'img', 'Surbiton')

const rating1 = new Rating(4)
const rating2 = new Rating(5)
const rating3 = new Rating(5)
const rating4 = new Rating(3)
centoUno.addRating(rating1)
centoUno.addRating(rating2)
centoUno.addRating(rating3)
centoUno.addRating(rating4)
//console.log(centoUno.ratings)
console.log(centoUno.getAvgRating(centoUno.ratings))

