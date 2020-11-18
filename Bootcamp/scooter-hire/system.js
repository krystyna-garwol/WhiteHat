class System {

    rentals = []

    loginRental(userObj, scooterObj) {
        const pair = {...userObj, ...scooterObj}
        this.rentals.push(pair);
    }

    loginCollection(userObj, scooterObj) {
        const removal = {...userObj, ...scooterObj}
        const index = this.rentals.findIndex(i => i.scooterId == removal.scooterId);
        this.rentals.splice(index, 1)
    }

}

module.exports = System;