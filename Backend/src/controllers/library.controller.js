const { z } = require("zod");

const { LibraryController } = require(".");
const { uploadImageToCloudinary } = require("../utils/uploader");
const multer = require("multer");
const express = require("express");
const cloudinary = require("cloudinary").v2;
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
    // Validate the request body
    const { success } = LibrarySchema.safeParse(req.body);

    console.log(success, req.body);

    if (!success) {
      return res.status(400).json({ error: "Invalid request body" });
    }
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

    // Step 1: Receive Files
    const files = req.files;
    const thumbnail = files["thumbnail"] ? files["thumbnail"][0] : null;
    const images = files["images"] || [];

    // Initialize an array to hold Cloudinary URLs
    let uploadedFilesUrls = [];

    // Step 2: Upload to Cloudinary
    // Upload thumbnail if exists
    if (thumbnail) {
      const result = await cloudinary.uploader.upload(thumbnail.path);
      uploadedFilesUrls.push({ url: result.url, type: "thumbnail" });
    }

    // Upload images
    for (const image of images) {
      const result = await cloudinary.uploader.upload(image.path);
      uploadedFilesUrls.push({ url: result.url, type: "image" });
    }

    // Step 3: Save URLs to your database
    // This step depends on your database schema
    // Example: await saveLibrary({ images: uploadedFilesUrls });

    // Step 4: Respond to the client
    res.json({
      message: "Library created successfully",
      urls: uploadedFilesUrls,
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
