require('dotenv').config();
const helmet = require('helmet');
const morgan = require('morgan');

const createError = require('http-errors');
const { v4: uuidv4 } = require('uuid');

const express = require('express');

const logEvents = require('./log_event_manual');
const logger = require('./logger.config');

const app = express();

// check load config
// console.log(`PORT=${process.env.PORT}`); // PORT=8080

console.log(`BAR=${process.env.BAR}, FOO=${process.env.FOO}`);

const PORT = process.env.PORT || 5000;

// apply middle ware helmet into all route
// Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!
app.use(helmet());

// apply middle ware morgan for tracking logger request from client
app.use(morgan());

// apply body-parser to express for Content-Type: application/json
app.use(express.json());

// apply body-parser to express for Content-Type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// at first all routes
app.use((req, res, next) => {
  console.log(req.headers['x-my-token']);
  if (!req.headers['x-my-token'])
    return next(createError(401, 'Please login to view this page.'));
  next();
});

// make new a route
// query string
app.all('/v1/log', (req, res, next) => {
  console.log(req.headers['x-my-token']);
  req.headers['uuid'] = uuidv4();
  console.log(req.headers['x-my-token']);
  console.log(req.query);
  logEvents(
    req.headers['uuid'],
    `${req.method} ::${req.url} :: ${JSON.stringify(
      req.headers
    )} :: ${JSON.stringify(req.query)} :: ${JSON.stringify(req.body)}`
  );

  logEvents(req.headers['uuid'], `my message`);

  res.json({
    data: req.query,
  });
});

app.all('/v1/logger', (req, res, next) => {
  req.headers['uuid'] = uuidv4();
  logger.log(
    'info',
    `${req.headers['uuid']} :: ${req.method} ::${req.url} :: ${JSON.stringify(
      req.headers
    )} :: ${JSON.stringify(req.query)} :: ${JSON.stringify(req.body)}`
  );

  logger.log('info', `${req.headers['uuid']} :: my message`);
  logger.log('error', `${req.headers['uuid']} :: my error is danger`, {
    metadata: {
      uuid: req.headers['uuid'],
      id: 10,
      name: 'product name 1',
    },
  });
  res.json({
    data: req.query,
  });
});

// manual handle custom error
// app.use((req, res, next) => {
//   const error = new Error('My Not Found!');
//   error.status = 404;
//   next(error);
// });

// handle custom error by package
app.use((req, res, next) => {
  next(createError(404, 'my not found by http-errors'));
});

// at the end all routes
// get error from previous middleware
app.use((error, req, res, next) => {
  res.json({
    status: error.status || 500,
    message: error.message,
  });
});

// start server
app.listen(PORT, () => {
  logger.log('info', `Server is running at ${PORT}`);
});
