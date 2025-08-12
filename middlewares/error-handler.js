const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.status) {
    return res.status(err.status).send({ message: err.message });
  }

  res.status(500).send({ message: "Internal Server Error" });
};

module.exports = {
  errorHandler,
};
