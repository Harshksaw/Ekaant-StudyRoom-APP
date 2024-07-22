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

  reviews: { type: String, required: false }, 
  deleted: { type: String, required: false, default: false },
  amenities: [{ type: String }], // Not required by default
  commingSoon:{
    type: Boolean,
    default: false,
    required: false,
  },
  approved: {
    type: Boolean,
    default: false,
    required: false,
  },
  timeSlot: [{
    from: { type: String, required: false },
    to: { type: String, required: false },
    price: { type: Number, required: true }
}],
  rooms:[
    {
      roomNo:{
          type: Number,
          required: false,
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
      type:String,
      required:false
    }
  },
  cinDetails: {
    cinNumber: {
      type: String,
      required: false,
    },
    cinCertificateFile: {
      type: String,
      required:false
    }
  },
  tanDetails: {
    tanNumber: {
      type: String,
      required: false,
    },
    tanCertificateFile: {
      type: String,
      required:false
    }
  },
  msmeDetails: {
    msmeNumber: {
      type: String,
      required: false,
    },
    msmeCertificateFile: {
      type: String,
      required:false
    }
  },
});

// Export the model
module.exports = {
  Library: mongoose.model("Library", librarySchema),
};