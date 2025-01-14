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
   


    const app = await prisma.app.findFirst({
      include: {
      locations: {
        orderBy: {
        location: 'asc', // Sort locations alphabetically by name
        },
      },
      },
    });
    // if (app && app.locations) {
    //   app.locations.sort((a, b) => a.name.localeCompare(b.name));
    // }

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

 
  
    const app = await prisma.app.findFirst();
    const updatedLocations = await prisma.location.create({
      data: {
      ...locationObj,
      app: {
        connect: { id: app.id },
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
    const deletedLocation = await prisma.location.delete({
      where: { id: parseInt(locationId) },
    });
      res.status(200).json({ message: "Location deleted successfully" })

  } catch (error) {
    console.error("Error deleting locations: ", error);
    res.status(500).json({ message: "Error deleting locations", error });
  }
};


  async function createBackup(req, res) {
    try {
      const backupDir = '/backup';
      const containerName = 'postgres:latest';
      const databaseName = 'postgres'; // Or use pg_dumpall -c for all databases
      

        // Create the backup directory if it doesn't exist
        fs.mkdirSync(backupDir, { recursive: true }); 
      
        const timestamp = new Date().toISOString().replace(/[-:.]/g, ''); // Format timestamp
        const backupFilename = `backup_db_${timestamp}.dump`;
        const backupFilePath = `${backupDir}/${backupFilename}`;
      
        // Construct the pg_dump command
        const command = `docker exec -it ${containerName} pg_dump -U postgres -Fc ${databaseName} > ${backupFilePath}`;
      
        // Execute the command
        exec(command, (error, stdout, stderr) => {
          if (error) {
            console.error(`Error creating backup: ${error}`);
            return res.status(500).json({ error: 'Backup failed' });
          }
      
          console.log(`Backup created successfully: ${backupFilePath}`);
          res.json({ message: 'Backup created', filename: backupFilename });
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
