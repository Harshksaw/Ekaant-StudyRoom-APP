const { StatusCodes } = require("http-status-codes");

const zod = require("zod");
const jwt = require("jsonwebtoken");
const { User, Invoice } = require("../models");
const { Booking } = require("../models/booking.model");
const { Library } = require("../models/library.model");
const { sendInvoiceEmail } = require("../utils/mails/invoice.mail");
const { PrismaClient, Prisma } = require("@prisma/client");
const { connect } = require("mongoose");

const prisma = new PrismaClient();
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

    console.log("🚀 ~ createBooking ~ req.body", req.body);

    const user = await prisma.user.findFirst({ where: { id: userId } });
    console.log("🚀 ~ createBooking ~ user:", user)

    const bookingFinalDate = new Date(bookingDate);
    bookingFinalDate.setMonth(bookingFinalDate.getMonth() + bookingPeriod);
    console.log("🚀 ~ createBooking ~ bookingFinalDate:", bookingFinalDate);

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found" });
    }

    if (!libraryId || !initialPrice || !finalPrice || timeSlot.length == 0  || !roomNo || bookedSeat == '' || bookingDate  == '' || !bookingPeriod) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Please provide all the required fields" });
    }

    // let friendConnect = undefined;
    // if (forFriend) {
    //   const friend = await prisma.friend.findFirst({ where: { id: forFriend } });
    //   if (!friend) {
    //     return res
    //       .status(StatusCodes.BAD_REQUEST)
    //       .json({ message: "Friend not found" });
    //   }
    //   friendConnect = { connect: { id: forFriend } };
    // }

    const newBooking = await prisma.booking.create({
      data: {
        user: { connect: { id: userId } },
        library: { connect: { id: libraryId } },
        initialPrice: parseFloat(initialPrice),
        finalPrice: parseFloat(finalPrice),
        roomNo,
      // friend: friendConnect,
        timeSlotDetails: timeSlot,
        bookedSeat,
        bookingDate,
        bookingPeriod,
        bookingFinalDate: bookingFinalDate,
      },
    });



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

    const bookings = await prisma.booking.findMany({
      where: {
        userId: id,
        bookingStatus: "CONFIRMED",
      },
      include: {
        userId: true,
        libraryId: true,
      },
    });
    // .populate("libraryId")
    // .populate("userId");

    return res.status(StatusCodes.OK).json({ bookings });
  } catch (error) {
    console.error(error);
  }
}

async function getBookingById(req, res) {
  try {
    // console.log(req.body, "getBookingById");

    const { id } = req.body;
    if (!id) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: "id not found" });
    }
    const bookings = await prisma.booking.findFirst({
      where: { id: id },
      include: {
        userId: true,
      },
    });
    return res.status(StatusCodes.OK).json({ bookings });
  } catch (error) {
    console.error(error);
  }
}

async function getBookingByLibId(req, res) {
  try {
    // console.log(req.body, "getBookingByLibId");

    const { lib_id } = req.body;
    if (!lib_id) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: "lib_id not found" });
    }
    const bookings = await prisma.booking.findFirst({
      where: { libraryId: lib_id },
      include: {
        userId: true,
      },
      orderBy: Desc,
    });

    console.log("🚀 ~ getBookingByLibId ~ bookings:", bookings);

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Bookings fetched successfully",
      data: bookings,
    });
  } catch (error) {
    console.error(error);
  }
}

async function ConfrimBooking(req, res) {
  try {
    // Find the booking by ID and update it

    const { id } = req.params;

    const { bookingId, paymentId, paymentData, bookingData } = req.body;

    const transactionDetailsData = {
      bookingId,
      paymentId,
      paymentData,
    };

    const updatedBooking = await prisma.booking.update(
      {
        where: {
          id: parseInt(id),
        },
        data: {
          transactionDetails: transactionDetailsData,
          paid: true,
          bookingStatus: "CONFIRMED",
        },
      }
      // id,
      // {
      //   $set: {
      //     transactionDetails: transactionDetailsData,
      //     paid: true,
      //     bookingStatus: "CONFIRMED",
      //     "timeSlotDetails.$[].booked": true
      //   }
      // },
    );
    // console.log("🚀 ~ ConfrimBooking ~ updatedBooking:", updatedBooking)
    if (!updatedBooking) {
      throw new Error("Booking not found");
    }

    const updatedTimeSlots = updatedBooking.timeSlotDetails.map((slot) => ({
      ...slot,
      booked: true,
    }));

    await prisma.booking.update({
      where: {
        id: parseInt(id),
      },
      data: {
        timeSlotDetails: updatedTimeSlots,
      },
    });

    for (const slot of updatedBooking.timeSlotDetails) {
      await prisma.timeSlot.update({
        where: {
          id: parseInt(slot.id),
        },
        data: {
          booked: true,
        },
      });
    }

    //TODO

    // const lib = await Library.findById(bookingData.libraryId.id).populate(
    //   "rooms"
    // );
    const lib = await prisma.library.findUnique({
      where: {
        id: bookingData.libraryId.id,
      },
      include: {
        rooms: true,
      },
    });
    const roomNo = bookingData.roomNo;
    const seatId = bookingData.bookedSeat.id;
    const timeSlotId = bookingData.timeSlot[0].id.toString();
    // Assuming you want to book the first time slot
    // console.log("🚀 ~ ConfrimBooking ~ timeSlotId:", timeSlotId);
    // console.log("🚀 ~ ConfrimBooking ~ seatId:", seatId);

    const findRoomAndSeat = (roomNo, seatId) => {
      const room = lib.rooms.find((room) => {
        return room.roomNo === roomNo;
      });
      // console.log("🚀 ~ findRoomAndSeat ~ room:", room);
      // if (!room) {
      //   return { room: null, seat: null };
      // }

      const seat = room.seats.find((seat) => seat.id.toString() === seatId);
      return { room, seat };
    };

    const { room, seat } = findRoomAndSeat(roomNo, seatId);
    if (!room || !seat) {
      return res.status(404).json({ error: "Room or Seat not found" });
    }

    const timeSlot = seat.timeSlots.find(
      (slot) => slot.id.toString() === timeSlotId
    );

    if (!timeSlot) {
      return res.status(404).json({ error: "Time slot not found" });
    }

    if (timeSlot.booked) {
      return res.status(400).json({ error: "Time slot already booked" });
    }

    // Mark the time slot as booked
    timeSlot.booked = true;

    // Save the updated library document
    await lib.save();
    await room.save();

    // const booking = await Booking.findById(bookingId)
    //   .populate("userId")
    //   .populate("libraryId");

    const booking = await prisma.booking.findUnique({
      where: {
        id: bookingId,
      },
      include: {
        userId: true,
        libraryId: true,
      },
    });

    // console.log("🚀 ~ generateInvoice ~ booking:", booking);

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    // Create new invoice
    // const invoice = new Invoice({
    //   bookingId: booking.id,
    //   customerName: booking.userId.username,
    //   customerEmail: booking.userId.email,
    //   customerPhoneNumber: booking.userId.phoneNumber,
    //   libraryId: booking.libraryId,
    //   libraryName: booking.libraryId.name,
    //   libraryaddress:
    //     booking.libraryId.address.line1 +
    //     " " +
    //     booking.libraryId.address.line2 +
    //     " " +
    //     booking.libraryId.address.city +
    //     " " +
    //     booking.libraryId.address.state +
    //     " " +
    //     booking.libraryId.address.pincode,
    //   initialPrice: booking.initialPrice,
    //   finalPrice: booking.finalPrice,
    //   paid: booking.paid,
    //   bookingDate: booking.bookingDate,
    //   bookingPeriod: booking.bookingPeriod,
    //   bookingStatus: booking.bookingStatus,
    //   approved: booking.approved,
    //   seatLabel: booking.bookedSeat.seatLabel,
    //   bookingFinalDate: booking.bookingFinalDate,
    //   timeSlotDetails: booking.timeSlotDetails,
    // });
    const invoice = await prisma.invoice.create({
      data: {
        bookingId: booking.id,
        customerName: booking.userId.username,
        customerEmail: booking.userId.email,
        customerPhoneNumber: booking.userId.phoneNumber,
        libraryId: booking.libraryId,
        libraryName: booking.libraryId.name,
        libraryaddress:
          booking.libraryId.address.line1 +
          " " +
          booking.libraryId.address.line2 +
          " " +
          booking.libraryId.address.city +
          " " +
          booking.libraryId.address.state +
          " " +
          booking.libraryId.address.pincode,
        initialPrice: booking.initialPrice,
        finalPrice: booking.finalPrice,
        paid: booking.paid,
        bookingDate: booking.bookingDate,
        bookingPeriod: booking.bookingPeriod,
        bookingStatus: booking.bookingStatus,
        approved: booking.approved,
        seatLabel: booking.bookedSeat.seatLabel,
        bookingFinalDate: booking.bookingFinalDate,
        timeSlotDetails: booking.timeSlotDetails,
      },
    });

    // await invoice.save();
    // Send invoice to user
    await sendInvoiceEmail(booking.userId.email, invoice);

    return res.status(200).json({
      success: true,
      message: "Booking confirmed successfully",
      data: updatedBooking,
    });
  } catch (error) {
    // Handle possible errors
    console.error("Error confirming booking:", error);
    throw error; // Rethrow or handle as needed
  }
}

async function generateInvoice(req, res) {
  try {
    const { bookingId } = req.params;

    const invoice = await prisma.invoice.findFirst({
      data: { bookingId: bookingId },
    });

    if (!invoice) {
      return res.status(404).json({ error: "Invoice not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Invoice fetched successfully",
      data: invoice,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Failed to generate invoice",
      message: error.message,
    });
  }
}

module.exports = {
  createBooking,
  pingBookingController,
  getUserBookings,
  getBookingById,
  getBookingByLibId,
  ConfrimBooking,
  generateInvoice,
};
