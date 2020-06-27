const fs = require('fs');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const DataAccessAdapter = require('./data/dataAccessAdapter');

const CityRepository = require('./data/repository/cityRepository');
const CountryRepository = require('./data/repository/countryReporsitory');

const config = require('./config');

const PORT = 8998;
const app = express();

const jsonParser = bodyParser.json();
const dbAdapter = new DataAccessAdapter(config.dbFileName);

const logStream = fs.createWriteStream('./logfile.log', {flags: 'a'});

app.use(logger('default', {stream: logStream}));
app.use(jsonParser);

app.use(async function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'localhost:8080');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  const repositories = {};
  const countryRepo = new CountryRepository(dbAdapter);
  await countryRepo.createTable();
  repositories.country = countryRepo;

  const cityRepo = new CityRepository(dbAdapter);
  await cityRepo.createTable();
  repositories.city = cityRepo;

  app.locals.repositories = repositories;
  next();
});

app.use('/api', require('./api'));

app.listen(PORT, function() {
  console.log('express server listening on 8998');
});

process.on('exit', function() {
  dbAdapter.close();
});
