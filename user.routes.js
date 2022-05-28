const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {
  res.send(`get all users`);
});

router.post('', (req, res, next) => {
  res.send(`create new a user`);
});

router.patch('/:id', (req, res, next) => {
  res.send(`update a user`);
});

router.delete('/:id', (req, res, next) => {
  res.send(`delete a user`);
});

module.exports = router;