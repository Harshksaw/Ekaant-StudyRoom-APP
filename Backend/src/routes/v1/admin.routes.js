const express = require("express");
const path = require('path');
const { AdminController } = require("../../controllers");
const AdminRouter = express.Router();
const multer = require('multer');

const uploadPath = path.join(__dirname, 'uploads');

// Multer storage configuration
const storage = multer.diskStorage({
  destination: uploadPath,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

AdminRouter.get("/ping", AdminController.pingAdminController);
AdminRouter.post(
  "/registerAdmin",
  upload.single('image'),
  AdminController.RegisterAdmin
);
AdminRouter.post("/loginAdmin", AdminController.LoginAdmin);
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
