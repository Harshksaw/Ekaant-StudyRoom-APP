const { z } = require("zod");

const { LibraryController } = require(".");

const multer = require("multer");
const express = require("express");
const cloudinary = require("cloudinary").v2;

const { upload } = require("multer");
const { Library } = require("../models/library.model");
const { db } = require("../models/user.model");

// async function
// create a library which

const LibrarySchema = z.object({
  name: z.string(),
  description: z.string(),
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

// Assuming LibraryController.createRoom is an async function
const createRoom = async (req, res) => {
  try {
    const body = req.body;
    console.log(body);
    const {
      libraryOwnerId,
      name,
      description,
      location,
      price,
      reviews,
      amenities,
      seatLayout,

      timeSlot,
    } = req.body;

    const images = req.files.map((file) => file.path);
    // console.log(images);

    if (!name || !location) {
      return res.status(400).json({ error: "Name and location are required." });
    }

    const parsedLibraryOwnerId = JSON.parse(libraryOwnerId);
    const parsedName = JSON.parse(name);
    const parsedDescription = JSON.parse(description);
    const parsedLocation = JSON.parse(location);
    const parsedPrice = JSON.parse(price); // Ensure price is provided as a stringified number

    const parsedAmenities = JSON.parse(amenities); // Assuming amenities is a stringified array

    let parsedSeatLayout;
    if (typeof seatLayout === "string") {
      parsedSeatLayout = JSON.parse(seatLayout);
    } else {
      parsedSeatLayout = seatLayout; // Assuming it's already in the correct format or undefined
    }

    let parsedTimeSlot;
    if (typeof timeSlot === "string") {
      parsedTimeSlot = JSON.parse(timeSlot);
    } else {
      parsedTimeSlot = timeSlot; // Assuming it's already in the correct format
    }

    const libraryData = {

      libraryOwner: parsedLibraryOwnerId,
      name: parsedName,
      description: parsedDescription,
      location: parsedLocation,
      price: parsedPrice,

      amenities: parsedAmenities,
      seatLayout: parsedSeatLayout,

      timeSlot: parsedTimeSlot,
      images,
    };

    console.log("-----libraryr data ", parsedSeatLayout, "------");

    const LibraryData = await Library.create(libraryData);
    await LibraryData.save();

    // const newLibrary = await Library.create(libraryData);
    res.status(201).json({
      message: "Library created successfully",
      library: LibraryData,
    });
  } catch (error) {
    console.error("Error ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// get all rooms

const getLibrary = async (req, res) => {
  try {
    const roomsData = await Library.find();
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

// get room by id
const getLibraryById = async (req, res) => {
  const { id } = req.body;
  console.log(id)
  try {
    const room = await Library.findById(id);
    res.status(200).json({
      success: true,
      message: "Library data",
      data : room,
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
    const room = await Library.findByIdAndUpdate(id,{
      approved: status
    });
    console.log(room?.approved)
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


      const {userId} = req.body; // Assuming the userId is passed as a URL parameter
      console.log(userId, "userId"  )
      const libraries = await Library.find({ libraryOwner: userId })
      res.json({
        message: "Libraries retrieved successfully",
        data: libraries,
      });
    } catch (error) {
      console.error("Error retrieving libraries by user _id:", error);
      res.status(500).json({ error: "Cannot retrieve libraries" });
    }
};

module.exports = {
  pingAdmin,
  createRoom,
  getLibrary,
  getLibraryById,
  updateApproveStatus,
  getAdminLibraries
};
