const mongoose = require("mongoose");
const { optional } = require("zod");

// user schema----
// const UserLibrarySchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true,
//   },
//   imageUrl: {
//     type: String,
//     required: true,
//   },
//   // Bio: {
//   //   type:mongoose.Schema.Types.ObjectID
//   // },
//   pricePerDay: {
//     type: Number,
//     required: true,
//   },
//   tags: {
//     type: [String],
//     required: true,
//   },
//   reviews: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "RatingAndReview",
//   },
// });

// library schema
const LibrarySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  pricePerDay: {
    type: Number,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  reviews: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RatingAndReview",
  },
  contact: {
    type: {},
    required: true,
  },
  amenities: {
    type: [String],
    required: optional,
  },
  seatLayout: {
    // type: [{ row: Number, column: Number }],
    type: [{ position: String }],
    required: true,
  },
  seatbooked: {
    // type: [{ row: Number, column: Number }],
    type: [{ position: String }],
    required: true,
  },
});

module.exports = {
  // UserLibrary: mongoose.model("UserLibrary", UserLibrarySchema),
  Library: mongoose.model("Library", LibrarySchema),
};
