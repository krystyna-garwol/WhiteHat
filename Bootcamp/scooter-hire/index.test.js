const Scooter = require('./scooter')
const User = require('./user')
const System = require('./system')
const Station = require('./station')

//USER testing
describe('User', () => {
    const user1 = new User('Anna')
    const scooter1 = new Scooter('1A')
    test('Must have a name', () => {
        expect(() => new User()).toThrowError('User must have a name')
    })
    test('Is scooter charged when hiring', () => {
        user1.hireScooter(scooter1)
        expect(scooter1.charged).toBeTruthy
    })
    test('Is scooter empty when returned', () => {
        user1.returnScooter(scooter1)
        expect(scooter1.charged).toBeFalsy
    })
})

//SCOOTER testing
describe('Scooter', () => {
    const scooter1 = new Scooter('1')
    test('must have id in the system', () => {
        expect(() => new Scooter()).toThrowError('Scooter must have id')
    })
})

//SYSTEM testing
describe('System', () => {
    const user1 = new User('Anna')
    const user2 = new User('Julia')
    const scooter1 = new Scooter('1A')
    const scooter2 = new Scooter('1B')
    const system = new System()

    test('Must be able to login user and scooter as one object in the system', ()=> {
        system.loginRental(user1, scooter1)
        system.loginRental(user2, scooter2)
        expect(system.rentals.length).toBe(2)
    })
    test('Must be able to remove the scooter once returned', () => {
        system.loginCollection(user2, scooter2)
        expect(system.rentals.length).toBe(1)
    })
})

//STATION testing
describe('Station', () => {
    const station = new Station()
    const scooter = new Scooter('1C')
    test('Station can charge a scooter', () => {
        return station.charge(scooter)
        .then(scooter => {
            expect(scooter.charged).toBeTruthy
        })
    })
})