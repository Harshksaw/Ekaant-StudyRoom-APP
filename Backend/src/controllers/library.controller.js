const {z} = require("zod");

const { LibraryController } = require("../controllers");
const { uploadImageToCloudinary } = require("../utils/uploader")
const multer  = require('multer')
const express = require('express');
const cloudinary = require('cloudinary').v2;
// async function
// create a library which



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
  

    const {
      name,
      description,



      location,
      Price,
      tags,

      contact,
      amenities,
      seatLayout,

    } = req.body;
    console.log(name, description, thumbnail, imageUrl, location, Price, tags, contact, amenities, seatLayout, seatbooked);

    // try {
    //   // Upload image to Cloudinary
    //   const result = await cloudinary.uploader.upload(req.file.path, {
    //     folder: 'thumb'
    //   });
    
    //   // Assuming the creation of the room is successful and you have the room details
    //   const { name } = req.body;
    //   // Simulate room creation, replace with actual room creation logic
    //   const newRoom = { name, imageUrl: result.secure_url };
    
    //   // Send a single response with the room creation success message and details
    //   res.status(201).json({
    //     success: true,
    //     message: 'Room created successfully',
    //     room: newRoom,
    //   });
    // } catch (error) {
    //   console.error(error);
    //   // Send an error response if anything goes wrong during the process
    //   res.status(500).json({ error: 'Error processing your request' });
    // }



    // Check if the room already exists


    // Create a new room document
    // const newRoom = new Room({
    //   name,
    //   description,
    //   thumbnail,
    //   imageUrl,
    //   location,
    //   Price,
    //   tags,
    //   reviews, // Make sure this ID exists in your database
    //   contact,
    //   amenities: amenities || [], // Handle optional field
    //   seatLayout,
    //   seatbooked,
    // });

    // // Save the new room to the database
    // await newRoom.save();

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
    createRoom
  
  }