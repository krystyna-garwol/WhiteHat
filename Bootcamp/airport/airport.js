const Plane = require('./plane')
//To read JSON data from the file we can use fs node.js module
//And we need to first load it to our application
const fs = require('fs')
const { resolve } = require('path')
const { readFile } = require('fs/promises')

class Airport {
    //we need this array to be static so we can store airports in it
    static all = []

    constructor(name) {
        if(!name) throw new Error('Airport name must be stated')
        this.name = name
        this.planes = []
        this.constructor.all.push(this)
    }

    takeOff(planeObj) {
        //find the plane in the airport's planes array
        const index = this.planes.indexOf(planeObj)
        console.log(index)
        //remove the plane
        this.planes.splice(planeObj, 1)
    }

    //spread operator allows us to pass in multiple objects as arguments
    landPlanes(...planeObj) {
        this.planes.push(...planeObj)
    }

    //callback function
    // getInfo(callback) {
    //     fs.readFile('./airports.json', (err, data) => {
    //         const info = JSON.parse(String(data))
    //         const airport = info.find(obj => obj.name == this.name)
    //         callback(err, airport)
    //     })
    // }

    //promises
    // getInfo() {
    //     return new Promise((resolve, reject) => {
    //         fs.readFile('./airports.json', (err, data) => {
    //             if (err) return reject(err)

    //             const info = JSON.parse(String(data))
    //             const [airport] = Object.keys(info)
    //             .filter(key => info[key].name === this.name)
    //             .map(key => info[key])
    //             resolve(airport)
    //         })
    //     })
    // }

    //async await
    //to be done still
    async getInfo(){
        const data = await readFile('./airports.json')
        const info = JSON.parse(String(data))
        const airport = info.find(obj => obj.name === this.name)
        return airport 
    }

}

module.exports = Airport;
