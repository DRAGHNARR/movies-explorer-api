const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

function extractBearerToken(header) {
  return header.replace('Bearer ', '');
}

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    const error = new Error('Необходима авторизация.');
    error.statusCode = 401;
    next(error);
    return;
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    if (err.name === 'ValidationError') {
      const error = new Error('Необходима авторизация.');
      error.statusCode = 401;
      next(error);
    } else {
      next(err);
    }
    return;
  }

  req.user = payload;
  next();
};
