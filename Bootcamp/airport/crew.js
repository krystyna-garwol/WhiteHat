const Person = require('./person')

class Crew extends Person {
    constructor(name) {
        super(name);
    }

    crossCheck(crewObj) {
        return crewObj instanceof Crew
    }
}

module.exports = Crew;