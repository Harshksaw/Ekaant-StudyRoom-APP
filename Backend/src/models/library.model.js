const mongoose = require("mongoose");
const { optional } = require("zod");

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
  Price: {
    type: Number,
    required: true,
  },
  // will see how to implement this-
  // tags: {
  //   // features example ["wifi", "parking", "ac", "food"]
  //   type: [String],
  //   required: true,
  // },
  reviews: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RatingAndReview",
    required: optional,
  },
  contact: {
    type: {},
    required: true,
  },
  amenities: {
    type: [String],
    required: false,
  },

  seatLayout: {
    type: [
      {
        id: String,
        label: String,
      },
    ],
    required: true,
  },

  seatbooked: {
    // type: [{ row: Number, column: Number }],
    type: [
      {
        id: String,
        label: String,
      },
    ],
    required: false,
  },

  timeSlot: {
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
  },
});

module.exports = {
  // UserLibrary: mongoose.model("UserLibrary", UserLibrarySchema),
  Library: mongoose.model("Library", LibrarySchema),
};
