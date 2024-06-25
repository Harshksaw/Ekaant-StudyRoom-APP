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

 images:[{ type: String }],
 thumbnail: {
  type: String,

},
 

  location: {
    type: String,
    required: true,
  },
  Price: {
    type: Number,
    required: true,
  },

  reviews: {
    // type: mongoose.Schema.Types.ObjectId,
    type:String,
    // ref: "RatingAndReview",
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

  Library: mongoose.model("Library", LibrarySchema),
};
