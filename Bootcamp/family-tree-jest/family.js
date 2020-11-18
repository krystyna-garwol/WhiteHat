const person = {
    firstName: 'Krystyna',
    lastName: 'Garwol',
    siblings: [
        {
            name: 'Renata',
            age: '30'
        },
        {
            name: 'George',
            age: 31
        },
        {
            name: 'Zuzana',
            age: 20
        }
    ],
    parents: [
        {
            name: 'Zofia',
            age: 60
        },
        {
            name: 'Andrew',
            age: 66
        }
    ],
    pet: 'I love cats',
    childOf: function() {
        return this.parents.map(parent => parent.name).join(' & ');
    }
}

module.exports = person;