const { StatusCodes } = require("http-status-codes");

const zod = require("zod");
const jwt = require("jsonwebtoken");
const { User, Invoice} = require("../models");
const { Booking } = require("../models/booking.model");
const sendInvoiceEmail = require("../utils/mails/invoice.mail");



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
   
    await newBooking.save();

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

    console.log(bookings)
    return res.status(StatusCodes.OK).json({ bookings });
  } catch (error) {
    console.error(error);
  }
}

async function getBookingById(req, res) {
  try {
    console.log(req.body,"getBookingById") 

    const { id } = req.body;
    if(!id){
      res.status(StatusCodes.BAD_REQUEST).json({ message: 'id not found' });
    }
    const bookings = await Booking.find({_id: id}).populate("userId");
    return res.status(StatusCodes.OK).json({ bookings });
  } catch (error) {
    console.error(error);
  }
}

async function getBookingByLibId(req, res) {
  try {
    console.log(req.body,"getBookingByLibId") 

    const { lib_id } = req.body;
    if(!lib_id){
      res.status(StatusCodes.BAD_REQUEST).json({ message: 'lib_id not found' });
    }
    const bookings = await Booking.find({libraryId: lib_id}).populate("userId");
    console.log("🚀 ~ getBookingByLibId ~ bookings:", bookings)
    
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

    const {  bookingId,
      paymentId,
      paymentData,
      paymentStatus } = req.body;
      console.log(req.body,"ConfrimBooking")

    const transactionDetailsData = {
      bookingId,
      paymentId,
      paymentData,


    }

      if(paymentStatus){

        
        const updatedBooking = await Booking.findByIdAndUpdate(
          id,
          {
            $set: {
              transactionDetails: transactionDetailsData,
              paid: true, 
              bookingStatus: "CONFIRMED"
            }
          },
          { new: true } // Return the updated document
        );
        if (!updatedBooking) {
          throw new Error('Booking not found');
        }
      }
        
    

    return updatedBooking;
  } catch (error) {
    // Handle possible errors
    console.error('Error confirming booking:', error);
    throw error; // Rethrow or handle as needed
  }
}


// const generateInvoice = async (booking) => {
//   // Create a PDF document
//   const doc = new pdf();
//   doc.pipe(fs.createWriteStream('invoice.pdf'));

//   // Populate the PDF with invoice data
//   doc.text(`Invoice for Booking #${booking._id}`);
//   // Add more invoice content based on booking details

//   doc.end();
// };
async function generateInvoice(req, res) {
  try {
    const { bookingId } = req.params;
    const booking = await Booking.findById(bookingId).populate('userId').exec();

    console.log("🚀 ~ generateInvoice ~ booking:", booking)

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }




    // Create new invoice
    const invoice = new Invoice({
      bookingId: booking._id,
      customerName: booking.userId.username,
      customerEmail: booking.userId.email,
      customerPhoneNumber: booking.userId.phoneNumber,
      libraryId: booking.libraryId,
      initialPrice: booking.initialPrice,
      finalPrice: booking.finalPrice,
      paid: booking.paid,
      bookingDate: booking.bookingDate,
      bookingPeriod: booking.bookingPeriod,
      bookingStatus: booking.bookingStatus,
      approved: booking.approved,
      timeStamp: booking.timeStamp
    });
    // Save invoice to database
    
    // Send invoice to user
    await sendInvoiceEmail(booking.userId.email, invoice);
    
    await invoice.save();



    res.status(201).json({ 
      success: true,
      message: 'Invoice generated successfully',
      data: invoice,
     });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate invoice',
    message: error.message
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
  generateInvoice
};
