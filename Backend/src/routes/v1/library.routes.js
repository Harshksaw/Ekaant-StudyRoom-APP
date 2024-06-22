const express = require('express');

const { LibraryController  } = require('../../controllers');
const Library = express.Router();
const uploadMiddleware = require("../../middleware/Upload");
const upload = uploadMiddleware("RoomImage");

Library.get('/ping', LibraryController.pingAdmin);
Library.post('/createLibrary', LibraryController.createRoom);




module.exports = Library;