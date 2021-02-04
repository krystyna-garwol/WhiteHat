const express = require("express");
const app = express();
const bodyParser = require('body-parser');
// swagger components
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
// swagger config 
const swaggerOptions = require("./openapi");

const { getAirports, getAirport, addAirport, updateAirport, deleteAirport, homepage } = require("./controllers/airportsController");

app.use(bodyParser.json())

app.get("/", homepage)

app.get("/airports", getAirports);

app.get("/airports/:icao", getAirport)

app.post("/airports", addAirport)

app.put("/airports/:icao", updateAirport)

app.delete("/airports/:icao", deleteAirport)

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerJsdoc(swaggerOptions), { explorer: true }),
);


module.exports = app;
