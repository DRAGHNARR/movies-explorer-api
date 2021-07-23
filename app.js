const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const auth = require('./middlewares/auth');
const errorer = require('./middlewares/errorer');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, HOST = 'mongodb://localhost:27017/ourtube' } = process.env;
const app = express();

mongoose.connect(HOST, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(auth);
app.use('/', require('./routes/index'));

app.use((req, res, next) => {
  const error = new Error('Страница не найдена.');
  error.statusCode = 404;
  next(error);
});
app.use(errorLogger);
app.use(errors());
app.use(errorer);

app.listen(PORT, () => {});
