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

BookingRouter.post('/hasBoughtEarlier', BookingController.hasBoughtEarlier);



BookingRouter.post('/adminBooking', BookingController.adminBooking);



//offline Booking

// POST /api/v1/booking/CreateOfflineBooking	Create a new offline payment request (User)



BookingRouter.post('/createOffline', BookingController.offlineBooking);
BookingRouter.get('/offlineStatus', BookingController.offlineStatus);
BookingRouter.post('/approveOffline', BookingController.approveOfflinePayment);


// BookingRouter.post('/getLibrary', BookingController.generateOtp);
// BookingRouter.post('/verifyOtp', BookingController.verifyOtp);



module.exports = BookingRouter;