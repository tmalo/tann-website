// index.js
//changing
const serverless = require('serverless-http');
const express = require('express')
const cors = require('cors')
const { parsed: localEnv } = require('dotenv').config()
const routes = require('./modules/routes');

const app = express()

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