require('dotenv').config();

const express = require('express');

const app = express();

// check load config
// console.log(`PORT=${process.env.PORT}`); // PORT=8080

console.log(`BAR=${process.env.BAR}, FOO=${process.env.FOO}`);

const PORT = process.env.PORT || 5000;

// make new a route
app.get('/', (req, res, next) => {
  res.send(`this is home page 01.`);
});

// start server
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});