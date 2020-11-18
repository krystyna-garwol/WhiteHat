class Station {

    constructor(location) {
        this.location = location
    }

    charge(scooterObj) {
        return new Promise((resolve) => {
            setTimeout((scooterObj) => {
                scooterObj.charged = true
                resolve(scooterObj)
            }, 2000, scooterObj)
        })
    }
   
}

module.exports = Station;