const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dzwvmqbv0",
  api_key: 572782272174972,
  api_secret: "Sx6t5hAG6ynwO6mr8GN-L55A7MI",
});

// Configure Multer storage using Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "library-images",
    resource_type: "auto",
  },
});

export const upload = multer({ storage: storage });
