const Person = require('./person')

class Passenger extends Person {
    constructor(name) {
        super(name);
    }

    callAttendant() {
        return 'Hello, can I have a coffee please'
    }
}

module.exports = Passenger;

