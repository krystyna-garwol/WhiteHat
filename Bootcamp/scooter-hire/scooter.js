class Scooter {

    constructor(scooterId) {
        if(!scooterId) throw new Error('Scooter must have id')
        this.scooterId = scooterId
        this.charged = false;
    }

}

module.exports = Scooter;