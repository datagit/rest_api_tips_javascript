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
app.get('/', (req, res, next) => {
  res.send(`this is home page 01.`);
});

app.get('/v1/users/111', (req, res, next) => {
  console.log(req.url);
  console.log(req.method);
  res.send(`user 111`);
});


// start server
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});