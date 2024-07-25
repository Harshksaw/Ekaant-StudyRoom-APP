const { z } = require("zod");

const { LibraryController } = require(".");
const {GetNearestLibraries} =  require("../utils/location");
const multer = require("multer");
const express = require("express");
const cloudinary = require("cloudinary").v2;

const { upload } = require("multer");
const { Library } = require("../models/library.model");
const { db } = require("../models/user.model");
const { Booking } = require("../models/booking.model");
const { get } = require("mongoose");
const App = require("../models/app.model");

const LibrarySchema = z.object({
  name: z.string(),
  longDescription: z.string(),
  shortDescription: z.string(),
  // thumbnail: z.string(),

  location: z.string(),
  price: z.number(),
  // tags: z.array(z.string()),
  // reviews: z.string().uuid().optional(), // Assuming the ObjectId is a UUID; adjust as necessary

  amenities: z.array(z.string()).optional(), // Marked as optional to handle the 'required: optional'
  seatLayout: z.array(
    z.object({
      id: z.string(),
      label: z.string(),
    })
  ),
  seatbooked: z
    .array(
      z.object({
        id: z.string(),
        label: z.string(),
      })
    )
    .optional(),
  timeSlot: z.object({
    from: z.string(),
    to: z.string(),
  }),
});

// Ping admin dummy API
const pingAdmin = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Ping admin dummy API",
  });
};

// Assuming LibraryController.createLibrary is an async function
const createLibrary = async (req, res) => {
  try {
    console.log(req.files, "=================>");

    const cardImage = req.files.card[0].path;
    const images = req.files.images.map((file) => file.path);
    const gst = req.files.gst[0].path;
    const cin = req.files.cin[0].path;
    const tan = req.files.tan[0].path;
    const msme = req.files.msme[0].path;

    console.log(cardImage, images, gst, cin, tan, msme, ">>>>>uploadedFiles");

    const jsonData = JSON.parse(req.body.jsonData);

    const {
      libraryOwner,
      name,
      longDescription,
      shortDescription,
      address,

      amenities,

      legal,

      gstNumber,

      cinNumber,

      tanNumber,

      msmeNumber,
    } = jsonData;

    // const cardPath = await cardFile.save();

    // console.log(
    //   name,
    //   longDescription,
    //   shortDescription,
    //   address,


    //   amenities,
    //   timeSlot,
    //   cardImage,
    //   images,
    //   legal,
    //   gstDetails,
    //   cinDetails,
    //   tanDetails,
    //   msmeDetails
    // );
    const libraryData = {
      libraryOwner,
      name,
      longDescription,
      shortDescription,
      address,

      amenities,

      cardimage :cardImage,
      images: images,
      legal,

      gstNumber,
      gstCertificateFile: gst,

      cinNumber,
      cinCertificateFile: cin,

      tanNumber,
      tanCertificateFile: tan,

      msmeNumber,
      msmeCertificateFile: msme,
    };

    console.log("-----libraryr data-- ", libraryData, "------");

    const LibraryData = await Library.create(libraryData);
    await LibraryData.save();

    res.status(201).json({
      message: "Library created successfully",
      library: LibraryData,
    });
  } catch (error) {
    console.error("Error ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// createRoom
const createRoom = async (req, res) => {
  try {
    const libraryId = req.body.libraryId; // Assuming you're getting the library ID from the request parameters
    const library = await Library.findById(libraryId);

    if (!library) {
      return res.status(404).send({ message: 'Library not found' });
    }

    // Determine the new roomNo
    let newRoomNo = 1;
    if (library.rooms.length > 0) {
      const maxRoomNo = library.rooms.reduce((max, room) => room.roomNo > max ? room.roomNo : max, library.rooms[0].roomNo);
      newRoomNo = maxRoomNo + 1;
    }

    // Create the new room with the provided seatLayout
    const newRoom = {
      roomNo: newRoomNo,
      seatLayout: req.body.seatLayout, // Assuming seatLayout is provided in the request body

    };

    // Add the new room to the library's rooms array
    library.rooms.push(newRoom);

    // Save the updated library document
    await library.save();



    res.status(201).json({
      message: "Library created successfully",
      Library: library,
    });
  } catch (error) {
    console.error("Error ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// get all rooms

// addOrUpdateRoomDetails
const addOrUpdateRoomDetails = async (req, res) => {
  try {
    const { libraryId,  timeSlot, location } = req.body;

    const library = await Library.findById(libraryId);

    if (!library) {
      return res.status(404).send({ message: 'Library not found' });
    }

    
    const updateLibrary = await  Library.findByIdAndUpdate(libraryId, {

      timeSlot: timeSlot,
      location: location,
    }, { new: true });
    


    // Save the updated library document
    await updateLibrary.save();

    res.status(200).json({
      message: "Room details updated successfully",
      library: updateLibrary
    });
  } catch (error) {
    console.error("Error ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getLibrary = async (req, res) => {
  try {
    const roomsData = await Library.find({approved: true});
    res.status(200).json({
      success: true,
      count: roomsData.length,
      data: roomsData,
    });
  } catch (error) {
    console.error("Error fetching library data:", error);
    res.status(500).json({
      success: false,
      error: "Failed to retrieve library rooms. Please try again later.",
    });
  }
};

const getAllLibrary = async (req, res) => {
  try {

    const {city} = req.body;
    console.log(city);

    const cityCoordinates = await App.aggregate([
      { $match: {} }, // Match all documents or apply specific conditions
      { $unwind: "$locations" }, // Deconstruct the locations array
      { $match: { "locations.location": city } }, // Match the specific city
      { $project: { _id: 0, coords: "$locations.coords" } } // Project the coordinates
    ]);
    // console.log("🚀 ~ getAllLibrary ~ cityCoordinates:", cityCoordinates[0].coords)
    

    


    const roomsData = await Library.find();

    const getSortedData = await  GetNearestLibraries(roomsData, cityCoordinates[0].coords)
    console.log("🚀 ~ getAllLibrary ~ getSortedData:", getSortedData)



    res.status(200).json({
      success: true,
      count: roomsData.length,
      data: getSortedData,
    });
  } catch (error) {
    console.error("Error fetching library data:", error);
    res.status(500).json({
      success: false,
      error: "Failed to retrieve library rooms. Please try again later.",
    });
  }
};

// get room by id
const getLibraryById = async (req, res) => {
  const { id } = req.body;
  console.log(id);
  try {
    const room = await Library.findById(id);
    res.status(200).json({
      success: true,
      message: "Library data",
      data: room,
    });
  } catch (error) {
    console.error("Error ", error);
    res.status(500).json({ error: "cannot get room" });
  }
};


const getLibraryByUserId = async (req, res) => {
  const { id } = req.body;
  console.log(id);
  try {
    const room = await Library.findOne({libraryOwner : id});
    res.status(200).json({
      success: true,
      message: "Library data",
      data: room,
    });
  } catch (error) {
    console.error("Error ", error);
    res.status(500).json({ error: "cannot get room" });
  }
};
const updateApproveStatus = async (req, res) => {
  console.log(req.body, "reqqq");
  const { id, status } = req.body;
  try {
    const room = await Library.findByIdAndUpdate(id, {
      approved: status,
    });
    console.log(room?.approved);
    res.status(200).json({
      success: true,
      message: "Library status ",
      data: room,
    });
  } catch (error) {
    console.error("Error ", error);
    res.status(500).json({ error: "cannot get room" });
  }
};

const getAdminLibraries = async (req, res) => {
  try {
    const { userId } = req.body; // Assuming the userId is passed as a URL parameter
    console.log(userId, "userId");
    const libraries = await Library.find({ libraryOwner: userId });
    console.log(libraries, "libraries");
    res.json({
      message: "Libraries retrieved successfully",
      data: libraries,
    });
  } catch (error) {
    console.error("Error retrieving libraries by user _id:", error);
    res.status(500).json({ error: "Cannot retrieve libraries" });
  }
};

async function getAllBookings(req, res) {
  try {
    const bookings = await Booking.find().populate("userId").exec();
    return res.status(StatusCodes.OK).json({ bookings });
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  pingAdmin,
  createLibrary,
  getLibrary,
  getLibraryById,
  updateApproveStatus,
  getAdminLibraries,
  getAllBookings,
  createRoom ,
  addOrUpdateRoomDetails,
  getLibraryByUserId,
  getAllLibrary
};
