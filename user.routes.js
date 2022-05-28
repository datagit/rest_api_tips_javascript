const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.send(`this is home page 01.`);
});

router.get('/users/', (req, res, next) => {
  res.send(`get all users`);
});

router.post('/users', (req, res, next) => {
  res.send(`create new a user`);
});

router.patch('/users/:id', (req, res, next) => {
  res.send(`update a user`);
});

router.delete('/users/:id', (req, res, next) => {
  res.send(`delete a user`);
});

module.exports = router;