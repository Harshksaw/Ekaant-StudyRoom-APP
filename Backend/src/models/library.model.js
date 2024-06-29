const mongoose = require("mongoose");

// Define the library schema
const librarySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  images: [{ type: String, required: false }],
  location: [ ],
  price: { type: Number, required: true },
  reviews: { type: String, required: false }, // Optional field

  amenities: [{ type: String }], // Not required by default
  seatLayout: [
    {
      id: { type: String, required: false},
      label: { type: String, required: false },
    }
  ],
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