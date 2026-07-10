const path = require('node:path');
const express = require('express');
const { createConnection } = require('./db/connection');
const { createContactsRepository } = require('./repositories/contactsRepository');
const createContactFormRouter = require('./routes/contactForm');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));

const dbPath =
  process.env.NODE_ENV === 'test' ? ':memory:' : path.join(__dirname, 'data', 'contacts.sqlite');
const db = createConnection(dbPath);
const contactsRepository = createContactsRepository(db);

app.use('/', createContactFormRouter(contactsRepository));

module.exports = app;
