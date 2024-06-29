const express = require('express');

const { BookingController  } = require('../../controllers');
const BookingRouter = express.Router();



BookingRouter.get('/ping', BookingController.pingBookingController);
BookingRouter.post('/createBooking', BookingController.createBooking);
// BookingRouter.post('/signin', BookingController.signIn);
// // BookingRouter.put('/profile', BookingController.updateProfile);
// BookingRouter.post('/otp', BookingController.generateOtp);
// BookingRouter.post('/verifyOtp', BookingController.verifyOtp);



module.exports = BookingRouter;