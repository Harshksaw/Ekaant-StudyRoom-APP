const {z} = require("zod");
const express = require("express");
const { LibraryController } = require("../controllers");
const { uploadImageToCloudinary } = require("../utils/uploader")
const multer  = require('multer')
// async function
// create a library which

const cloudinary = require('cloudinary').v2;

const LibrarySchema = z.object({
  name: z.string(),
  description: z.string(),
  thumbnail: z.string(),
  imageUrl: z.string(),
  location: z.string(),
  Price: z.number(),
  tags: z.array(z.string()),
  reviews: z.string().uuid(), // Assuming the ObjectId is a UUID; adjust as necessary
  contact: z.record(z.any()), // Assuming contact is a flexible object; adjust as necessary
  amenities: z.array(z.string()).optional(), // Marked as optional to handle the 'required: optional'
  seatLayout: z.array(z.object({
    position: z.string(),
  })),
  seatbooked: z.array(z.object({
    position: z.string(),
  })),
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  }
});

const upload = multer({ storage: storage });

// Ping admin dummy API
const pingAdmin=  (req, res) => {
    res.status(200).json({
        success: true,
        message: "Ping admin dummy API",
    });
};
const createRoom = async (req, res) => {
  try {
    // Extract room details from request body
    // if (!req.body.thumbnail) {
    //   return res.status(400).send({ error: "Thumbnail data is missing in the request body" });
    // }
  

    // const thumbnail = await cloudinary.uploader.upload(
    //   req.files.thumbnail, {
    //   folder: "layout",
    // });
    // console.log(thumbnail)

    const {
      name,
      description,



      location,
      Price,
      tags,

      contact,
      amenities,
      seatLayout,

    } = safeParse(LibrarySchema, req.body);
    console.log(name, description, thumbnail, imageUrl, location, Price, tags, contact, amenities, seatLayout, seatbooked);
    res.status(201).json({
      success: true,
      message: 'Room created successfully',
      room: newRoom,
    });
    return;
    // Check if the room already exists


    // Create a new room document
    const newRoom = new Room({
      name,
      description,
      thumbnail,
      imageUrl,
      location,
      Price,
      tags,
      reviews, // Make sure this ID exists in your database
      contact,
      amenities: amenities || [], // Handle optional field
      seatLayout,
      seatbooked,
    });

    // Save the new room to the database
    await newRoom.save();

    // Send a response back to the client
    res.status(201).json({
      success: true,
      message: 'Room created successfully',
      room: newRoom,
    });
  } catch (error) {
    console.error('Error creating room:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create room',
      error: error.message,
    });
  }
};


  module.exports ={
    pingAdmin,
    createRoom}