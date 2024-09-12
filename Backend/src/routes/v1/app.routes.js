const express = require("express");



AppRouter = express.Router();
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const appController = require("../../controllers/app.controller");
const cloudinary = require("cloudinary").v2;
require('dotenv').config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
cloudinary.config({
    cloud_name: "dzwvmqbv0",
    api_key: 283514623947746,
    api_secret: "Sx6t5hAG6ynwO6mr8GN-L55A7MI",
  });
  
  // Configure Multer storage using Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "profile-images",
      resource_type: "auto",
    },
})
const upload = multer({ storage: storage });


AppRouter.get("/ping", appController.ping);
AppRouter.post("/createApp",upload.array('banner', 5) , appController.createApp);
AppRouter.get("/getApp", appController.getApp);
AppRouter.post("/editBanner",upload.array('banner', 5) , appController.editBanner);
AppRouter.post("/editLocations", appController.editLocations);
AppRouter.post("/getcityCoordinates", appController.getCityCoord);




module.exports = AppRouter;
