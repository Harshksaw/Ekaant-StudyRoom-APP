

const cloudinary = require("cloudinary").v2;

const path = require("path");
const dotenv = require('dotenv');

dotenv.config();

cloudinary.config({
	CLOUD_NAME: process.env.CLOUD_NAME,
	API_KEY: process.env.API_KEY,
	API_SECRET: process.env.API_SECRET,
});

module.exports = cloudinary;