const Scooter = require('./scooter')
const User = require('./user')
const System = require('./system')
const Station = require('./station')


const user1 = new User('Anna')
const user2 = new User('Julia')
const user3 = new User('Mark')
const user4 = new User('Paul')
const scooter1 = new Scooter('1A')
const scooter2 = new Scooter('1B')
const scooter3 = new Scooter('1C')
const scooter4 = new Scooter('1D')
const system = new System()
const station = new Station('London Central')


// station.charge(scooter1).then(scooter => {
//     console.log(scooter.charged)
// })
system.loginRental(user1, scooter1)
system.loginRental(user2, scooter2)
system.loginRental(user3, scooter3)
system.loginRental(user4, scooter4)
console.log(system.rentals)
system.loginCollection(user3, scooter3)
console.log(system.rentals)