const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('contact-form');
});

router.post('/confirm', (req, res) => {
  const { name, email, subject, body } = req.body;
  res.render('confirm', { name, email, subject, body });
});

module.exports = router;
