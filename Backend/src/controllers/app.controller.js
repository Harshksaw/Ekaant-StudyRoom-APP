const { StatusCodes } = require("http-status-codes");

const jwt = require("jsonwebtoken");

const JWT_SECRET = "MY_SECRET_KEY";
const { PrismaClient, Prisma } = require("@prisma/client");

const prisma = new PrismaClient();
const multer = require("multer");
const express = require("express");
const App = require("../models/app.model");
const { getCityCoordinates } = require("../utils/location");
const cloudinary = require("cloudinary").v2;
const { exec } = require('child_process');
const ping = (req, res) => {
  res.status(StatusCodes.OK).json({ message: "Ping successful" });
};

async function createApp(req, res) {
  try {
    const images = req.files.map((file) => file.path);
    // const { location } = req.body;

    // let parsedLocations = location;
    // if (typeof location === "string") {
    //   parsedLocations = JSON.parse(location);
    // }

    // for(let i = 0 ; i < parsedLocations.length; i++){

    // }
    // await getCityCoordinates(city);

    // console.log(location, "body", images);
    const app = await prisma.app.create({
      data: {
        Banner: images,
      },
    });

    // const appdata = await app.save();

    // console.log(appdata);

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Room created successfully",

      data: app,
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
   


    const app = await prisma.app.findFirst({ where: { id: 1 }, include:{
      locations: true
    } });

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
    const app = await prisma.app.update({
      where: {
        id: 1,
      },

      data: {
        Banner: images,
      },
    });

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
    const city = req.params.id;

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


    const coord = await getCityCoordinates(location);
    // console.log("🚀 ~ editLocations ~ coord:", coord)

    const locationObj = {
      location,
      locationImage,

      coords: [Number(coord.lat), Number(coord.lng)],
    };
    console.log("🚀 ~ editLocations ~ locationObj:", locationObj);

 
  
    const updatedLocations = await prisma.location.create({
      data: {
        ...locationObj,
        app: {
          connect: { id: 1 },
        },
      },
    });


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
    const app = await prisma.app.findFirst({
      where: { id: 1 },
      include: {
        locations: true,
      },
    });
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

const deleteLocations = async (req, res) => {
  const { locationId } = req.params;
  console.log("🚀 ~ deleteLocations ~ locationId:", locationId);

  try {
    // First, delete or update all related records that reference this location
    await prisma.location.updateMany({
      where: {
        id: parseInt(locationId), // Ensure locationId is correctly parsed
      },
      data: {
        appId: null, // Set appId to null
      },
    });

    // Now delete the location itself
    await prisma.location.delete({
      where: {
        id: parseInt(locationId), // Ensure locationId is correctly parsed
        id: parseInt(locationId), // Ensure locationId is correctly parsed
      },
    });
      res.status(200).json({ message: "Location deleted successfully" })

  } catch (error) {
    console.error("Error deleting locations: ", error);
    res.status(500).json({ message: "Error deleting locations", error });
  }
};


  async function createBackup(req, res) {
    try {
      const containerId = 'ekaant-studyroom-app-db-1'; // Use your container name
      const backupFile = `/tmp/backup_${Date.now()}.dump`;
      const command = `docker exec -t ${containerId} pg_dump -U my_user -d my_database -F c -b -v -f ${backupFile}`;

      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error creating backup: ${error.message}`);
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error creating backup', error: error.message });
        }
        if (stderr) {
          console.error(`Backup stderr: ${stderr}`);
        }
        console.log(`Backup stdout: ${stdout}`);

        // Optionally, copy the backup file to the host
        const hostBackupPath = `/path/to/host/backup/backup_${Date.now()}.dump`;
        const copyCommand = `docker cp ${containerId}:${backupFile} ${hostBackupPath}`;

        exec(copyCommand, (copyError, copyStdout, copyStderr) => {
          if (copyError) {
            console.error(`Error copying backup to host: ${copyError.message}`);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error copying backup to host', error: copyError.message });
          }
          if (copyStderr) {
            console.error(`Copy stderr: ${copyStderr}`);
          }
          console.log(`Copy stdout: ${copyStdout}`);

          return res.status(200).json({ message: 'Backup created successfully', backupPath: hostBackupPath });
        });
      });
    } catch (error) {
      console.error(`Error in createBackup: ${error.message}`);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error creating backup', error: error.message });
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
  createBackup,
};
