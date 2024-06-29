const express = require("express");

const { AuthController } = require("../../controllers");
const AuthRouter = express.Router();
const validateAccessToken = (req, res, next) => {

    console.log("validateAccessToken");
    const accessToken = req.headers['access-token'];
    if (!accessToken) return res.status(403).send({ message: 'Access token is required' });
  
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(403).send({ message: 'Invalid or expired access token' });
      }
      req.user = user;
      next();
    });
  };
  
  // Middleware to optionally refresh tokens
  const handleRefreshToken = async (req, res, next) => {
    console.log("handleRefreshToken" );
    const refreshToken = req.headers['refresh-token'];
    if (!refreshToken) return next(); // Proceed without refreshing if no refresh token provided
  
    try {
      const newTokens = await refreshToken(refreshToken);
      res.setHeader('access-token', newTokens.accessToken); // Send new access token back in response headers
      req.user = jwt.decode(newTokens.accessToken); // Update req.user with new token info
      next();
    } catch (error) {
      return res.status(403).send({ message: 'Invalid refresh token' });
    }
  };
  
AuthRouter.get("/ping", AuthController.pingAuthController);
AuthRouter.post("/signup", AuthController.signUp);
AuthRouter.post("/signin", AuthController.signIn);

AuthRouter.post("/otp", AuthController.generateOtp);
AuthRouter.post("/verifyOtp", AuthController.verifyOtp);
AuthRouter.post("/forgotPassword", AuthController.forgetPassword);
AuthRouter.get("/me", validateAccessToken, handleRefreshToken, AuthController.getUser);

module.exports = AuthRouter;
