const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const { auth, requiresAuth } = require("express-openid-connect");

//Connect to Mongo
mongoose.connect(
    "mongodb://localhost/users",
    {
        useNewUrlParser: true,
    },
    () => {
        console.log("Connected to MongoDB");
    }
);

//Middleware
app.set("view engine", "ejs");
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'));

//Routes







//Server Initialization
app.listen(3000, () =>
    console.log("Listening on port 3000.")
);

module.exports = app;