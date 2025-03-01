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
AppRouter.post("/editLocations",upload.single('locationImage'), appController.editLocations);
AppRouter.post("/getcityCoordinates/:id", appController.getCityCoord);


AppRouter.get('/getLocations', appController.getLocations);
AppRouter.delete('/getLocations/:locationId', appController.deleteLocations);



module.exports = AppRouter;
