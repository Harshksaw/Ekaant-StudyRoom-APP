const express = require("express");

const { AuthController } = require("../../controllers");
const AuthRouter = express.Router();

const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dbnnlqq5v",
  api_key: 283514623947746,
  api_secret: "E2s6axKWvXTiJi5_DGiFuPe7Lxo",
});



// const upload = multer({ storage: storage });

const validateAccessToken = (req, res, next) => {
  console.log("validateAccessToken");
  const accessToken = req.headers["access-token"];
  if (!accessToken)
    return res.status(403).send({ message: "Access token is required" });

  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res
        .status(403)
        .send({ message: "Invalid or expired access token" });
    }
    req.user = user;
    next();
  });
};


function handleUploadError(err, req, res, next) {
  if (err) {
    // Log the error to the console
    console.error(err);
    // Send an error response to the client
    res.status(500).json({ error: "An error occurred during file upload" });
    return;
  }
  next();
}


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Initialize upload middleware
const upload = multer({ storage: storage });
AuthRouter.get("/ping", AuthController.pingAuthController);
AuthRouter.post("/signup", upload.single("image"), AuthController.signUp);
AuthRouter.post("/signin", AuthController.signIn);

AuthRouter.post("/addFriend/:userId", AuthController.addFriend);
AuthRouter.post("/getFriends/:userId", AuthController.getFriends);

AuthRouter.post("/otp", AuthController.sendOtp);
AuthRouter.post("/emailotp", AuthController.sendEmailOtp);
AuthRouter.post("/verifyOtp", AuthController.verifyOtp);
AuthRouter.post("/verifyEmailOtp", AuthController.verifyEmailOtp);
AuthRouter.post("/forgotPassword", AuthController.forgetPassword);
AuthRouter.get(
  "/me",
  validateAccessToken,

  AuthController.getUser
);
AuthRouter.post(
  "/profilepic",
  upload.single("profilepic"),
  AuthController.changeProfilePic
);

module.exports = AuthRouter;
