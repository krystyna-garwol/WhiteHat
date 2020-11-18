const crypto = require('crypto')

class Task {
    static all = []
    constructor(desc) {
        this.id = Math.random()
        this.desc = desc 
        this.status = 0 
        this.complete = false
        this.constructor.all.push(this)
    }
}

module.exports = Task 