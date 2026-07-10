const express = require('express');
const { validateContact } = require('../validators/contactValidator');

const EMPTY_VALUES = { name: '', email: '', subject: '', body: '' };

function createContactFormRouter(contactsRepository) {
  const router = express.Router();

  router.get('/', (req, res) => {
    res.render('contact-form', { errors: [], values: EMPTY_VALUES });
  });

  router.post('/confirm', (req, res) => {
    const { name, email, subject, body } = req.body;
    const errors = validateContact({ name, email, subject, body });

    if (errors.length > 0) {
      return res
        .status(400)
        .render('contact-form', { errors, values: { name, email, subject, body } });
    }

    res.render('confirm', { name, email, subject, body });
  });

  router.post('/complete', (req, res) => {
    const { name, email, subject, body } = req.body;
    const errors = validateContact({ name, email, subject, body });

    if (errors.length > 0) {
      return res
        .status(400)
        .render('contact-form', { errors, values: { name, email, subject, body } });
    }

    contactsRepository.save({ name, email, subject, body });
    res.render('complete');
  });

  return router;
}

module.exports = createContactFormRouter;
