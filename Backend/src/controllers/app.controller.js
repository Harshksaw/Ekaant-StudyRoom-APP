const { StatusCodes } = require("http-status-codes");

const jwt = require("jsonwebtoken");

const JWT_SECRET = "MY_SECRET_KEY";
const { PrismaClient, Prisma } = require('@prisma/client');

const prisma = new PrismaClient();
const multer = require("multer");
const express = require("express");
const App = require("../models/app.model");
const { getCityCoordinates } = require("../utils/location");
const cloudinary = require("cloudinary").v2;

const ping = (req, res) => {
  res.status(StatusCodes.OK).json({ message: "Ping successful" });
};

async function createApp(req, res) {
  try {
    const images = req.files.map((file) => file.path);
    const { location } = req.body;

    let parsedLocations = location;
    if (typeof location === "string") {
      parsedLocations = JSON.parse(location);
    }

    // console.log(location, "body", images);
    const app = new App({
      Banner: images,
      locations: parsedLocations,
    });

    const appdata = await app.save();

    // console.log(appdata);

    // Add code to handle file uploads using multer and cloudinary

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Room created successfully",

      data: appdata,
    });
  } catch (error) {
    console.error("Error creating room: ", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error creating room",
      error: error.message,
    });
  }
}

async function getApp(req, res) {
  try {
    //6693fe2eb4e16e6d87026d1d
    // const id = req.params.id;

    console.log(req.file, "file");
    const app = await App.find().sort({ createdAt: -1 }).limit(1);

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "App details fetched successfully",
      data: app,
    });
  } catch (error) {
    console.error("Error fetching app details: ", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error fetching app details",
      error: error.message,
    });
  }
}

async function editBanner(req, res) {
  try {
    const images = req.files.map((file) => file.path);
    // console.log("🚀 ~ editBanner ~ images:", images);
    const app = await prisma.app.findByIdAndUpdate({

      data:{
        Banner: images,
      },
      where:{
        _id: "66e255d999bd0963775bde89"
      },
      new: true

    })
    
  
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Banner edited successfully",
      data: app,
    });
  } catch (error) {
    // console.error("Error editing banner: ", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error editing banner",
      error: error.message,
    });
  }
}

async function getCityCoord(req, res) {
  try {
    const { city } = req.body;

    const response = await getCityCoordinates(city);

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Locations coords fetched successfully",
      data: response,
    });
  } catch (error) {
    console.error("Error editing locations: ", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error editing locations",
      error: error.message,
    });
  }
}
async function editLocations(req, res) {
  try {
    const { location } = req.body;
    const locationImage = req.file.path;

    // console.log("🚀 ~ editLocations ~ locations:", location)
    const coord = await getCityCoordinates(location);
    // console.log("🚀 ~ editLocations ~ coord:", coord)

    const locationObj = {
      location,
      locationImage,

      coords: [Number(coord.lat), Number(coord.lng)],
    };
    console.log("🚀 ~ editLocations ~ locationObj:", locationObj);

    const updatedLocations = await prisma.  App.findByIdAndUpdate(
      "66e255d999bd0963775bde89",
      { $push: { locations: locationObj } },
      { new: true }
    );

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Locations edited successfully",
      data: updatedLocations,
    });
  } catch (error) {
    console.error("Error editing locations: ", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error editing locations",
      error: error.message,
    });
  }
}

async function getLocations(req, res) {
  try {
    const app = await App.findById({ _id: "66e255d999bd0963775bde89" });
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "App details fetched successfully",
      data: app.locations,
    });
  } catch (error) {
    console.error("Error fetching app details: ", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error fetching app details",
      error: error.message,
    });
  }
}

async function deleteLocations(req, res) {
  try {
    const { locationId } = req.params;
    console.log("🚀 ~ deleteLocations ~ locationId:", locationId);

    const updatedLocations = await App.findByIdAndUpdate(
      "66e255d999bd0963775bde89",
      { $pull: { locations: { _id: locationId } } },
      { new: true }
    );

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Locations deleted successfully",
      data: updatedLocations,
    });
  } catch (error) {
    console.error("Error deleting locations: ", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error deleting locations",
      error: error.message,
    });
  }
}

module.exports = {
  ping,
  createApp,
  getApp,
  editBanner,
  editLocations,
  getCityCoord,
  getLocations,
  deleteLocations,
};
