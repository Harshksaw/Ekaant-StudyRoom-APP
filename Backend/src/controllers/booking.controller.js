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

    if (!libraryId  || !finalPrice || timeSlot.length === 0 || !roomNo || !bookedSeat || !bookingDate || !bookingPeriod) {
      console.log("-______-", libraryId, initialPrice, finalPrice, timeSlot.length, roomNo, bookedSeat, bookingDate, bookingPeriod);
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
        bookingPeriod : parseInt(bookingPeriod),
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
        userId: parseInt(id, 10), // Ensure id is an integer
        bookingStatus: "CONFIRMED",
      },
      include: {
        user: true,
        library: true,
        invoice: true,
        friends: true,
      },
      orderBy: {
        id: 'desc',
      },
    });

    return res.status(StatusCodes.OK).json(bookings);
  } catch (error) {
    console.error(`Error fetching bookings: ${error.message}`);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error fetching bookings', error: error.message });
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

    const { user_id } = req.body;
    // if (!lib_id) {
    //   res.status(StatusCodes.BAD_REQUEST).json({ message: "lib_id not found" });
    // }
    const bookings = await prisma.booking.findMany({
      where: { user_Id: user_id },
      include: {
        user: true, // Include the related User model
      },

    
      orderBy: {
        bookingDate : 'desc',
      }
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

async function findRoomAndSeat(libraryId, roomNo, seatId) {
  try {
    console.log(`Finding library with id: ${libraryId}`);
    const library = await prisma.library.findUnique({
      where: { id: libraryId },
      include: { rooms: { include: { seats: { include: { timeSlots: true } } } } },
    });

    if (!library) {
      throw new Error('Library not found');
    }

    console.log(`Finding room with roomNo: ${roomNo}`);
    const room = library.rooms.find(room => room.roomNo === roomNo);
    if (!room) {
      throw new Error('Room not found');
    }

    console.log(`Finding seat with id: ${seatId}`);
    const seat = room.seats.find(seat => seat.id === seatId);
    if (!seat) {
      throw new Error('Seat not found');
    }

    return { room, seat };
  } catch (error) {
    console.error(`Error finding room and seat: ${error.message}`);
    throw error;
  }
}

async function confirmBooking(req, res) {
  try {
    const { libraryId, roomNo, bookedSeat, bookingId, BookedData } = req.body;
    console.log(`Confirming booking for libraryId: ${libraryId}, roomNo: ${roomNo}, bookedSeat: ${bookedSeat}, bookingId: ${bookingId}`);

    const { room, seat } = await findRoomAndSeat(libraryId, roomNo, bookedSeat.seatId);
    console.log(`Found room: ${room.id}, seat: ${seat}`);

    const timeSlotId = BookedData.timeSlot[0].slotId;
    console.log(`Finding time slot with id: ${timeSlotId}`);
    const timeSlot = BookedData.timeSlot[0];
    console.log("🚀 ~ confirmBooking ~ timeSlot:", timeSlot);
    
    if (!timeSlot) {
      return res.status(404).json({ error: "Time slot not found" });
    }
    
    if (timeSlot.booked) {
      return res.status(400).json({ error: "Time slot already booked" });
    }

    console.log(`Marking time slot as booked`);
    timeSlot.booked = true;

    console.log(`Updating library with id: ${libraryId}`);
    await prisma.library.update({
      where: { id: libraryId },
      data: {
        rooms: {
          update: {
            where: { id: room.id },
            data: {
              seats: {
                update: {
                  where: { id: seat.id },
                  data: {
                    timeSlots: {
                      update: {
                        where: { id: timeSlot.id },
                        data: { booked: true },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    console.log(`Updating booking with id: ${bookingId}`);
    const booking = await prisma.booking.update({
      where: { id: bookingId },
      data: { approved: true, bookingStatus: 'CONFIRMED' },
    });
    console.log("🚀 ~ confirmBooking ~ booking:", booking)

    console.log(`Creating invoice for bookingId: ${BookedData.bookingId}`);
    const libraryAddress = `${BookedData.libraryId.address.line1}, ${BookedData.libraryId.address.line2}, ${BookedData.libraryId.address.city}, ${BookedData.libraryId.address.state}, ${BookedData.libraryId.address.pincode}`;
    const invoice = await prisma.invoice.create({
      data: {
        bookingId: BookedData.bookingId,
        invoiceNumber: `INV-${BookedData.bookingId}`,
        libraryAddress:libraryAddress,
        libraryName: BookedData.libraryId.name,
        customerName: BookedData.libraryId.libraryOwner.fullName,
        customerEmail: BookedData.libraryId.libraryOwner.email,
        customerPhoneNumber: BookedData.libraryId.libraryOwner.phoneNumber,
        libraryId: BookedData.libraryId.id,
        initialPrice: BookedData.price,
        finalPrice: BookedData.totalAmount,
        paid: true,
        bookingDate: BookedData.bookingDate,
        bookingPeriod: BookedData.bookingPeriod,
        bookingStatus: 'Paid',
        approved: BookedData.libraryId.approved,
        bookingFinalDate: new Date(new Date(BookedData.bookingDate).setMonth(new Date(BookedData.bookingDate).getMonth() + BookedData.bookingPeriod)),
        seatLabel: BookedData.bookedSeat.seatLabel,
        timeSlotDetails: JSON.stringify(BookedData.timeSlot),
      },
    });

    console.log("Invoice created successfully:", invoice);
    return res.status(StatusCodes.OK).json({ message: 'Booking confirmed successfully' });

  } catch (error) {
    console.error(`Error confirming booking: ${error.message}`);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error confirming booking', error: error.message });
  }
}
async function generateInvoice(req, res) {
  try {
    const { bookingId } = req.params;

    const invoice = await prisma.invoice.findFirst({
     where : { bookingId: parseInt(bookingId) },
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
  confirmBooking,
  generateInvoice,
};
