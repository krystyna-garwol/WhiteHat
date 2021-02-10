const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const basicAuth = require('express-basic-auth')
const session = require('express-session')
// swagger components
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = require("./openapi");
//controllers
const { getAirports, getAirport, addAirport, updateAirport, deleteAirport, homepage } = require("./controllers/airportsController");
const { getUsers, getUser, deleteUser, updateUser, addUser } = require("./controllers/usersController");
const { loginUser } = require('./controllers/loginCotroller')
const { logoutUser } = require('./controllers/logoutController')
const { customAuthoriser } = require('./middleware/customAuthoriser');

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
// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// );
// app.use(express.json());

app.use(session({
  secret: 'keyboardcat',
  resave: false,
  saveUninitialized: true,
}))



const basicAuthOptions = {
  authorizer: customAuthoriser,
  authorizeAsync: true,
  challenge: true,
  unauthorizedResponse: req => {
    return `Sorry, but you are not authorised to view this resource.`;
  },
}


//Airports routes
app.get("/", homepage)

app.get("/airports", getAirports);

app.get("/airports/:icao", getAirport)

app.post("/airports", addAirport)

app.put("/airports/:icao", updateAirport)

app.delete("/airports/:icao", deleteAirport)

//User routes
app.get('/users', getUsers)

app.get('/users/:id', getUser)

app.post('/users', addUser)

app.put('/users/:id', updateUser)

app.delete('/users/:id', deleteUser)

app.post('/login', basicAuth(basicAuthOptions), loginUser)

app.get('/logout', logoutUser)

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerJsdoc(swaggerOptions), { explorer: true }),
);


module.exports = app;
