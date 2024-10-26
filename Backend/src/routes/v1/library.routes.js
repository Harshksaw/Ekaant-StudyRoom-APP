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
  upload.fields([
    { name: "card", maxCount: 1 },
    { name: "images", maxCount: 10 },
    { name: "gst", maxCount: 1 },
    { name: "cin", maxCount: 1 },
    { name: "tan", maxCount: 1 },
    { name: "msme", maxCount: 1 },
  ]),

  LibraryController.createLibrary
);

Library.post("/updateAdminLibrary", LibraryController.EditAdminLibrary);
Library.post("/updateLibraryImage/:id",upload.fields([
  {name: "cardImage", maxCount: 1},
  {name: "images", maxCount: 5},
]) ,LibraryController.updateLibraryImages);
//Create Room
Library.post("/createRoom", LibraryController.createRoom);


Library.post("/updateRoom", LibraryController.addOrUpdateRoomDetails);

Library.get("/getLibrary", LibraryController.getLibrary);
Library.post("/getAllLibrary", LibraryController.getAllLibrary);
Library.get("/getLibrarybyUserId", LibraryController.getLibraryByUserId);
Library.post("/updateStatus", LibraryController.updateApproveStatus);
Library.post("/getLibraryById", LibraryController.getLibraryById);
Library.post("/getAdminLibraries", LibraryController.getAdminLibraries);
Library.post("/getAllBookings", LibraryController.getAllBookings);
Library.post("/deleteRoomLib", LibraryController.deleteRoom);

// libraryId, roomId

module.exports = Library;
