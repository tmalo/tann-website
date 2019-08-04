// index.js
//changing
const serverless = require('serverless-http');
const express = require('express')
var pino = require('express-pino-logger')
const cors = require('cors')
const { parsed: localEnv } = require('dotenv').config()
const routes = require('./modules/routes');

var Logger = require( './modules/Logger');
const app = express()
app.use(pino({
    logger: Logger
  }))

var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CORS CONFIGURATION
app.options('*', cors()) // include before other routes

// Routes
app.use('/', routes);

module.exports.handler = serverless(app);