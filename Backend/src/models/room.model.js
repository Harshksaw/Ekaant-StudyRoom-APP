const mongoose = require("mongoose");
const roomSchema = new mongoose.Schema({
    library: { type: mongoose.Schema.Types.ObjectId, ref: 'Library' },
    roomNo: { type: Number, required: true },
    seats: [
      {
        seatId: { type: String, required: true },
        seatLabel: { type: String, required: true },
        timeSlots: [
          {
            slotId: { type: String, required: true },
            from: { type: String, required: true },
            to: { type: String, required: true },
            booked: { type: Boolean, default: false },
            bookedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            bookingSource: { type: String, enum: ["app", "admin"], default: "app" }, 
          },
        ],
      }
    ],
  });
  
  