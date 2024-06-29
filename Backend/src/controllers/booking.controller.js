const { StatusCodes } = require("http-status-codes");

const zod = require("zod");
const { User, Booking } = require("../models");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "MY_SECRET_KEY";
const BookingSchema = zod.object({
  userId: zod.string(),
  libraryId: zod.string(),
  initialPrice: zod.number(),
  finalPrice: zod.number(),
  paid: zod.boolean().optional(),
  timeSlot: zod
    .object({
      from: zod.string().optional(),
      to: zod.string().optional(),
    })
    .optional(),
  bookedSeat: zod
    .object({
      id: zod.string().optional(),
      label: zod.string().optional(),
    })
    .optional(),
  bookingDate: zod.date(),
  bookingPeriod: zod.number().optional(),
  bookingStatus: zod.enum(["PENDING", "CONFIRMED", "CANCELLED"]).optional(),
  transactionDetails: zod.object().optional(),
});

async function createBooking(req, res) {
  try {



    const {
      userId,
      libraryId,
      initialPrice,
      finalPrice,
      timeSlot,
      bookedSeat,
      bookingDate,
      bookingPeriod,
      bookingStatus,
    } = BookingSchema.safeParse(req.body);








    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found" });
    }

    const booking = await Booking.create({
      userId,
      bookingDate,
      bookingTime,
      bookingDuration,
      bookingPurpose,
      bookingStatus,
    });

    return res.status(StatusCodes.CREATED).json({ booking });
  } catch (error) {
    console.error(error);
  }
}
function pingBookingController(req, res) {
  // logger.error("ping error logs for ping controller");

  return res.json({ message: "Booking controller is up" });
}

module.exports = {
  createBooking,
  pingBookingController,
};
