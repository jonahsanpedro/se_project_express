const ClothingItem = require("../models/clothingItem");
const { BAD_REQUEST, NOT_FOUND, DEFAULT } = require("../utils/errors");

const createItem = (req, res) => {
  console.log(req);
  console.log(req.body);

  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => {
      res.status(201).send({ data: item });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: BAD_REQUEST });
      }
      return res.status(500).send({ message: DEFAULT, err });
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send({ data: items }))
    .catch((err) => {
      res.status(500).send({ message: DEFAULT, err });
    });
};

// COMMENT OUT, not needed for Project 12, keeping for reference
// const updateItem = (req, res) => {
//   const { itemId } = req.params;
//   const { imageUrl } = req.body;

//   ClothingItem.findByIdAndUpdate(itemId, { $set: { imageUrl } })
//     .orFail()
//     .then((item) => res.status(200).send({ data: item }))
//     .catch((err) => {
//       if (err.name === "DocumentNotFoundError") {
//         return res.status(404).send({ message: NOT_FOUND });
//       }
//       if (err.name === "CastError") {
//         return res.status(400).send({ message: BAD_REQUEST });
//       }
//       return res.status(500).send({ message: DEFAULT, err });
//     });
// };

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  console.log(itemId);
  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then(() => res.status(200).send({ message: "Item deleted successfully" }))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: NOT_FOUND });
      }
      if (err.name === "CastError") {
        return res.status(400).send({ message: BAD_REQUEST });
      }
      return res.status(500).send({ message: DEFAULT, err });
    });
};

module.exports = {
  createItem,
  getItems,
  updateItem,
  deleteItem,
};

module.exports.likeItem = (req, res) =>
  ClothingItem.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: NOT_FOUND });
      }
      if (err.name === "CastError") {
        return res.status(400).send({ message: BAD_REQUEST });
      }
      return res.status(500).send({ message: DEFAULT, err });
    });

module.exports.dislikeItem = (req, res) =>
  ClothingItem.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: NOT_FOUND });
      }
      if (err.name === "CastError") {
        return res.status(400).send({ message: BAD_REQUEST });
      }
      return res.status(500).send({ message: DEFAULT, err });
    });
