const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const { getAirports, getAirport, addAirport, updateAirport, deleteAirport } = require("./controllers/airportsController");
const { auth, requiresAuth } = require("express-openid-connect");
const ejs = require("ejs");

app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));

const openIDconfig = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'http://localhost:3000',
  clientID: 'ZVoDzfAjnPgEGXY3wNOyGxFSY1wE32PS',
  issuerBaseURL: 'https://dev-c7kpmdkq.eu.auth0.com'
};
app.use(auth(openIDconfig));

app.use(bodyParser.json())

//Airports routes
app.get("/airports", requiresAuth(), getAirports);

app.get("/airports/:icao", requiresAuth(), getAirport)

app.post("/airports", requiresAuth(), addAirport)

app.put("/airports/:icao", requiresAuth(), updateAirport)

app.delete("/airports/:icao", requiresAuth(), deleteAirport)


// protected profile route
app.get("/profile", requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

app.get("/", (req, res) => {
  res.render("home", { loggedIn: req.oidc.isAuthenticated() });
});


module.exports = app;
