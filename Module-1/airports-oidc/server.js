const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const checkJwt = require('./middleware/jwt');
const cors = require('cors');
const { getAirports, getAirport, addAirport, updateAirport, deleteAirport, homepage } = require("./controllers/airportsController");
const { getUsers, getUser, deleteUser, updateUser, addUser } = require("./controllers/usersController");

// connect to mongo
mongoose.connect(
  "mongodb://localhost/users",
  {
    useNewUrlParser: true,
  },
  () => {
    console.log("Connected to MongoDB");
  }
);

app.use(bodyParser.json())

//permit our domans to load our resources
app.use(cors())


//Airports routes
app.get("/", homepage)

app.get("/airports", checkJwt, getAirports);

app.get("/airports/:icao", checkJwt, getAirport)

app.post("/airports", checkJwt, addAirport)

app.put("/airports/:icao", checkJwt, updateAirport)

app.delete("/airports/:icao", checkJwt, deleteAirport)

//User routes
app.get('/users', getUsers)

app.get('/users/:id', getUser)

app.post('/users', addUser)

app.put('/users/:id', updateUser)

app.delete('/users/:id', deleteUser)

module.exports = app;
