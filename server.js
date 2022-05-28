require('dotenv').config();
const helmet = require('helmet');
const morgan = require('morgan');

const express = require('express');

const userRoute = require('./user.routes');
const feedRoute = require('./feed.route');

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
app.use('/v1/users', userRoute);
app.use('/v1/feed', feedRoute);


// start server
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});