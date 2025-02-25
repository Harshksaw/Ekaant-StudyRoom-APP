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

async function hasBoughtEarlier(req, res) {
  try {
    const { userId, libraryId } = req.body;

    if (!userId || !libraryId) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Both userId and libraryId are required",
      });
    }

    // Check if the user has booked this library before
    const previousBooking = await prisma.booking.findFirst({
      where: {
        userId: userId,
        libraryId: libraryId,
        paid: true,
        bookingStatus: 'CONFIRMED',
      },

    });

    if (previousBooking) {
      return res.status(StatusCodes.OK).json({
        success: true,
        message: "User has bought this library room earlier",
        data: true,
      });
    } else {
      return res.status(StatusCodes.OK).json({
        success: true,
        message: "User has not bought this library room earlier",
        data: false,
      });
    }
  } catch (error) {
    console.error("Error checking previous booking:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to check previous booking. Please try again later.",
      error: error.message,
    });
  }
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
      bookingPeriod,

    } = req.body;

    // console.log("🚀 ~ createBooking ~ req.body", req.body);

    const user = await prisma.user.findFirst({ where: { id: userId } });
    // console.log("🚀 ~ createBooking ~ user:", user);

    const bookingFinalDate = new Date(bookingDate);
    bookingFinalDate.setMonth(bookingFinalDate.getMonth() + bookingPeriod);
    console.log("🚀 ~ createBooking ~ bookingFinalDate:", bookingFinalDate);

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found" });
    }

    if (!libraryId || !finalPrice || timeSlot.length === 0 || !roomNo || !bookedSeat || !bookingDate || !bookingPeriod) {
      // console.log("-______-", libraryId, initialPrice, finalPrice, timeSlot.length, roomNo, bookedSeat, bookingDate, bookingPeriod, );
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Please provide all the required fields" });
    }

    let totalAmount = finalPrice;

    // Check if the user has a previous booking
    const previousBooking = await prisma.booking.findFirst({
      where: {
        userId,
        libraryId,
      },
    });

    if (!previousBooking) {
      const library = await prisma.library.findUnique({ where: { id: libraryId } });
      const registrationFee = library.registrationFees || 0; // Default to 0 if not specified
      totalAmount += registrationFee;

      // Create a transaction for the registration fee
      const bookingDetails = await prisma.transaction.create({
        data: {
          amount: registrationFee,
          type: 'REGISTRATION_FEE',
          description: 'Registration fee for first-time booking',
          userId: userId,
          libraryId: libraryId,

        },
      });
      console.log("🚀 ~ createBooking ~ bookingDetails:", bookingDetails);
    }

    // Create the booking
    if (typeof (bookingPeriod) === 'string') {
      bookingPeriod = parseInt(bookingPeriod);
    }

    const booking = await prisma.booking.create({
      data: {
        userId,
        libraryId,
        initialPrice,
        finalPrice: totalAmount,
        timeSlotDetails: timeSlot, // Include this field in the data object
        roomNo,
        bookedSeat,
        bookingDate,
        bookingPeriod,
        bookingFinalDate: new Date(new Date(bookingDate).setMonth(new Date(bookingDate).getMonth() + bookingPeriod)),
      },
    });

    // Create a transaction for the booking payment
    const transactionData = await prisma.transaction.create({
      data: {
        amount: finalPrice,
        type: 'BOOKING_PAYMENT',
        description: 'Payment for booking',
        userId: userId,
        libraryId: libraryId,
        bookingId: booking.id,
      },
    });

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Booking created successfully",
      data: { booking, ...transactionData },

    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to create booking. Please try again later.",
      error: error.message,
    });
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
        bookingDate: 'desc',
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
    console.log(`Finding room ${roomNo} and seat ${seatId} in library ${libraryId}`);

    // 🔹 Find the specific room with the given libraryId and roomNo
    const room = await prisma.room.findFirst({
      where: {
        libraryId: libraryId,
        roomNo: roomNo,
      },
      include: {
        seats: {
          where: { seatId: seatId }, // 🔹 Fetch only the required seat
          include: { timeSlots: true } // 🔹 Include time slots for the seat
        }
      }
    });

    // 🔹 If room is not found, return an error
    if (!room) throw new Error('Room not found');

    // 🔹 Get the first matching seat (if found)
    const seat = room.seats.length > 0 ? room.seats[0] : null;

    // 🔹 If seat is not found, return an error
    if (!seat) throw new Error('Seat not found');

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
        libraryAddress: libraryAddress,
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
      where: { bookingId: parseInt(bookingId) },
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


async function adminBooking(req, res) {
  try {
    //create booking via admin ,and bloakc the seat

    const { libraryId, roomNo, seatId, timeSlot, name, email, phoneNumber, adminId } = req.body;
    console.log("🚀 ~ adminBooking ~ req.body", req.body)

    const room = await prisma.room.findFirst({
      where: { libraryId, id: roomNo },
    });
    console.log("🚀 ~ adminBooking ~ room:", room)

    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    const seat = await prisma.seat.findFirst({
      where: { roomId: room.id, id: seatId },
    });

    if (!seat) {
      return res.status(404).json({ error: "Seat not found" });
    }
    // Find the time slot
    const timeSlotData = await prisma.timeSlot.findFirst({
      where: { seatId: seatId, id: timeSlot },
    });
    console.log("🚀 ~ adminBooking ~ timeSlotData:", timeSlotData)

    if (!timeSlotData) {
      return res.status(404).json({ error: "Time slot not found" });
    }

    if (timeSlotData.booked) {
      return res.status(400).json({ error: "Time slot already booked" });
    }


    // Create the transaction
    const transaction = await prisma.transaction.create({
      data: {
        amount: timeSlotData.price,
        type: "OFFLINE_BOOKING",
        description: `Booking by admin ${adminId}`,
        adminId,
        libraryId,
        bookingId: null, // Will update this after creating the booking
      },
    });

    // Create the booking
    const booking = await prisma.booking.create({
      data: {
        userId: adminId, // Assuming admin is also a user
        libraryId,
        initialPrice: timeSlotData.price,
        finalPrice: timeSlotData.price,
        paid: true,
        timeSlotDetails: JSON.stringify(timeSlotData),
        roomNo,

        transactionDetails: {
          transactionId: transaction.id,
          transactionDate: new Date(),
          bookedFor: name,
          email,
          phoneNumber
        },
        bookedSeat: JSON.stringify(seat),
        bookingDate: new Date(),
        bookingPeriod: 1, // Assuming 1 month booking period
        bookingStatus: "CONFIRMED",
        approved: true,

      },
    });

    // Update the transaction with the bookingId
    await prisma.transaction.update({
      where: { id: transaction.id },
      data: { bookingId: booking.id },
    });

    // Block the seat by updating the time slot
    await prisma.timeSlot.update({
      where: { id: timeSlotData.id },
      data: { booked: true, bookedById: adminId, bookingEndDate: new Date(new Date().setMonth(new Date().getMonth() + 1)) },
    });

    return res.status(200).json({
      success: true,
      message: "Booking created successfully",
      booking,
      transaction,
    });



  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "Failed to create booking",
      message: error.message,
    });
  }
}



async function offlineBooking(req, res) {
  try {
    console.debug("DEBUG: Received offlineBooking request");
    const { libraryId, userId, bookingId, amount, BookedData } = req.body;
    console.debug("DEBUG: Request body:", req.body);

    // ✅ Check daily limit (Max 5 offline requests per day)
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    console.debug("DEBUG: Today's start time:", todayStart);

    const dailyPayments = await prisma.transaction.count({
      where: {
        userId,
        isOfflinePayment: true,
        createdAt: { gte: todayStart },
      },
    });
    console.debug("DEBUG: Daily offline payments count:", dailyPayments);

    if (dailyPayments >= 5) {
      console.debug("DEBUG: Daily limit reached, returning error");
      return res.status(400).json({
        success: false,
        message: "Daily limit reached. Please try again tomorrow."
      });
    }

    // ✅ Create new offline payment request



    const bookingTable = await prisma.booking.findUnique({
      where: { id: bookingId }
    });
    console.debug("DEBUG: Booking table retrieved:", bookingTable);

    if (!bookingTable) {
      console.debug("DEBUG: Booking not found, returning error");
      return res.status(404).json({ error: "Booking not found" });
    }

    const { roomNo, bookedSeat } = bookingTable;
    console.debug("DEBUG: Extracted roomNo and bookedSeat from bookingTable:", roomNo, bookedSeat);


    console.debug("DEBUG: Updating booking with id:", bookingId);
    const booking = await prisma.booking.update({
      where: { id: bookingId },
      data: { approved: true, bookingStatus: 'CONFIRMED' },
    });
    console.debug("DEBUG: Booking updated:", booking);

    let transaction = await prisma.transaction.findFirst({
      where: {
        bookingId: bookingId,
        userId,
        libraryId,
        amount
      }
    });

    const gracePeriod = 10 * 1000; // 10 seconds
    const expiresAt = new Date(Date.now() + 3 * 60 * 1000 + gracePeriod);
    // Create the transaction
    console.debug("DEBUG: Creating transaction for offline booking");
    if (transaction) {
      console.debug("DEBUG: Offline transaction already exists, updating expiry...");
      transaction = await prisma.transaction.update({
        where: { transactionId: transaction.transactionId },
        data: {
          expiresAt,
          isOfflinePayment: true,
          offlinePaymentStatus: "PENDING",
          description: `Offline payment request for booking ${bookingId} at library ${libraryId} by user ${userId} at ${new Date().toISOString()}`
        }


      });
    } else {
      throw new Error("Transaction not found");
      console.debug("DEBUG: No existing offline transaction found");
      // If not, create a new transaction
      transaction = await prisma.transaction.create({
        data: {
          userId,
          libraryId,
          bookingId,
          amount,
          description: `Offline payment request for booking ${bookingId} at library ${libraryId} by user ${userId} at ${new Date().toISOString()}`,
          type: "OFFLINE_BOOKING",
          isOfflinePayment: true,
          offlinePaymentStatus: "PENDING",
          expiresAt
        }
      });
    }

    console.debug("DEBUG: Transaction created:", transaction);

    console.debug("DEBUG: Creating invoice for bookingId:", bookingId);
    res.status(200).json({
      success: true,
      message: "Offline payment request created successfully",
      data: transaction,
    });
    console.debug("DEBUG: offlineBooking response sent");
  } catch (error) {
    console.error("DEBUG: Error in offlineBooking:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to create booking",
      message: error.message,
    });
  }
}
async function offlineStatus(req, res) {
  try {
    // Use query parameters instead of route params for flexibility
    const { transactionId } = req.query;
    // console.log("🚀 ~ offlineStatus ~ transactionId:", transactionId)
    if (!transactionId) {
      return res.status(400).json({ error: "transactionId is required" });
    }

    const transaction = await prisma.transaction.findUnique({
      where: { transactionId }
    });

    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    return res.status(200).json({ status: transaction.offlinePaymentStatus });
  } catch (error) {
    console.error("Error in offlineStatus:", error);
    return res.status(500).json({ error: error.message });
  }
}


const approveOfflinePayment = async (req, res) => {
  const { transactionId } = req.params; // Admin only provides transactionId

  try {
    console.debug(`DEBUG: Received transactionId: ${transactionId}`);

    // 1️⃣ Find the transaction and its related booking
    const transaction = await prisma.transaction.findUnique({
      where: { transactionId },
      include: { booking: true }
    });

    if (!transaction) {
      console.debug(`DEBUG: Transaction not found: ${transactionId}`);
      return res.status(404).json({ error: "Transaction not found" });
    }

    if (transaction.offlinePaymentStatus !== "PENDING") {
      console.debug(`DEBUG: Transaction already processed: ${transactionId}`);
      return res.status(400).json({ error: "Payment already processed" });
    }

    console.debug(`DEBUG: Found transaction: ${transactionId}, processing approval...`);

    // 2️⃣ Ensure the booking exists and has seat/timeSlot info
    const booking = transaction.booking;
    if (!booking || !booking.bookedSeat || !booking.timeSlotDetails) {
      console.debug(`DEBUG: Missing booking data for transaction: ${transactionId}`);
      return res.status(404).json({ error: "Booking data missing" });
    }

    const seatId = booking.bookedSeat.id;
    console.log("🚀 ~ approveOfflinePayment ~ seatId:", seatId)
    const timeSlotId = booking.timeSlotDetails[0].slotId;
    console.log("🚀 ~ approveOfflinePayment ~ timeSlotId:", timeSlotId)

    console.debug(`DEBUG: Booking found for seatId: ${seatId}, timeSlotId: ${timeSlotId}`);

    // 3️⃣ Prevent double booking
    const existingTimeSlot = await prisma.timeSlot.findFirst({
      where: { slotId: timeSlotId, seatId: seatId }
    });

    if (!existingTimeSlot) {
      console.debug(`DEBUG: Time slot not found: ${timeSlotId}`);
      return res.status(404).json({ error: "Time slot not found" });
    }

    if (existingTimeSlot.booked) {
      console.debug(`DEBUG: Time slot already booked: ${timeSlotId}`);
      return res.status(400).json({ error: "Time slot already booked" });
    }

    // 4️⃣ Update transaction to APPROVED
    await prisma.transaction.update({
      where: { transactionId },
      data: {
        offlinePaymentStatus: "APPROVED",
        isOfflinePayment: true,
        description: "Offline payment approved by admin"
      }
    });


    console.debug(`DEBUG: Transaction marked as APPROVED: ${seatId}`);

    // 5️⃣ Block the seat by updating TimeSlot
    await prisma.timeSlot.updateMany({
      where: { slotId: timeSlotId, seatId: seatId },
      data: {
        booked: true,
        bookedById: booking.userId,
        bookingEndDate: new Date(Date.now() + 3 * 60 * 60 * 1000) // Blocks for 3 hours
      }
    });

    const transactionWithInvoice = await prisma.transaction.findUnique({
      where: { transactionId: receivedTransactionId },
      include: {
        booking: {
          include: {
            user: true, // Get user details
            library: {
              include: {
                libraryOwner: true, // Get library admin details
              },
            },
            bookedSeat: true, // Ensure this exists in the schema
            timeSlots: true, // Ensure this exists in the schema
          },
        },
      },
    });
    console.log("🚀 ~ approveOfflinePayment ~ transactionWithInvoice:", transactionWithInvoice)

    if (!transactionWithInvoice || !transactionWithInvoice.booking) {
      return res.status(404).json({ error: "Transaction or booking not found" });
    }

    const bookingFromInvoice = transactionWithInvoice.booking;
    const library = bookingFromInvoice.library || {};
    const libraryOwner = library.libraryOwner || {};
    const user = bookingFromInvoice.user || {};

    // Construct the library address
    const libraryAddress = library.address
      ? `${library.address.line1 || ''}, ${library.address.line2 || ''}, ${library.address.city || ''}, ${library.address.state || ''}, ${library.address.pincode || ''}`
      : "Address Not Available";

    // Handle missing seat and time slot details
    const seatLabel = bookingFromInvoice.bookedSeat ? bookingFromInvoice.bookedSeat.seatLabel : "N/A";
    const timeSlotDetails = bookingFromInvoice.timeSlots ? JSON.stringify(bookingFromInvoice.timeSlots) : "[]";


   
// ✅ Create the Invoice
const invoice = await prisma.invoice.create({
  data: {
    bookingId: bookingFromInvoice.id,
    invoiceNumber: `INV-${bookingFromInvoice.id}`,
    libraryAddress: libraryAddress,
    libraryName: library.name || "Unknown Library",
    customerName: user.fullName || "N/A",
    customerEmail: user.email || "N/A",
    customerPhoneNumber: user.phoneNumber || "N/A",
    libraryId: library.id || null,
    initialPrice: bookingFromInvoice.initialPrice || 0,
    finalPrice: bookingFromInvoice.finalPrice || 0,
    paid: transactionWithInvoice.isOfflinePayment
      ? transactionWithInvoice.offlinePaymentStatus === "APPROVED"
      : true,
    bookingDate: bookingFromInvoice.bookingDate ? new Date(bookingFromInvoice.bookingDate) : new Date(),
    bookingPeriod: bookingFromInvoice.bookingPeriod || 1,
    bookingStatus: transactionWithInvoice.offlinePaymentStatus || 'Paid',
    approved: library.approved || false,
    bookingFinalDate: new Date(
      new Date(bookingFromInvoice.bookingDate || new Date()).setMonth(
        new Date(bookingFromInvoice.bookingDate || new Date()).getMonth() + (bookingFromInvoice.bookingPeriod || 1)
      )
    ),
    seatLabel: seatLabel,
    timeSlotDetails: timeSlotDetails,
  },
});


console.log("🚀 ~ approveOfflinePayment ~ invoice:", invoice)


    console.debug(`DEBUG: Seat successfully booked: seatId ${seatId}, timeSlotId ${timeSlotId}`);

    return res.json({ success: true, message: "Offline payment approved & seat blocked" });

  } catch (error) {
    console.error(`ERROR: Approving offline payment failed: ${error.message}`);
    return res.status(500).json({ error: "Internal server error" });
  }
};
const listOfflinePaymentRequests = async (req, res) => {
  const { adminId } = req.params; // Assuming admin authentication is in place

  try {
    console.debug(`DEBUG: Fetching offline payment requests for adminId: ${adminId}`);

    // 1️⃣ Find all libraries owned by this admin
    const ownedLibraries = await prisma.library.findMany({
      where: { libraryOwnerId: parseInt(adminId) },
      select: { id: true }
    });

    if (ownedLibraries.length === 0) {
      console.debug(`DEBUG: Admin ${adminId} owns no libraries.`);
      return res.json({ success: true, offlinePayments: [] });
    }

    const libraryIds = ownedLibraries.map(lib => lib.id);
    console.debug(`DEBUG: Admin owns libraries with IDs: ${libraryIds}`);

    // 2️⃣ Fetch pending transactions only for these libraries
    const transactions = await prisma.transaction.findMany({
      where: {
        offlinePaymentStatus: "PENDING",
        expiresAt: { gt: new Date() }, // Only show requests that haven't expired
        libraryId: { in: libraryIds } // Only fetch requests for admin's libraries
      },
      include: {
        user: {
          select: { id: true, username: true, email: true, phoneNumber: true }
        },
        booking: {
          select: {
            id: true,
            library: { select: { id: true, name: true } },
            bookedSeat: true,
            timeSlotDetails: true,
            bookingDate: true
          }
        }
      },
      orderBy: { expiresAt: "asc" } // Sort by earliest expiration
    });

    console.debug(`DEBUG: Found ${transactions.length} pending transactions for admin ${adminId}`);

    // 3️⃣ Format data to include a countdown timer
    const formattedTransactions = transactions.map(transaction => ({
      transactionId: transaction.transactionId,
      user: transaction.user,
      library: transaction.booking?.library,
      bookedSeat: transaction.booking?.bookedSeat,
      timeSlotDetails: transaction.booking?.timeSlotDetails,
      expiresAt: transaction.expiresAt,
      remainingTime: Math.max(0, Math.floor((new Date(transaction.expiresAt) - new Date()) / 1000)) // Convert to seconds
    }));

    return res.json({ success: true, offlinePayments: formattedTransactions });

  } catch (error) {
    console.error(`ERROR: Fetching offline payment requests failed: ${error.message}`);
    return res.status(500).json({ error: "Internal server error" });
  }
};



module.exports = {
  createBooking,
  pingBookingController,
  getUserBookings,
  getBookingById,
  getBookingByLibId,
  confirmBooking,
  generateInvoice,
  hasBoughtEarlier,
  adminBooking,
  offlineBooking,
  offlineStatus,
  approveOfflinePayment,
  listOfflinePaymentRequests
};
