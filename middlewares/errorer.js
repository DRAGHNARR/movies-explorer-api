module.exports = (err, req, res, next) => {
  const { message } = err;
  const code = !err.statusCode ? 500 : err.statusCode;
  res.status(code).send({ message });
  next();
};
