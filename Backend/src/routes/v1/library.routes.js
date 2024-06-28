const express = require("express");

const { LibraryController } = require("../../controllers");
const Library = express.Router();
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
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
    folder: "library-images",
    resource_type: "auto",
  },
});

const upload = multer({ storage: storage });

Library.get("/ping", LibraryController.pingAdmin);
Library.post(
  "/createLibrary",
  upload.array("images", 10),
  LibraryController.createRoom
);
Library.get("/getLibrary", LibraryController.getLibrary);
Library.get("/getLibraryById/:id", LibraryController.getLibraryById);

module.exports = Library;
