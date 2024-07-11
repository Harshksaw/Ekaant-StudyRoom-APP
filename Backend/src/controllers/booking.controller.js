const { StatusCodes } = require("http-status-codes");

const zod = require("zod");
const jwt = require("jsonwebtoken");
const { User} = require("../models");
const { Booking } = require("../models/booking.model");
const bookingModel = require("../models/booking.model");
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
function pingBookingController(req, res) {
  // logger.error("ping error logs for ping controller");

  return res.json({ message: "Booking controller is up" });
}
async function createBooking(req, res) {
  try {
    const {
      userId,
      libraryId,
      initialPrice,
      finalPrice,
      timeSlot,
      roomNo,
      bookedSeat,
      bookingDate,
      forFriend,
      bookingPeriod,
    } = req.body;
    console.log(forFriend)
    const user = await User.findOne({ _id: userId });
    // console.log(user);

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found" });
    }
    const bookingData = {
      userId,
      libraryId,
      initialPrice,
      finalPrice,
      roomNo,
      forFriend: !forFriend ? null : forFriend,
      timeSlot,
      bookedSeat,
      bookingDate,
      bookingPeriod,
    };

    const newBooking = await Booking.create(bookingData);

  // Now retrieve the booking with populate
  // const populatedBooking = await 
  //   .populate("userId")
  //   .populate("libraryId");
   
    // await newBooking.save();

    return res.status(StatusCodes.CREATED).json({
      message: "Booking created successfully",
      Booking: newBooking,
    });
  } catch (error) {
    console.error(error);
  }
}


async function getUserBookings(req, res) {
  try {

    const { id } = req.params;

    const bookings = await Booking.find({userId: id}).populate("libraryId").exec();
    return res.status(StatusCodes.OK).json({ bookings });
  } catch (error) {
    console.error(error);
  }
}

async function getBookingById(req, res) {
  try {

    const { id } = req.body;
    if(!id){
      res.status(StatusCodes.BAD_REQUEST).json({ message: 'id not found' });
    }
    const bookings = await Booking.find({_id: id}).populate("user").exec();
    return res.status(StatusCodes.OK).json({ bookings });
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  createBooking,
  pingBookingController,
  getUserBookings,
  getBookingById
};
