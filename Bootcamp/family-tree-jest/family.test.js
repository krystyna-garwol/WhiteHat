const person = require('./family');

describe('family', () => {
    test('should print the name of my family', () => {
        expect(person.firstName).toBe('Krystyna');
    });
    test('should return first sibling name', () => {
        expect(person.siblings[0].name).toBe('Renata');
    });
    test('should return correct name of one parent', () => {
        expect(person.childOf()).toContain('Andrew');
    });
    test('siblings should be no more than 3', () => {
        expect(person.siblings.length).toBeLessThan(4);
    });
    test('expect parents to be always present', () => {
        expect(person.parents.length).not.toBe(0);
    });
    test('pet must include cat', () => {
        expect(person.pet).toMatch(/cat/);
    });
    test('childOf function should always return values', () => {
        expect(person.childOf()).not.toBeNull();    
    });
    test('the parents data is correct', () => {
        expect(person.parents.map(parent => parent.name)).toEqual(['Zofia', 'Andrew']);
    })
})