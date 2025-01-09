const express = require('express');

const { BookingController  } = require('../../controllers');
const BookingRouter = express.Router();


BookingRouter.get('/ping', BookingController.pingBookingController);
BookingRouter.post('/hasBoughtEarlier', BookingController.hasBoughtEarlier);
BookingRouter.post('/createBooking', BookingController.createBooking);
BookingRouter.get('/getUserBookings/:id', BookingController.getUserBookings);
BookingRouter.post('/getBookingById', BookingController.getBookingById);
BookingRouter.post('/getBookingByLibId', BookingController.getBookingByLibId);
BookingRouter.post('/confirm/:id', BookingController.confirmBooking);

BookingRouter.post('/invoices/:bookingId', BookingController.generateInvoice);




// BookingRouter.post('/getLibrary', BookingController.generateOtp);
// BookingRouter.post('/verifyOtp', BookingController.verifyOtp);



module.exports = BookingRouter;