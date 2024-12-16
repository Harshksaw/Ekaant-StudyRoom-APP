const { z } = require("zod");

const { v4: uuidv4 } = require("uuid");
const { GetNearestLibraries } = require("../utils/location");
const multer = require("multer");
const express = require("express");
const cloudinary = require("cloudinary").v2;
const Review = require("../models/review.model");
const Distance = require("../models/Distance.model");
const { Library } = require("../models/library.model");
const { Room } = require("../models/room.model");
const { db } = require("../models/user.model");
const { Booking } = require("../models/booking.model");
const { get, default: mongoose } = require("mongoose");
const App = require("../models/app.model");
const { PrismaClient, Prisma } = require('@prisma/client');


const prisma = new PrismaClient();

const calculateDistance = (coords1, coords2) => {
  // Haversine formula to calculate distance between two coordinates
  const [lat1, lon1] = coords1;
  const [lat2, lon2] = coords2;
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
};
const calculateDistances = async () => {
  try {
    const libraries = await Library.find({ approved: true });
    const cities = await App.aggregate([
      { $unwind: "$locations" },
      { $project: { city: "$locations.location", coords: "$locations.coords" } }
    ]);

    for (const library of libraries) {
      for (const city of cities) {
        const distance = calculateDistance(library.location, city.coords);
        console.log("🚀 ~ calculateDistances ~ distance:", distance)
        const distanceRecord = new Distance({
          library: library.id,
          city: city.city,
          distance: distance ? distance : 0
        });
        await distanceRecord.save();
      }
    }
    console.log('Distances calculated and saved successfully.');
  } catch (error) {
    console.error('Error calculating distances:', error);
  }
};

// Ping admin dummy API
const pingAdmin = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Ping admin dummy API",
  });
};
const calculateLowestPrice = async (libraryId) => {
  const library = await prisma.library.findFirst({
    where: { id: parseInt(libraryId) },
    include: {
      rooms: {
        include: {
          seats: {
            include: {
              timeSlots: true,
            },
          },
        },
      },
    },
  });

  if (!library) {
    throw new Error(`Library with ID ${libraryId} not found`);
  }

  let lowestPrice = Infinity;

  library.rooms.forEach((room) => {
    room.seats.forEach((seat) => {
      seat.timeSlots.forEach((slot) => {
        const price = parseFloat(slot.price);
        console.log("🚀 ~ calculateLowestPrice ~ price:", price);
        if (price < lowestPrice && price > 0) {
          lowestPrice = price;
        }
      });
    });
  });

  await prisma.library.update({
    where: { id: parseInt(libraryId) },
    data: { Price: lowestPrice === Infinity ? 0 : lowestPrice },
  });
};

// Assuming LibraryController.createLibrary is an async function
const createLibrary = async (req, res) => {
  try {
    // console.log(req.files, "=================>");

    const cardImage = req.files.card[0].path;
    const images = req.files.images
      ? req.files.images.map((file) => file.path)
      : [];
    const gst = req.files.gst ? req.files.gst[0].path : null;
    const cin = req.files.cin ? req.files.cin[0].path : null;
    const tan = req.files.tan ? req.files.tan[0].path : null;
    const msme = req.files.msme ? req.files.msme[0].path : null;

    // console.log(cardImage, images, gst, cin, tan, msme, ">>>>>uploadedFiles");

    const jsonData = JSON.parse(req.body.jsonData);
    console.log("🚀 ~ createLibrary ~ jsonData:", jsonData)

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

    const libraryData = {

  libraryOwner: {
    connect: { id: parseInt(libraryOwner) } // Ensure the libraryOwner is connected correctly
  },
      name,
      longDescription,
      shortDescription,
      address,
     amenities: {
    create: {
      coldWater: amenities.includes('coldWater'),
      wifi: amenities.includes('wifi'),
      ac: amenities.includes('ac'),
      locker: amenities.includes('locker'),
      separateWashroom: amenities.includes('separateWashroom'),
      news: amenities.includes('News'),
      discussionArea: amenities.includes('discussionArea'),
      lunchArea: amenities.includes('LunchArea'),
      movingChair: amenities.includes('MovingChair'),
      floorMat: amenities.includes('FloorMat'),
      separateParking: amenities.includes('SeparateParking'),
      commonParking: amenities.includes('CommonParking'),
    }
  },
      cardImage: cardImage,
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

    const LibraryData = await prisma.library.create({ data: libraryData });


    calculateLowestPrice(LibraryData.id);
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
    // console.log(req.body, "=================>");
    const libraryId = req.body.libraryId; 
    const library = await prisma.library.findFirst({
      where  : {
       id: parseInt(libraryId)
      }
    })

    if (!library) {
      return res.status(404).send({ message: "Library not found" });
    }

    const { seatLayout, timeSlot, location, ac } = req.body;

    if (!library) {
      return res.status(404).send({ message: "Library not found" });
    }

    // Determine the new roomNo
    let newRoomNo = 1;
    if (library.rooms && library.rooms.length > 0) {
      const maxRoomNo = library.rooms.length;
      newRoomNo = maxRoomNo + 1;
    }
    console.log(newRoomNo, "newRoomNo");

    // Create the new room with the provided seatLayout
    const newRoom = await prisma.room.create({
      data: {
      libraryId: parseInt(libraryId),
      roomNo: newRoomNo,
      seats: {
        create: seatLayout.map((seat) => ({
        seatId: seat.id,
        seatLabel: seat.label,
        timeSlots: {
          create: timeSlot
          .filter((slot) => slot.from && slot.to)
          .map((slot) => ({
            slotId: uuidv4(), // Generate a unique slotId
            from: slot.from,
            to: slot.to,
            price: parseInt(slot.price),
          })),
        },
        })),
      },
      Ac: ac,
      },
    });





    if (location) {
      library.location = location;
    }

    await prisma.library.update({
      where: { id: parseInt(libraryId) },
      data: {
      rooms: {
        connect: { id: newRoom.id },
      },
      },
    });

    // Save the updated library document


    await calculateLowestPrice(libraryId);

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
const createDummyLibrary = async (req, res) => {
  try {
    const { name, shortDescription, comingSoonMessage, location } = req.body;
    console.log(req.body, "=================>");
    // const { cardImage } = req.files;
    const cardImage = req.file.path;
    console.log("card image of dummy library", cardImage);
    if (!name || !shortDescription || !cardImage || !comingSoonMessage) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide name, shortDescription, cardImage, and comingSoonMessage.",
      });
    }

    const newLibrary = new Library({
      name,
      shortDescription,
      cardImage,
      comingSoon: true,
      commingSoonMessage: comingSoonMessage,
      location
    });

    await newLibrary.save();
    return res.status(201).json({
      success: true,
      message: "Library created successfully.",
      data: newLibrary,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create library.",
      error: error.message,
    });
  }
};
// addOrUpdateRoomDetails
const addOrUpdateRoomDetails = async (req, res) => {
  try {
    const { libraryId, timeSlot, location } = req.body;

    const library = await Library.findById(libraryId);

    if (!library) {
      return res.status(404).send({ message: "Library not found" });
    }

    const updateLibrary = await Library.findByIdAndUpdate(
      libraryId,
      {
        timeSlot: timeSlot,
        location: location,
      },
      { new: true }
    );

    // Save the updated library document
    await updateLibrary.save();

    await calculateLowestPrice(libraryId);
    res.status(200).json({
      message: "Room details updated successfully",
      library: updateLibrary,
    });
  } catch (error) {
    console.error("Error ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getLibrary = async (req, res) => {
  try {
    const roomsData = await Library.find().populate("libraryOwner");
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
    const { city } = req.body;
    console.log(city);
    if (!city) {
      return res.status(400).json({ success: false, message: "City is required" });
    }

    const distances = await Distance.find({ city }).populate({
      path: "library",
      populate: "rooms"
    }).sort({ distance: 1 });


    const filterLibrary = distances.filter((distance) => distance.library.approved === true && distance.library.rooms.length > 0);




    if (!filterLibrary.length) {
      return res.status(404).json({ success: false, message: "No libraries found for the specified city" });
    }

    // const cityCoordinates = await App.aggregate([
    //   { $match: {} }, // Match all documents or apply specific conditions
    //   { $unwind: "$locations" }, // Deconstruct the locations array
    //   { $match: { "locations.location": city } }, // Match the specific city
    //   { $project: { _id: 0, coords: "$locations.coords" } }, // Project the coordinates
    // ]);

    // console.log("🚀 ~ getAllLibrary ~ cityCoordinates:", cityCoordinates[0].coords)

    const libraries = filterLibrary.map(distance => ({
      library: distance.library,
      distance: distance.distance
    }));

    // const roomsData = await Library.find({ approved: true });

    // const getSortedData = await GetNearestLibraries(
    //   roomsData,
    //   cityCoordinates[0].coords
    // );
    // console.log("🚀 ~ getAllLibrary ~ getSortedData:", getSortedData);

  
    res.status(200).json({
      success: true,
      count: libraries.length,
      data: libraries,
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
    const room = await Library.findById(id)
      .populate("rooms")
      .populate("libraryOwner");
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

const getLibraryRooms = async (req, res) => {
  const { id } = req.body;
  console.log(id);
  try {
    const room = await Library.findById(id).populate({
      path: "rooms",
      populate: {
        path: "seats",
        populate: {
          path: "timeSlots",
        },
      },
    });
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
    const room = await Library.findOne({ libraryOwner: id })
      .populate("rooms")
      .populate("libraryOwner");
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

    const libraries = await prisma.library.findMany({ where : {libraryOwnerId : parseInt(userId) }});
    console.log("🚀 ~ getAdminLibraries ~ libraries:", libraries)

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

const EditAdminLibrary = async (req, res) => {
  try {
    const {
      name,
      shortDescription,
      longDescription,
      amenities,
      libraryId,
      address,
      registrationFees,
    } = req.body;

    const library = await Library.findByIdAndUpdate(
      libraryId,
      {
        name,
        shortDescription,
        longDescription,
        amenities,
        address,
        registrationFees
      },
      { new: true } // Return the updated document
    );
    if (!library) {
      return res.status(404).json({ message: "Library not found" });
    }

    await library.save();
    await calculateLowestPrice(libraryId);
    res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    console.error("Error deleting room:", error);
    res.status(500).json({ message: "Error deleting room", error });
  }
};

const updateLibraryImages = async (req, res) => {
  try {
    const libraryId = req.params.id;

    console.log("---", req.files);

    const cardImage = req.files?.cardImage ? req.files.cardImage[0].path : null;
    const images = req.files?.images
      ? req.files.images.map((file) => file.path)
      : [];
    // const images = req.files?.images
    console.log("🚀 ~ updateLibraryImages ~ images:", images);

    const library = await Library.findById(libraryId);
    if (!library) {
      return res.status(404).json({ message: "Library not found" });
    }

    if (cardImage) {
      library.cardImage = cardImage;
    }

    if (images.length > 0) {
      library.images = images;
    }

    await library.save();

    res
      .status(200)
      .json({ message: "Library images updated successfully", data: library });
  } catch (error) {
    console.error("Error updating library images:", error);
    res.status(500).json({ message: "Error updating library images", error });
  }
};

const deleteRoom = async (req, res) => {
  try {
    const { libraryId, roomId } = req.body;

    const library = await Library.findById(libraryId).populate("rooms");
    if (!library) {
      return res.status(404).json({ message: "Library not found" });
    }

    const roomIndex = library.rooms.findIndex(
      (room) => room.id.toString() === roomId
    );

    if (roomIndex === -1) {
      return res.status(404).json({ message: "Room not found" });
    }
    library.rooms.splice(roomIndex, 1);

    await Room.findByIdAndDelete(roomId);
    for (let i = 0; i < library.rooms.length; i++) {
      const room = await Room.findById(library.rooms[i].id);
      if (room) {
        room.roomNo = i + 1; // Room numbers start from 1
        await room.save();
      }
    }

    const lib = await library.save();
    await calculateLowestPrice(libraryId);
    res.status(200).json({ message: "Room deleted successfully", data: lib });
  } catch (error) {
    console.error("Error deleting room:", error);
    res.status(500).json({ message: "Error deleting room", error });
  }
};

const deleteDummy = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedLibrary = await Library.findByIdAndDelete(id);

    if (!deletedLibrary) {
      return res.status(404).json({ message: "Library not found." });
    }

    res.status(200).json({ message: "Library deleted successfully." });
  } catch (error) {
    console.error("Error deleting library:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getDummy = async (req, res) => {
  try {
    const dummyLibrary = await Library.find({ comingSoon: true });

    if (!dummyLibrary) {
      return res.status(404).json({ message: "No coming soon library found." });
    }

    res.status(200).json({ dummyLibrary });
  } catch (error) {
    console.error("Error fetching coming soon library:", error);
    res.status(500).json({ message: "Server error" });
  }
};
// Controller to create a review
const createReview = async (req, res) => {
  try {
    const { libraryId } = req.params;
    const { user, review, stars } = req.body;

    console.log(req.body, "req.body");

    const ifUser = await Review.findOne({
      user
    })
    console.log("🚀 ~ createReview ~ ifUser:", ifUser)
    // if(ifUser){
    //    res.status(400).json({ message: 'You have already reviewed this library' });
    // }

    const newReview = new Review({ user, review, stars, library: libraryId });
    await newReview.save();
    const reviews = await Review.find({ library: libraryId });

    // Calculate the average rating manually
    let totalStars = 0;
    reviews.forEach(review => {
      totalStars += review.stars;
    });

    const avgRating = reviews.length > 0 ? totalStars / reviews.length : 0;
    console.log("🚀 ~ avgRating:", avgRating);

   

    await Library.findByIdAndUpdate(libraryId, {
      $push: { reviews: newReview.id },
      $set: { avgRating: avgRating }
    });

    res.status(201).json(newReview);
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: error.message });
  }
};

// Controller to get reviews for a library
const getReviews = async (req, res) => {
  try {
    const { libraryId } = req.params;

    const library = await Library.findById(libraryId).populate({
      path: "reviews",
      populate: {
        path: "user", // Specify the path for the nested population
        model: "User" // Specify the model if necessary
      }
    });
    if (!library) {
      return res.status(404).json({ message: 'Library not found' });
    }

    res.status(200).json({data : library.reviews, avgRating: library.avgRating});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




module.exports = {
  pingAdmin,
  createLibrary,
  getLibrary,
  getLibraryById,
  updateApproveStatus,
  getAdminLibraries,
  getAllBookings,
  createRoom,
  addOrUpdateRoomDetails,
  getLibraryByUserId,
  getAllLibrary,
  EditAdminLibrary,
  updateLibraryImages,
  deleteRoom,
  getLibraryRooms,
  createDummyLibrary,
  deleteDummy,
  getDummy,
  createReview,
  getReviews,
  calculateDistances,
};
