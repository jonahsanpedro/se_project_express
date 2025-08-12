const errorHandler = (err, req, res) => {
  console.error(err.stack);

  if (err.status) {
    return res.status(err.status).send({ message: err.message });
  }

  return res.status(500).send({ message: "Internal Server Error" });
};

export default errorHandler;
