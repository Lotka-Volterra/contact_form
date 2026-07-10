const express = require('express');

function createContactFormRouter(contactsRepository) {
  const router = express.Router();

  router.get('/', (req, res) => {
    res.render('contact-form');
  });

  router.post('/confirm', (req, res) => {
    const { name, email, subject, body } = req.body;
    res.render('confirm', { name, email, subject, body });
  });

  router.post('/complete', (req, res) => {
    const { name, email, subject, body } = req.body;
    contactsRepository.save({ name, email, subject, body });
    res.render('complete');
  });

  return router;
}

module.exports = createContactFormRouter;
