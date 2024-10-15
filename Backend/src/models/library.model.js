const mongoose = require("mongoose");

// Define the library schema
const librarySchema = new mongoose.Schema({
  libraryOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
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
  amenities: {
    coldWater: { type: Boolean, default: false },
    wifi: { type: Boolean, default: false },
    ac: { type: Boolean, default: false },
    locker: { type: Boolean, default: false },
    separateWashroom: { type: Boolean, default: false },
    News: { type: Boolean, default: false },
    discussionArea: { type: Boolean, default: false },
    LunchArea: { type: Boolean, default: false },
    MovingChair: { type: Boolean, default: false },
    FloorMat: { type: Boolean, default: false },
    SeparateParking: { type: Boolean, default: false },
    CommonParking: { type: Boolean, default: false },
  },
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
  RegistrationFees:{
    type: Number,
    required: false,
    default: 500,

  }
});

// Export the model
module.exports = {
  Library: mongoose.model("Library", librarySchema),
};