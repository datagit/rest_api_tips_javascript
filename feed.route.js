const express = require('express');
const router = express.Router();


// /abc
router.get('/abc', (req, res, next) => {
  res.send(`abc`);
});

// /ab?cd -> /acd or /abcd
router.get('/ab?cd', (req, res, next) => {
  res.send(`/ab?cd`);
});

// /bar+x -> /barx or /barbbbbbx
router.get('/bar+x', (req, res, next) => {
  res.send(`/bar+x`);
});

// /foo*x -> /fooabcx or /foo123x
router.get('/foo*x', (req, res, next) => {
  res.send(`/foo*x`);
});

// /my/ -> /aaamy or /123my or my123 or 123myabc
router.get(/my/, (req, res, next) => {
  res.send(`/my/`);
});

// /my/ -> /style or /123abc_style
router.get(/.*style$/, (req, res, next) => {
  res.send(`/.*style$/`);
});


module.exports = router;