module.exports = class Restaurant {

    constructor(name, image, city) {
        if(!name) throw new Error('restaurant must have a name')
        this.name = name
        this.image = image
        this.city = city
        this.menus =[]
        this.ratings = []
    }

    addMenu(menuObj) {
        this.menus.push(menuObj)
    }

    deleteMenu(menuObj) {
        const index = this.menus.indexOf(menuObj)
        this.menus.splice(index, 1)
    }

    addRating(ratingObj) {
        this.ratings.push(ratingObj)
    }

    getAvgRating(ratings) {
        //use reduce function to get the sum of the object array
        const sum = this.ratings.reduce((acc, val) => acc + val.rating, 0)
        //get the length of the array
        const len = this.ratings.length
        return Math.round(sum/len)
    }

}