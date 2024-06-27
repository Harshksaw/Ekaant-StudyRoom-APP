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
  thumbnail: z.string(),
  imageUrl: z.string(),
  location: z.string(),
  Price: z.number(),
  // tags: z.array(z.string()),
  reviews: z.string().uuid().optional(), // Assuming the ObjectId is a UUID; adjust as necessary
  contact: z.record(z.any()), // Assuming contact is a flexible object; adjust as necessary
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
    .optional(), // Marked as optional since required is false
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
      name,
      description,
      location,
      price,
      reviews,
      amenities,
      seatLayout,
      seatbooked,
      timeSlot,

    } = req.body;

    // Upload the thumbnail image to Cloudinary
    // const images = req.files?.images || [];

    // if (!images.length) {
    //   return res.status(400).json({ message: "No images uploaded!" });
    // }

    const images = req.files.map((file) => file.path);
    // console.log(images);

    if (!name || !location) {
      return res.status(400).json({ error: "Name and location are required." });
    }
   
    let parsedSeatLayout = seatLayout;
    let parsedSeatbooked = seatbooked;

    // Error handling for JSON parsing
    try {
      if (typeof seatLayout === "string") {
        parsedSeatLayout = JSON.parse(seatLayout);
      }
      if (typeof seatbooked === "string") {
        parsedSeatbooked = JSON.parse(seatbooked);
      }
    } catch (error) {
      return res.status(400).json({ error: "Invalid JSON format for seatLayout or seatbooked." });
    }
    const libraryData = {
      name,
      description,
      location,
      price,
      reviews,
      amenities,
      seatLayout: parsedSeatLayout,
      seatbooked: parsedSeatbooked,
      timeSlot,
      images,
    };

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
      count : roomsData.length,
      data :roomsData,
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
  const { id } = req.params();
  try {
    const room = await Library.findById(id);
    res.status(200).json(room);
  } catch (error) {
    console.error("Error ", error);
    res.status(500).json({ error: "cannot get room" });
  }
};
module.exports = {
  pingAdmin,
  createRoom,
  getLibrary,
  getLibraryById,
};
