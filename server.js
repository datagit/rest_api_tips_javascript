const express = require('express');

const app = express();

const PORT = process.env.PORT || 5000;

// make new a route
app.get('/', (req, res, next) => {
  res.send(`this is home page.`);
});

// start server
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});