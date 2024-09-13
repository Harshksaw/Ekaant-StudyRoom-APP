const express = require("express");
const { LibraryController } = require("../../controllers");
const Library = express.Router();
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
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
Library.post("/createRoom", LibraryController.createRoom);
Library.post("/updateRoom", LibraryController.addOrUpdateRoomDetails);
Library.get("/getLibrary", LibraryController.getLibrary);
Library.post("/getAllLibrary", LibraryController.getAllLibrary);
Library.get("/getLibrarybyUserId", LibraryController.getLibraryByUserId);
Library.post("/updateStatus", LibraryController.updateApproveStatus);
Library.post("/getLibraryById", LibraryController.getLibraryById);
Library.post("/getAdminLibraries", LibraryController.getAdminLibraries);
Library.post("/getAllBookings", LibraryController.getAllBookings);

module.exports = Library;
