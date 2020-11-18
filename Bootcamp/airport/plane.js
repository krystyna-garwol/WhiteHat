const Passenger = require('./passenger')
const Crew = require('./crew')

class Plane {
    constructor(destination) {
        if(!destination) throw new Error('Flight destination must be stated')
        //destinaton is our outbound flight
        this.destination = destination
        //inbound flight
        this.inbound = null
        this.passengers = []
        this.crew = []
    }

    //spread operator allows us to pass in multiple objects as arguments
    boardPass(personObj) {
        if(personObj instanceof Passenger)
        this.passengers.push(personObj)
        if(personObj instanceof Crew)
        this.crew.push(personObj)
    }
    // boardPass(...people) {
    //     people.map(personObj => {
    //         if(personObj instanceof Passenger) {
    //             this.passengers.push(personObj)
    //         } 
    //         if(personObj instanceof Crew) {
    //             this.crew.push(personObj)
    //         } 
    //     })
    // }
}

module.exports = Plane;