const express = require("express");

const { AdminController } = require("../../controllers");
const AdminRouter = express.Router();


const multer = require("multer");




// Configure Multer storage using Cloudinary
 
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now())
  }
});

// Add limits property to the multer configuration
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 } // Limit of 2MB
});



// const validateAccessToken = (req, res, next) => {
//   console.log("validateAccessToken");
//   const accessToken = req.headers["access-token"];
//   if (!accessToken)
//     return res.status(403).send({ message: "Access token is required" });

//   jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//     if (err) {
//       return res
//         .status(403)
//         .send({ message: "Invalid or expired access token" });
//     }
//     req.user = user;
//     next();
//   });
// };

// // Middleware to optionally refresh tokens
// const handleRefreshToken = async (req, res, next) => {
//   console.log("handleRefreshToken");
//   const refreshToken = req.headers["refresh-token"];
//   if (!refreshToken) return next(); // Proceed without refreshing if no refresh token provided

//   try {
//     const newTokens = await refreshToken(refreshToken);
//     res.setHeader("access-token", newTokens.accessToken); // Send new access token back in response headers
//     req.user = jwt.decode(newTokens.accessToken); // Update req.user with new token info
//     next();
//   } catch (error) {
//     return res.status(403).send({ message: "Invalid refresh token" });
//   }
// };




AdminRouter.get("/ping", AdminController.pingAdminController);
AdminRouter.post("/registerAdmin", upload.fields([{ name: 'aadhar', maxCount: 1 }, { name: 'pan', maxCount: 1 }]), AdminController.RegisterAdmin);

// AdminRouter.post("/addFriend/:userId", AdminController.addFriend);
// AdminRouter.post("/getFriends/:userId", AdminController.getFriends);

// AdminRouter.post("/otp", AdminController.sendOtp);
// AdminRouter.post("/emailotp", AdminController.sendEmailOtp);
// AdminRouter.post("/verifyOtp", AdminController.verifyOtp);
// AdminRouter.post("/verifyEmailOtp", AdminController.verifyEmailOtp);
// AdminRouter.post("/forgotPassword", AdminController.forgetPassword);
// AdminRouter.get(
//   "/me",
//   validateAccessToken,
//   handleRefreshToken,
//   AdminController.getUser
// );
// AdminRouter.post(
//   "/profilepic",
//   upload.single("profilepic"),
//   AdminController.changeProfilePic
// );

module.exports = AdminRouter;
