const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
const roomSchema = new mongoose.Schema({
    library: { type: mongoose.Schema.Types.ObjectId, ref: 'Library' },
    roomNo: { type: Number, required: true },
    Ac: { type: Boolean, default: false },
    seats: [
      {
        seatId: { type: String, required: true },
        seatLabel: { type: String, required: true },
        timeSlots: [
          {
            slotId: { type: String, required: true, default: uuidv4 },       
            from: { type: String, required: true },
            to: { type: String, required: true },
            booked: { type: Boolean, default: false },
            bookedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            bookingSource: { type: String, enum: ["app", "admin"], default: "app" }, 
            price: { type: String, required: true},
            bookingEndDate: { type: Date },
          },
        ],
      }
    ],
  });
  
  module.exports = {
   Room: mongoose.model("Room", roomSchema),
  
  };
  