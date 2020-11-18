//LITERAL NOTATION but all generations in one object
const familyTree = {
generations: [
    {
        name: 'Krystyna',
        parents: [
            {
                name: 'Zofia',
                age: 60
            },
            {
                name: 'Andrew',
                age: 66
            }
        ]
    },
    {
        name: 'Zofia',
        parents: [
            {
                name: 'Stan',
                age: 'deceased'
            },
            {
                name: 'Julia',
                age: 'deceased'
            }
        ]
    },
    {
        name: 'Julia',
        parents: [
            {
                name: 'Joseph',
                age: 'deceased'
            },
            {
                name: 'Anna',
                age: 'deceased'
            }
        ]
    }
],
childOf: function() {
    return this.generations.map(gen => gen.parents.map(parent => `${parent.name} is ${parent.age}`).join(' & ')).join(' + ');
}
}

console.log(familyTree.childOf());


