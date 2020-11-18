class Bag {
    constructor(weight) {
        if(!weight) throw new Error('bag must have a weight')
        if(weight > 25) throw new Error('bag is too heavy')
        this.weight = weight
    }
}

module.exports = Bag;