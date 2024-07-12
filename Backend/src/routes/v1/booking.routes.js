const express = require('express');

const { BookingController  } = require('../../controllers');
const BookingRouter = express.Router();



BookingRouter.get('/ping', BookingController.pingBookingController);
BookingRouter.post('/createBooking', BookingController.createBooking);
BookingRouter.get('/getUserBookings/:id', BookingController.getUserBookings);
BookingRouter.post('/getBookingById', BookingController.getBookingById);
BookingRouter.get('/getBookingByLibId', BookingController.getBookingByLibId);
// // BookingRouter.put('/profile', BookingController.updateProfile);
// BookingRouter.post('/otp', BookingController.generateOtp);
// BookingRouter.post('/verifyOtp', BookingController.verifyOtp);



module.exports = BookingRouter;