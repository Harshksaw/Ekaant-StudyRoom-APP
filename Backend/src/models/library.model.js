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
  cardimage: { type: String, required: false },
  images: {
    type: [{ type: String }],
    required: false,

  },
  location: [],
  address: {},
  price: { type: Number, required: true },
  reviews: { type: String, required: false }, 
  deleted: { type: String, required: false, default: false },
  amenities: [{ type: String }], // Not required by default
  
  approved: {
    type: Boolean,
    default: false,
    required: false,
  },
  timeSlot: [{
    from: { type: String, required: false },
    to: { type: String, required: false },
  }],
  rooms:[
    {
      roomNo:{
          type: Number,
          required: true,
          default: 1,
      },
      seatbooked: [
          {
            id: { type: String, required: false },
            label: { type: String, required: false },
          }
        ],
        seatLayout: {},
  },
  ],

  legal: { type: String, required: false },
  gstDetails: {
    gstNumber: {
      type: String,
      required: false,
    },
    gstCertificateFile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'File',
      required: false,
    }
  },
  cinDetails: {
    cinNumber: {
      type: String,
      required: false,
    },
    cinCertificateFile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'File',
      required: false,
    }
  },
  tanDetails: {
    tanNumber: {
      type: String,
      required: false,
    },
    tanCertificateFile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'File',
      required: false,
    }
  },
});

// Export the model
module.exports = {
  Library: mongoose.model("Library", librarySchema),
};