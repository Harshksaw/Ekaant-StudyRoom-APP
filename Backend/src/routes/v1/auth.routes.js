const express = require('express');

const { AuthController  } = require('../../controllers');
const AuthRouter = express.Router();



AuthRouter.get('/ping', AuthController.pingAuthController);
AuthRouter.post('/signup', AuthController.signUp);
AuthRouter.post('/signin', AuthController.signIn);
// AuthRouter.put('/profile', AuthController.updateProfile);
AuthRouter.post('/otp', AuthController.generateOtp);
AuthRouter.post('/verify', AuthController.verifyOtp);



module.exports = AuthRouter;