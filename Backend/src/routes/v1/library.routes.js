const express = require('express');

const { LibraryController  } = require('../../controllers');
const Library = express.Router();

const cloudinary = require('../../config/cloudinary');
const uploader = require('../../config/multer');

Library.get('/ping', LibraryController.pingAdmin);
Library.post('/createLibrary',uploader.single("thumbnail"), LibraryController.createRoom);




module.exports = Library;