const ClothingItem = require("../models/clothingItem");
const {
  BAD_REQUEST,
  NOT_FOUND,
  BAD_REQUEST_CODE,
  INTERNAL_SERVER_ERROR,
  INTERNAL_SERVER_ERROR_CODE,
  NOT_FOUND_CODE,
} = require("../utils/errors");

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
        return res.status(BAD_REQUEST_CODE).send({ message: BAD_REQUEST });
      }
      return res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .send({ message: INTERNAL_SERVER_ERROR });
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send({ data: items }))
    .catch((err) => {
      console.error(err);
      res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .send({ message: INTERNAL_SERVER_ERROR });
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
  ClothingItem.findByIdAndDelete(req.params.itemId)
    .orFail()
    .then(() => res.status(200).send({ message: "Item deleted successfully" }))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND_CODE).send({ message: NOT_FOUND });
      }
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST_CODE).send({ message: BAD_REQUEST });
      }
      return res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .send({ message: INTERNAL_SERVER_ERROR });
    });
};

const likeItem = (req, res) =>
  ClothingItem.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND_CODE).send({ message: NOT_FOUND });
      }
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST_CODE).send({ message: BAD_REQUEST });
      }
      return res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .send({ message: INTERNAL_SERVER_ERROR });
    });

const dislikeItem = (req, res) =>
  ClothingItem.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND_CODE).send({ message: NOT_FOUND });
      }
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST_CODE).send({ message: BAD_REQUEST });
      }
      return res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .send({ message: INTERNAL_SERVER_ERROR });
    });

module.exports = {
  createItem,
  getItems,
  // Comment out, updateItem, see above line 31
  deleteItem,
  likeItem,
  dislikeItem,
};
