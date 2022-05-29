require('dotenv').config();
const helmet = require('helmet');
const morgan = require('morgan');

const express = require('express');

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
app.use(express.urlencoded({extended: true}));

// make new a route
// query string
app.all('/v1/custom-error', (req, res, next) => {
  console.log(req.query);
  res.json({
    data: req.query,
  });
});

// manual handle custom error
app.use((req, res, next) => {
  const error = new Error('My Not Found!');
  error.status = 404;
  next(error);
});

// get error from previous middleware
app.use((error, req, res, next) => {
  res.json({
    status: error.status || 500,
    message: error.message,
  });
});

// start server
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});