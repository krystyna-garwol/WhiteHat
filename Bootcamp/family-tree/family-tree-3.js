//Using CONSTRUCTOR function
function Gen(name, parents =[]) {
    this.name = name;
    this.parents = parents;
    this.childOf = function() {
        return this.parents.map(parent => parent).join(' and ');
    }
}

const familyTree = [
    new Gen('Krystyna', ['Zofia', 'Andrew']),
    new Gen('Zofia', ['Stan', 'Julia']),
    new Gen('Julia', ['Joseph', 'Anna'])
]

console.log(familyTree.map(gen => gen.childOf()).join(' & '));