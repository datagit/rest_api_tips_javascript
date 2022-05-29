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

// make new a route
// query string
app.all('/v1/parsing', (req, res, next) => {
  console.log(req.query);
  res.json({
    data: req.query,
  });
});

// route parameter
app.all('/v1/parsing/:name/:age', (req, res, next) => {
  console.log(req.params);
  res.json({
    data: req.params,
  });
});

// post body
app.all('/v1/parsingPostJson', (req, res, next) => {
  console.log(req.body); // undefined
  res.json({
    data: req.body,
  });
});

// start server
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});