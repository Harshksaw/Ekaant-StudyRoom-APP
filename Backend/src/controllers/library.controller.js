const { z } = require("zod");

const { LibraryController } = require(".");

const multer = require("multer");
const express = require("express");
const cloudinary = require("cloudinary").v2;
const uploadImageToCloudinary = require("../utils/uploadImageToCloudinary");
const { upload } = require("multer");
const {Library} = require('../models/index')
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
      Price,
      reviews,
      contact,
      amenities,
      seatLayout,
      seatbooked,
      timeSlot,
    } = body;


    // Upload the thumbnail image to Cloudinary
    const images = req.files?.images || []; 

    // if (!images.length) {
    //   return res.status(400).json({ message: "No images uploaded!" });
    // }
    const uploadedImageUrls = req.files.map(file => file.path);

    const libraryData = {
      name,
      description,
      location,
      Price,
      reviews,
      contact,
      amenities,
      seatLayout,
      seatbooked,
      timeSlot,
      imageUrl: uploadedImageUrls,
    };

    // Validate the library data
    const LibraryData = await Library.create(libraryData);

    LibraryData.save();
 

    // const newLibrary = await Library.create(libraryData);

    res.status(201).json({
      message: "Library created successfully",
      urls: uploadedImageUrls,
      library: dbentry,


    });
  } catch (error) {
    console.error("Error uploading files to Cloudinary:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  pingAdmin,
  createRoom,
};
