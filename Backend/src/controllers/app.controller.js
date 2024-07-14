

const { StatusCodes } = require("http-status-codes");


const jwt = require("jsonwebtoken");

const JWT_SECRET = "MY_SECRET_KEY";

const multer = require("multer");
const express = require("express");
const App = require("../models/app.model");
const cloudinary = require("cloudinary").v2;



const ping = (req, res) => {
    res.status(StatusCodes.OK).json({ message: "Ping successful" });
  };

  async function createApp(req, res) {
    try {

      const images = req.files.map((file) => file.path);
      const {
        location,
      } = req.body;

      console.log(location, "body", images);

      const app = new App({
        Banner:images,
        locations : location,

      });

      const appdata = await app.save();

      console.log(appdata);








      // Add code to handle file uploads using multer and cloudinary

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

      //6693fe2eb4e16e6d87026d1d
      // const id = req.params.id;


      const app = await App.findById({ _id : "6693fe2eb4e16e6d87026d1d" });



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
      const id = req.params.id;
      const body = req.body;
      console.log(id, body);

      // Add code to edit banner by id

      return res.status(StatusCodes.OK).json({
        success: true,
        message: "Banner edited successfully",
        data: updatedBanner,
      });
    } catch (error) {
      console.error("Error editing banner: ", error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Error editing banner",
        error: error.message,
      });
    }
  }

  async function editLocations(req, res) {
    try {
      const id = req.params.id;
      const body = req.body;
      console.log(id, body);

      // Add code to edit locations by id

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






module.exports = {
     ping,
    createApp,
    getApp,
    editBanner,
    editLocations,


  };

