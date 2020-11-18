module.exports = class Item {
    
    constructor(name, price) {
        if(!name) throw new Error('menu item must have a name')
        this.name = name
        this.price = price
    }
}