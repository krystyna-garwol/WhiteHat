//LITERAL NOTATION with 3 different objects, each object represents one generation
//generation 1
const gen1 = {
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
    ],
    childOf: function() {
        return this.parents.map(parent => `${parent.name} is ${parent.age} years old`).join(' & ');
    }
}
console.log(gen1.childOf());

//generation 2
const gen2 = {
    name: 'Zofia',
    parents: [
        {
            name: 'Stan'
        },
        {
            name: 'Julia'
        }
    ],
    childOf: function() {
        return this.parents.map(parent => parent.name).join(' & ');
    }
}
console.log(gen2.childOf());

//generation 3
const gen3 = {
    name: 'Julia',
    parents: [
        {
            name: 'Joseph'
        },
        {
            name: 'Anna'
        }
    ],
    childOf: function() {
        return this.parents.map(parent => parent.name).join(' & ');
    }
}

console.log(gen3.childOf());


