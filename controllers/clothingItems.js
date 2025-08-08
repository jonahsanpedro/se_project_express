const ClothingItem = require("../models/clothingItem");

const {
  errorHandler,
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
  ConflictError,
} = require("../middlewares/error-handler");

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => {
      res.status(201).send({ data: item });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return BadRequestError(err, req, res);
      }
      return errorHandler(err, req, res);
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send({ data: items }))
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("The request is invalid"));
      } else {
        next(err);
      }
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

const deleteItem = async (req, res) => {
  try {
    const item = await ClothingItem.findById(req.params.id);

    if (!item) {
      return next(new NotFoundError("Item not found"));
    }

    if (item.owner.toString() === req.user._id.toString()) {
      // User owns this item - deletion allowed
      await ClothingItem.findByIdAndDelete(req.params.id);
      return res.status(200).send({ message: "Item deleted successfully" });
    }
    return next(
      new ForbiddenError("You do not have permission to delete this item")
    );
  } catch (err) {
    if (err.name === "CastError") {
      next(new BadRequestError("Invalid item ID"));
    } else {
      next(err);
    }
  }
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
        next(new NotFoundError("Item not found"));
      }
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid item ID"));
      }
      return next(err);
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
        next(new NotFoundError("Item not found"));
      }
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid item ID"));
      }
      return next(err);
    });

module.exports = {
  createItem,
  getItems,
  // Comment out, updateItem, see above line 31
  deleteItem,
  likeItem,
  dislikeItem,
};
