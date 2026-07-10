const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('contact-form');
});

module.exports = router;
