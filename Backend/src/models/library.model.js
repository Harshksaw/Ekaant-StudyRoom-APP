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
  cardImage: { type: String, required: false },
  images: [{ type: String }],
  location: { type: String, required: true },
  address: { type: String, required: true },

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
});

// Define the booking schema to handle bookings
const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  library: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Library",
    required: true,
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room", // Assuming you have a separate Room model
    required: true,
  },
  seat: {
    seatId: { type: String, required: true },
    seatLabel: { type: String, required: true },
  },
  timeSlot: {
    from: { type: String, required: true },
    to: { type: String, required: true },
  },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
});

// Export the models
module.exports = {
  Library: mongoose.model("Library", librarySchema),
  Booking: mongoose.model("Booking", bookingSchema),
};
