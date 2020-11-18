module.exports = class Menu {

    constructor(title, icon) {
        if(!title) throw new Error ('menu must have a title')
        this.title = title
        this.icon = icon
        this.items = []
    }

    addItem(...itemObj) {
        this.items.push(...itemObj)
    }

    deleteItem(itemObj) {
        const index = this.items.indexOf(itemObj)
        this.items.splice(index, 1)
    }

    replaceItem(itemObj, newItemObj) {
        const index = this.items.indexOf(itemObj)
        console.log(index)
        this.items[index] = newItemObj
    }

    updateItemTitle(itemObj, newItemObj) {
        const index = this.items.indexOf(itemObj)
        this.items[index].name = newItemObj.name
    }

    updateItemPrice(itemObj, newItemObj) {
        const index = this.items.indexOf(itemObj)
        this.items[index].price = newItemObj.price
    }
}