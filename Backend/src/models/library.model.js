// Define the library schema
const mongoose = require("mongoose");
const librarySchema = new mongoose.Schema({
  libraryOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
  },
  name: { type: String, required: true },
  longDescription: { type: String, required: true },
  shortDescription: { type: String, required: true },
  thumbnail: [{ type: String, required: false }],
  cardImage: { type: String, required: false },
  images: [{ type: String }],
  location: [],
  address: {},

  rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Room" }],

  reviews: { type: String, required: false },
  deleted: { type: Boolean, default: false },
  amenities: {
    coldWater: { type: Boolean, default: false },
    wifi: { type: Boolean, default: false },
    ac: { type: Boolean, default: false },
    locker: { type: Boolean, default: false },
    separateWashroom: { type: Boolean, default: false },
    news: { type: Boolean, default: false },
    discussionArea: { type: Boolean, default: false },
    lunchArea: { type: Boolean, default: false },
    movingChair: { type: Boolean, default: false },
    floorMat: { type: Boolean, default: false },
    separateParking: { type: Boolean, default: false },
    commonParking: { type: Boolean, default: false },
  },
  comingSoon: { type: Boolean, default: false },
  approved: { type: Boolean, default: false },

  rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Room" }],

  legal: { type: String, required: false },
  gstDetails: {
    gstNumber: { type: String, required: false },
    gstCertificateFile: { type: String, required: false },
  },
  cinDetails: {
    cinNumber: { type: String, required: false },
    cinCertificateFile: { type: String, required: false },
  },
  tanDetails: {
    tanNumber: { type: String, required: false },
    tanCertificateFile: { type: String, required: false },
  },
  msmeDetails: {
    msmeNumber: { type: String, required: false },
    msmeCertificateFile: { type: String, required: false },
  },
  registrationFees: { type: Number, default: 500 },
  Price: { type: Number, default: 0 }
});



// Export the models
module.exports = {
  Library: mongoose.model("Library", librarySchema),

};
