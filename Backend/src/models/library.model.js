const mongoose = require("mongoose");

// Define the library schema
const librarySchema = new mongoose.Schema({
  libraryOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: { type: String, required: true },
  longDescription: { type: String, required: true },
  shortDescription: { type: String, required: true },

  thumbnail: [{ type: String, required: false }],
  images: [{ type: String, required: false }],
  location: [ ],
  price: { type: Number, required: true },
  reviews: { type: String, required: false }, // Optional field
  deleted: {type: String, required: false , default:false},
  amenities: [{ type: String }], // Not required by default
  seatLayout: {},
  approved:{
    type: Boolean,
    default: false,
    required: false,
},
  seatbooked: [
    {
      id: { type: String, required: false },
      label: { type: String, required: false },
    }
  ],
  timeSlot:[ {
    from: { type: String, required: false },
    to: { type: String, required: false },
  }],
});

// Export the model
module.exports = {
  Library: mongoose.model("Library", librarySchema),
};