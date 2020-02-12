const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const DataAccessAdapter = require('./data/dataAccessAdapter');
const config = require('./config');

const app = express();

const jsonParser = bodyParser.json();

app.use(logger('default'));
app.use(jsonParser);

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  app.locals.daa = new DataAccessAdapter(config.dbFileName)
  next();
});

const PORT = 8998;

app.listen(PORT, function() {
  console.log('express server listening on 8998');
});
