class User {

    constructor(name) {
        if(!name) throw new Error('User must have a name')
        this.name = name;
    }

    hireScooter(scooterObj) {
        scooterObj.charged = true;
    }

    returnScooter(scooterObj) {
        scooterObj.charged = false;
    }

}

module.exports = User;