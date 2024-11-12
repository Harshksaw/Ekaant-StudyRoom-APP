const mongoose = require("mongoose");

// Define the Booking schema

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  libraryId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Library",
  },
  initialPrice: {
    type: Number,
    required: true,
  },
  finalPrice: {
    type: Number,
    required: true,
  },
  paid: {
    type: Boolean,
    default: false,
    required: false,
  },
  timeSlotDetails: [{ // Details of the booked time slot
    _id: { type: String, required: true },
    booked: { type: Boolean, default: false },
    bookingSource: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    price: { type: String, required: true },
    slotId: { type: String, required: true },
  }],
  roomNo: {
    type: Number,
    required: true,
  },
  bookedSeat: {
    _id: { type: String, required: true },
    seatId: { type: String, required: true },
    seatLabel: { type: String, required: true },
    timeSlots: [
      {
        _id: { type: String, required: true },
        booked: { type: Boolean, default: false },
        bookingSource: { type: String, required: true },
        from: { type: String, required: true },
        to: { type: String, required: true },
        price: { type: String, required: true },
        slotId: { type: String, required: true },
      }
    ]
  },
  bookingDate: {
    type: Date,
    required: true, // Assuming this is the date the booking is for
  },
  forFriend: { // Structured as a sub-schema for clarity
    name: { type: String, required: false },
    email: { type: String, required: false },
    phoneNumber: { type: String, required: false },
  },
  bookingPeriod: { // Consider defining what the number represents (days, weeks, months)
    type: Number,
    default: 1, // Default booking period (in months?)
    required: false,
  },
  transactionDetails: { // Structure for transaction details (optional, can be extended later)
    transactionId: { type: String, required: false },
    paymentMethod: { type: String, required: false }, // e.g., "card", "paypal", etc.
    paymentStatus: { type: String, required: false }, // e.g., "completed", "failed", etc.
  },
  bookingStatus: {
    type: String,
    enum: ["PENDING", "CONFIRMED", "CANCELLED"],
    default: "PENDING",
    required: true,
  },
  approved: {
    type: Boolean,
    default: false,
    required: false,
  },
  timeStamp: {
    type: Date,
    default: Date.now, // When the booking was created
  },

});

module.exports = {
  Booking: mongoose.model("Booking", bookingSchema),
};
