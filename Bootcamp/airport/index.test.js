const Bag = require('./bag')
const Person = require('./person')
const Plane = require('./plane')
const Airport = require('./airport')
const Passenger = require('./passenger')
const Crew = require('./crew')

//BAG testing
describe('Bag', () => {
    test('Bag should have a weight', () => {
        const bag = new Bag(12)
        expect(() => new Bag()).toThrowError('bag must have a weight')
    })
    //Below test could be potentially used instead of the above
    // test('not to be null', () => {
    //     expect(new Bag()).not.toBeNull();
    // })
    test('Bag weight should be under 25kg',() => {
        const bag = new Bag(24)
        expect(bag.weight).toBeLessThan(25)
    })
})

//PERSON testing
describe('Person', () => {
    test('Person should have a name', () => {
        const person = new Person('Anna')
        expect(() => new Person()).toThrowError('passenger must have a name')
    })
    test('Person has a bag', () => {
        const person = new Person('Anna')
        const bag = new Bag(16)
        person.addBag(bag)
        expect(person.bags[0].weight).toBe(16);
        expect(person.bags.length).toBe(1)
    })
    test('Only 2 bags allowed', () => {
        const person = new Person('Anna')
        const bag1 = new Bag(16)
        const bag2 = new Bag(20)
        person.addBag(bag1, bag2, new Bag(20))
        expect(person.bags.length).toBe(3)
    })
})

//PLANE Testing
describe('Plane', () => {
    const plane = new Plane('LAX')
    test('destination included', () => {
        expect(() => new Plane()).toThrowError('Flight destination must be stated')
    })
    test.skip('there must be at least 4 passengers', () => {
        const plane = new Plane('US LAX')
        const person1 = new Person('Anna')
        const person2 = new Person('Julia')
        const person3 = new Person('Lauren')
        const person4 = new Person('Mark')
        const person5 = new Person('Paul')
        plane.boardPass(person1, person2, person3, person4, person5)
        expect(plane.passengers.length).toBeGreaterThan(4)
    })
    test('if passenger can be added',() => {
        const plane = new Plane('WAW')
        plane.boardPass(new Passenger('mark'))
        expect(plane.passengers.length).toBe(1)
    })
    test('if crew member can be added',() => {
        const plane = new Plane('UKR')
        plane.boardPass(new Crew('Julie'))
        plane.boardPass(new Crew('Mark'))
        expect(plane.crew.length).toEqual(2)
    })
})

//AIRPORT testing
describe('Airport', () => {
    test('airport should have a name', () => {
        const airport = new Airport('LAX')
        expect(() => new Airport()).toThrowError('Airport name must be stated')
    })
    test('can land planes', () => {
        const airport = new Airport('LAX')
        const plane = new Plane('LAX')
        airport.landPlanes(plane)
        expect(airport.planes.length).toBe(1)
    })
    test('airports to know about each other', () => {
        expect(Airport.all.length).toBe(2)
    })
    test.skip("all test working up tp the bag", () => {
        const person1 = new Person('Anna')
        person1.addBag(new Bag(16))
        const plane = new Plane('LAX')
        plane.boardPass(person1)
        const airport = new Airport('LAX')
        airport.landPlanes(plane)
        expect(airport.planes[0].passengers[0].bags[0].weight).toBe(16);
    })
    test('planes can fly between airports', () => {
        const airport1 = new Airport('CDG')
        const airport2 = new Airport('TEX')
        const plane = new Plane('TEX')
        airport1.takeOff(plane)
        airport2.landPlanes(plane)
        expect(airport1.planes.length).toBe(0)
        expect(airport2.planes.length).toBe(1)
    });
})


//PASSENGER testing
describe('Passenger', () => {
    test('is instance of Passenger', () => {
        const anna = new Passenger('Anna')
        expect(anna instanceof Passenger).toBeTruthy()
    })
    test('check if the pasenger bag was added', () => {
        const julia = new Passenger('Julia')
        julia.addBag(new Bag(10))
        expect(julia.bags.length).toBe(1)
        expect(julia.bags[0].weight).toEqual(10)
    })
    test('check if the passenger name was recorded', () => {
        const stan = new Passenger('Stan')
        expect(() => new Passenger()).toThrowError('passenger must have a name')
    })
    test('check if the pasenger has a passport', () => {
        const stan = new Passenger('Stan')
        stan.hasPassport('EK12345')
        expect(stan.passports.length).toEqual(1)
    })
    test('can call an attendant', () => {
        const mark = new Passenger('Mark')
        expect(mark.callAttendant()).toBe('Hello, can I have a coffee please')
    })
})

//CABIN CREW testing
describe('crew', () => {
    test('check if the crew member name was recorded', () => {
        const anna = new Crew('Anna')
        expect(() => new Crew()).toThrowError('passenger must have a name')
    })
})


//ASYNC testing
describe('Async', () => {
    //callback function
    // test('airports have a state', (done) => {
    //     const airport = new Airport('Mc Donald Airport')
    //     airport.getInfo((err, data) => {
    //         expect(err).toBeNull()
    //         expect(data.state).toBe('Tennessee')
    //         done()
    //     })
    // })

    //promises
    // test('airports have a state', () => {
    //     const airport = new Airport('Mc Donald Airport')
    //     return airport.getInfo()
    //         .then(data => {
    //             expect(data.state).toBe('Tennessee')
    //         })
    //         .catch(err => {
    //             expect(err).toBeNull()
    //         })
    // })

    //async await
    //to be done still
    test('airports have a city', async () => {
        const mda = new Airport('Mc Donald Airport')
        const airport = await mda.getInfo()
        expect(airport.state).toBe('Tennessee')
    });
})