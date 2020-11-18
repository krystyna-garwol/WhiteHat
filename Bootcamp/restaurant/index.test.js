const Item = require('./item')
const Menu = require('./menu')
const Restaurant = require('./restaurant')
const Rating = require('./rating')

//RESTAURANT testing
describe('Restaurant', () => {
    const centoUno = new Restaurant('Cento Uno')
    test('should have a name', () => {
        expect(() => new Restaurant()).toThrowError('restaurant must have a name')
    })
})

//MENU testing
describe('Menu', () => {
    const setMenu = new Menu('Set Menu', 'iconS')
    const lunchMenu = new Menu('Lunch Menu', 'iconL')
    const drinksMenu = new Menu('Drinks Menu', 'iconD')
    const centoUno = new Restaurant('Cento Uno')
    test('should have a title', () => {
        expect(() => new Menu()).toThrowError('menu must have a title')
    })
    test('should add a menu',() => {
        centoUno.addMenu(setMenu)
        centoUno.addMenu(drinksMenu)
        centoUno.addMenu(lunchMenu)
        expect(centoUno.menus.length).toEqual(3)
    })
    test('should remove a menu', () => {
        centoUno.deleteMenu(drinksMenu)
        expect(centoUno.menus.length).toBe(2)
    })
})

//MENU ITEM testing
describe('Menu Item', () => {
    const soup1 = new Item('Tomato Soup', '5£')
    const soup2 = new Item('Leek Soup', '6£')
    const soup3 = new Item('Potato Soup', '4£')
    const soup4 = new Item('Cucumber Soup', '3£')
    const soup5 = new Item('Onion Soup', '7£')
    const lunchMenu = new Menu('Lunch Menu', 'iconL')
    test('should have a name', () => {
        expect(() => new Item()).toThrowError('menu item must have a name')
    })
    test('should add items to the menu', () => {
        lunchMenu.addItem(soup1, soup2, soup3)
        expect(lunchMenu.items.length).toEqual(3)
    })
    test('should be able to update an item name', () => {
        lunchMenu.updateItemTitle(soup2, soup4)
        expect(lunchMenu.items[1].name).toBe('Cucumber Soup')
    })
    test('should be able to update an item price', () => {
        lunchMenu.updateItemPrice(soup2, soup4)
        expect(lunchMenu.items[1].price).toBe('3£')
    })
    test('should be able to replace one whole item with another one', () => {
        lunchMenu.replaceItem(soup3, soup5)
        expect(lunchMenu.items[2].name).toContain('Onion')
    })
    test('should remove item from the menu', () => {
        lunchMenu.deleteItem(soup2)
        expect(lunchMenu.items.length).toBe(2)
    })
})

//RATING testing
describe('Rating', () => {
    const rating1 = new Rating(4)
    const rating2 = new Rating(5)
    const rating3 = new Rating(5)
    const rating4 = new Rating(3)
    const centoUno = new Restaurant('Cento Uno')
    centoUno.addRating(rating1)
    test('can add rating', () => {
        expect(centoUno.ratings.length).toEqual(1)
    })
    test('returns average rating', () => {
        centoUno.addRating(rating1)
        centoUno.addRating(rating2)
        centoUno.addRating(rating3)
        centoUno.addRating(rating4)
        expect(centoUno.getAvgRating(centoUno.ratings)).toBe(4)
    })

})