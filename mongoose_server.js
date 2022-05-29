require('dotenv').config();
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('./logger.config');
const mongoose = require('mongoose');

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

// connect mongodb by mongoose
// serverSelectionTimeoutMS ~ 3000 ms ~ 3 seconds
mongoose.connect(process.env.MONGODB_URI, {serverSelectionTimeoutMS: 3000})
  .then( r => {
    logger.log('info', `connect db success`);
  })
  .catch(e => {
    logger.log('info', `connect db failed`);
  })

mongoose.connection.on('connected', () => {
  console.log('connect db connected');
});

mongoose.connection.on('disconnected', () => {
  console.log('connect db disconnected');
});

process.on('SIGINT', async () => {
  console.log("process.on('SIGINT'");
  await mongoose.connection.close();
});

// make new a route
// query string
// app.all('/v1/parsing', (req, res, next) => {
//   console.log(req.query);
//   res.json({
//     data: req.query,
//   });
// });

// // route parameter
// app.all('/v1/parsing/:name/:age', (req, res, next) => {
//   console.log(req.params);
//   res.json({
//     data: req.params,
//   });
// });

// // post body
// app.all('/v1/parsingPostJson', (req, res, next) => {
//   console.log(req.body); // undefined
//   res.json({
//     data: req.body,
//   });
// });

// start server
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});