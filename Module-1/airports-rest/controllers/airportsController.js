const airports = require("../airports.json");
const fs = require('fs');

const save = () => {
    fs.writeFile('./airports.json', JSON.stringify(airports, null, '\t'), err => {
        if (err) return console.log(err);
    })
}

const homepage = (req, res) => {
    res.send("This is the homepage for the airports.");
}

const getAirports = (req, res) => {
    const page = req.query.page;
    const pageSize = req.query.pageSize;
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    let airportsPaginated = airports.slice(startIndex, endIndex);
    if (!page) {
        res.status(200).send(airports);
    }
    res.status(200).send(airportsPaginated);
}

const getAirport = (req, res) => {
    const found = airports.find(airport => airport.icao === req.params.icao);
    (found) ? res.status(200).send(found) : res.status(404).send('Airport not found');
}

const addAirport = (req, res) => {
    const airport = req.body;
    if (Object.keys(req.body).length > 0) {
        airports.unshift(airport);
        save();
        res.status(201).send(airport);
    }
    res.status(400).send('Airport not created')
}

const updateAirport = (req, res) => {
    const updatedAirport = req.body;
    if (Object.keys(req.body).length > 0) {
        let found = airports.find(airport => airport.icao === req.params.icao);
        let foundIndex = airports.indexOf(found);
        airports.splice(foundIndex, 1, updatedAirport);
        save();
        res.status(200).send(updatedAirport);
    }
    res.status(404).send('Airport not found')
}

const deleteAirport = (req, res) => {
    let found = airports.find(airport => airport.icao === req.params.icao);
    if (found) {
        let foundIndex = airports.indexOf(found);
        airports.splice(foundIndex, 1);
    }
    save();
    (found) ? res.status(200).send(found) : res.status(404).send('Airport not found');
}

module.exports = { getAirports, getAirport, addAirport, updateAirport, deleteAirport, homepage }