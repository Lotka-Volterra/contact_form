const path = require('node:path');
const express = require('express');
const contactFormRouter = require('./routes/contactForm');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));

app.use('/', contactFormRouter);

module.exports = app;
