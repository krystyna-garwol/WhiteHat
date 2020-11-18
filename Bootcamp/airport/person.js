class Person {
    constructor(name) {
        if(!name) throw new Error('passenger must have a name')
        this.name = name
        this.bags = []
        this.passports = []
    }

    //spread operator allows us to pass in multiple objects as arguments
    addBag(...bagObj) {
        this.bags.push(...bagObj)
        return `${this.name} bag was checked in`
    }

    hasPassport(passport) {
        this.passports.push(passport)
        return `${this.name} has passport: ${passport}`
    }
    
}

module.exports = Person;