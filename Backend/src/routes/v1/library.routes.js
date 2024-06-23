const express = require('express');

const { LibraryController  } = require('../../controllers');
const Library = express.Router();


const uploader = require('../../config/multer');

Library.get('/ping', LibraryController.pingAdmin);
Library.post('/createLibrary',uploader.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'images', maxCount: 10 }]), LibraryController.createRoom);




module.exports = Library;