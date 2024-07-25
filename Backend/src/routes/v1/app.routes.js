const express = require("express");



AppRouter = express.Router();
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const appController = require("../../controllers/app.controller");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: "dzwvmqbv0",
    api_key: 572782272174972,
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
