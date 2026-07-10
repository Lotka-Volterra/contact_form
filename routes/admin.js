const express = require('express');
const { STATUSES, isValidStatus, labelFor } = require('../services/contactStatus');

function toListItem(contact) {
  return { ...contact, statusLabel: labelFor(contact.status) };
}

function createAdminRouter(contactsRepository) {
  const router = express.Router();

  router.get('/', (req, res) => {
    const contacts = contactsRepository.findAll().map(toListItem);
    res.render('admin/list', { contacts });
  });

  router.get('/:id', (req, res) => {
    const contact = contactsRepository.findById(req.params.id);

    if (!contact) {
      return res.status(404).render('admin/not-found');
    }

    res.render('admin/detail', { contact, statuses: STATUSES, labelFor });
  });

  router.post('/:id/status', (req, res) => {
    const contact = contactsRepository.findById(req.params.id);

    if (!contact) {
      return res.status(404).render('admin/not-found');
    }

    if (!isValidStatus(req.body.status)) {
      return res.status(400).render('admin/detail', {
        contact,
        statuses: STATUSES,
        labelFor,
        error: '不正なステータスです',
      });
    }

    contactsRepository.updateStatus(contact.id, req.body.status);
    res.redirect(`/admin/${contact.id}`);
  });

  return router;
}

module.exports = createAdminRouter;
