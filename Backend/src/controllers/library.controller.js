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
const { PrismaClient, Prisma } = require("@prisma/client");

const prisma = new PrismaClient();

const calculateDistance = (coords1, coords2) => {
  // Haversine formula to calculate distance between two coordinates
  const [lat1, lon1] = coords1;
  const [lat2, lon2] = coords2;
  const R = 6371; // Radius of the Earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
};
const calculateDistances = async (req, res) => {
  try {
    const libraries = await prisma.library.findMany({
      where: { approved: true },
    });
    // console.log("🚀 ~ calculateDistances ~ libraries:", libraries);
    const cities = await prisma.app.findMany({
      select: {
        locations: {
          select: {
            location: true,
            coords: true,
          },
        },
      },
    });
    // console.log("🚀 ~ calculateDistances ~ cities:", cities);
    var logs = [];
    for (const library of libraries) {
      for (const city of cities) {
        for (const location of city.locations) {
          const distance = calculateDistance(library.coords, location.coords);
          console.log("🚀 ~ calculateDistances ~ distance:", distance);

          // Check if the distance entry already exists
          const existingDistance = await prisma.distance.findFirst({
            where: {
              libraryId: library.id,
              city: location.location,
            },
          });

          if (!existingDistance) {
            const resp = await prisma.distance.create({
              data: {
                libraryId: library.id,
                city: location.location,
                distance: distance ? distance : 0,
              },
            });
            logs.push(resp);
          } else {
            console.log(`Distance entry already exists for libraryId: ${library.id}, city: ${location.location}`);
          }
        }
      }
    }

    res.status(200).json({
      message: "Distances calculated and saved successfully.",
      data: logs,
    });
    console.log("Distances calculated and saved successfully.");
  } catch (error) {
    console.error("Error calculating distances:", error);
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
    const msme = req.files && req.files.msme ? req.files.msme[0].path : null;


    const uploadElectricityBill = req.files && req.files.uploadElectricityBill ? req.files.uploadElectricityBill[0].path : null;
    const uploadLeaseAgreement = req.files && req.files.uploadLeaseAgreement ? req.files.uploadLeaseAgreement[0].path : null;
    // console.log(cardImage, images, gst, cin, tan, msme, ">>>>>uploadedFiles");

    const jsonData = JSON.parse(req.body.jsonData);
    // console.log("🚀 ~ createLibrary ~ jsonData:", jsonData);

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
      coords,
      msmeNumber,
    } = jsonData;

    const libraryData = {
      libraryOwner: {
        connect: { id: parseInt(libraryOwner) }, // Ensure the libraryOwner is connected correctly
      },
      name,
      longDescription,
      shortDescription,
      address,
      coords: coords,
      amenities: {
        create: {
          amenities : amenities
        },
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
      propertyType: propertyType,
      uploadElectricityBill: uploadElectricityBill,
      uploadLeaseAgreement: uploadLeaseAgreement,


    };

    const LibraryData = await prisma.library.create({ data: libraryData });

    // await calculateDistances(LibraryData.id);

    // calculateLowestPrice(LibraryData.id);
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
      where: {
        id: parseInt(libraryId),
      },
      include:{
        rooms: true,
      }
    });

    if (!library) {
      return res.status(404).send({ message: "Library not found" });
    }

    const { seatLayout, timeSlot,  ac, doorPositions } = req.body;
    console.log("🚀 ~ createRoom ~ seatLayout:", seatLayout);

    if (!library) {
      return res.status(404).send({ message: "Library not found" });
    }

    // Determine the new roomNo
    let newRoomNo = 1;
    if (library.rooms && library.rooms.length > 0) {
      const maxRoomNo = library.rooms.length;
      newRoomNo = maxRoomNo + 1;
    }
    // console.log(newRoomNo, "newRoomNo", timeSlot);

    const newRoom = await prisma.room.create({
      data: {
        libraryId: parseInt(libraryId),
        roomNo: newRoomNo,
        doorPosition: doorPositions,
        seats: {
          create: seatLayout.selectedSeats.map((seat) => ({
            seatId: seat.id,
            seatLabel: seat.label,
            seatName : seatLayout.seatNames[seat.id] || seat.seatName,
            rotation: seatLayout.rotationAngles[seat.id] || 0,
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

    // if (location) {
    //   library.location = location;
    // }

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

    const newLibrary = await prisma.library.create({data:{
      name,
      shortDescription,
      cardImage,
      comingSoon: true,
      commingSoonMessage: comingSoonMessage,
      location,
    }});

    // await newLibrary.save();
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

    const library = await prisma.library.findFirst({
      where: {
        id: parseInt(libraryId),
      },
    });

    if (!library) {
      return res.status(404).send({ message: "Library not found" });
    }

    const updateLibrary = await prisma.library.update({
      where: {
        id: parseInt(libraryId),
      },
      data: {
        timeSlot: timeSlot,
        location: location,
      },
    });
    //   libraryId,
    //   {
    //     timeSlot: timeSlot,
    //     location: location,
    //   },
    //   { new: true }
    // );

    // Save the updated library document

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
    // const roomsData = await Library.find().populate("libraryOwner");
    const roomsData = await prisma.library.findMany({
      include:{
        libraryOwner:true
      }
    });
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
    const { city , page = 1, limit = 2  } = req.body;
    console.log(city);
    if (!city) {
      return res
        .status(400)
        .json({ success: false, message: "City is required" });
    }
    const libraries = await prisma.library.findMany({
      where: {
      approved: true,
      address: {
        path: ['city'],
        equals: city,
      },
      },
      include: {
      amenities: true,
      },
      orderBy: {
      name: 'asc',
      },
      skip: (page - 1) * limit,
      take: parseInt(limit),
    });

    const totalLibraries = await prisma.library.count({
      where: {
        approved: true,
        address: {
          path: ['city'],
    equals: city,

        },
      },
    });

    res.status(200).json({
      success: true,
      count: libraries.length,
      totalLibraries,
      totalPages: Math.ceil(totalLibraries / limit),
      currentPage: parseInt(page),
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
  // console.log(id);
  try {
    const room = await prisma.library.findFirst({
      where: {
        id: parseInt(id),
      },
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
        amenities: true,
        libraryOwner: true,

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

const getLibraryRooms = async (req, res) => {
  const { id } = req.body;
  console.log(id);
  try {
    const room = await prisma.library.findFirst({
      where: {
        id: parseInt(id),
      },
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
        libraryOwner: true,
        amenities: true,
      },
    });
    // const room = await Library.findById(id).populate({
    //   path: "rooms",
    //   populate: {
    //     path: "seats",
    //     populate: {
    //       path: "timeSlots",
    //     },
    //   },
    // });
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
  const { id } = req.params;

  try {
    const room = await prisma.library.findFirst({
      where: {
        libraryOwnerId: parseInt(id),
      },
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
        libraryOwner: true,
        amenities: true,
      },
    });

    // .populate("rooms")
    // .populate("libraryOwner");
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
  // console.log(req.body, "reqqq");
  const { id, status } = req.body;
  try {
    const room = await prisma.library.update({
      where: { id: parseInt(id) },
      data: {
        approved: status,
      },
    });
    console.log(room?.approved, "room");
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
    const { userId } = req.body;

    const libraries = await prisma.library.findMany({
      where: { libraryOwnerId: parseInt(userId) },
      include: {
        rooms: true,
      },
    });

    const librariesWithRoomCount = libraries.map((library) => ({
      ...library,
      roomCount: library.rooms.length,
    }));

    console.log(
      "🚀 ~ getAdminLibraries ~ librariesWithRoomCount:",
      librariesWithRoomCount
    );

    res.json({
      message: "Libraries retrieved successfully",
      libraries: librariesWithRoomCount,
      data: libraries,
    });
  } catch (error) {
    console.error("Error retrieving libraries by user _id:", error);
    res.status(500).json({ error: "Cannot retrieve libraries" });
  }
};

async function getAllBookings(req, res) {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        user: true,
        room: {
          include: {
            library: true,
          },
        },
      },
    });
    // .find().populate("userId").exec();
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

    const existingAmenities = await prisma.amenities.findUnique({
      where: { libraryId: parseInt(libraryId) },
    });

    let library;
    if (existingAmenities) {
      // Update the library and its amenities
      library = await prisma.library.update({
        where: { id: parseInt(libraryId) },
        data: {
          name,
          shortDescription,
          longDescription,
          address,
          registrationFees,
          amenities: {
            update: {
              amenities: amenities,
            },
          },
        },
      });
    } else {
      // Update the library and create a new amenities record
      library = await prisma.library.update({
        where: { id: parseInt(libraryId) },
        data: {
          name,
          shortDescription,
          longDescription,
          address,
          registrationFees,
          amenities: {
            create: {
              amenities: amenities,
            },
          },
        },
      });
    }

    if (!library) {
      return res.status(404).json({ message: "Library not found" });
    }

    await calculateLowestPrice(libraryId);
    res.status(200).json({ message: "Room updated successfully" });
  } catch (error) {
    console.error("Error deleting room:", error);
    res.status(500).json({ message: "Error deleting room", error });
  }
};

const updateLibraryImages = async (req, res) => {
  try {
    const libraryId = req.params.id;

    // console.log("---", req.files);

    const cardImage = req.files?.cardImage ? req.files.cardImage[0].path : null;
    const images = req.files?.images
      ? req.files.images.map((file) => file.path)
      : [];
    // const images = req.files?.images
    console.log("🚀 ~ updateLibraryImages ~ images:", images);

    const library = await prisma.library.findFirst({
      where: { id: parseInt(libraryId) },
    });
    if (!library) {
      return res.status(404).json({ message: "Library not found" });
    }

    if (cardImage) {
      library.cardImage = cardImage;
    }

    if (images.length > 0) {
      library.images = images;
    }

    // await library.save();

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

    // Fetch the library with its rooms, seats, and timeslots
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
      return res.status(404).json({ message: "Library not found" });
    }

    const room = library.rooms.find((room) => room.id === parseInt(roomId));

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    // Delete time slots associated with the seats
    await prisma.timeSlot.deleteMany({
      where: { seatId: { in: room.seats.map(seat => seat.id) } },
    });

    // Delete seats associated with the room
    await prisma.seat.deleteMany({
      where: { roomId: parseInt(roomId) },
    });

    // Delete the room
    await prisma.room.delete({
      where: { id: parseInt(roomId) },
    });

    // Update room numbers for the remaining rooms
    const remainingRooms = library.rooms.filter(r => r.id !== parseInt(roomId));
    for (let i = 0; i < remainingRooms.length; i++) {
      await prisma.room.update({
        where: { id: remainingRooms[i].id },
        data: { roomNo: i + 1 },
      });
    }

    // Recalculate the lowest price for the library
    await calculateLowestPrice(libraryId);

    res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    console.error("Error deleting room:", error);
    res.status(500).json({ message: "Error deleting room", error });
  }
};

const deleteDummy = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedLibrary = await prisma.library.delete({
      where: { id: parseInt(id) },
    });

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
    // const dummyLibrary = await Library.find({ comingSoon: true });
    const dummyLibrary = await prisma.library.findFirst({
      where: { comingSoon: true },
    });

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
    const userId = user
    // console.log(req.body, "req.body");

    // Check if the user has already reviewed the library
    const existingReview = await prisma.review.findFirst({
      where: {
        userId: parseInt(userId),
        libraryId: parseInt(libraryId),
      },
    });

    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this library' });
    }




    const newReview = await prisma.review.create({
      data: {

        review: review,
        stars: stars,
        library: {
          connect: {
            id: parseInt(libraryId),
          },
        },
        user: {
          connect: {
            id: parseInt(userId),
          },
        },
      },
    });
    // Fetch all reviews for the library to calculate the average rating
    const reviews = await prisma.review.findMany({
      where: { libraryId: parseInt(libraryId) },
    });

    // Calculate the average rating manually
    const totalStars = reviews.reduce((sum, review) => sum + review.stars, 0);
    const avgRating = reviews.length > 0 ? totalStars / reviews.length : 0;



    console.log("🚀 ~ avgRating:", avgRating);

    await prisma.library.update({
      where: { id: parseInt(libraryId) },
      data: {
        avgRating: avgRating,
        reviews: {
          connect: { id: newReview.id },
        },
      },
    });

    res.status(201).json(newReview);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

// Controller to get reviews for a library
const getReviews = async (req, res) => {
  try {
    const { libraryId } = req.params;
    const library = await prisma.library.findUnique({
      where: {
        id: parseInt(libraryId),
      },
      include: {
        reviews: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });
    console.log("🚀 ~ getReviews ~ library:", library)

    if (!library) {
      return res.status(404).json({ message: "Library not found" });
    }

    res
      .status(200)
      .json({ data: library.reviews, avgRating: library.avgRating });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const editRoomName = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { newName } = req.body;

    if (!newName) {
      return res.status(400).json({ message: "New room name is required" });
    }

    const updatedRoom = await prisma.room.update({
      where: { id: parseInt(roomId) },
      data: { roomName: newName },
    });

    res.status(200).json({
      message: "Room name updated successfully",
      room: updatedRoom,
    });
  } catch (error) {
    console.error("Error updating room name:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

async function updateAmenity(req, res) {
  try {
    const { oldAmenity, newAmenity } = req.body;

    if (!oldAmenity || !newAmenity) {
      return res.status(400).json({
        success: false,
        message: "Both oldAmenity and newAmenity are required",
      });
    }

    const updatedLibraries = await prisma.library.updateMany({
      where: {
        amenities: {
          has: oldAmenity,
        },
      },
      data: {
        amenities: {
          set: {
            // Replace oldAmenity with newAmenity
            amenities: {
              set: [newAmenity],
            },
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      message: `Updated ${updatedLibraries.count} libraries.`,
    });
  } catch (error) {
    console.error("Error updating amenities:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update amenities. Please try again later.",
    });
  }
}
module.exports = {
  editRoomName,
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
  updateAmenity
};
