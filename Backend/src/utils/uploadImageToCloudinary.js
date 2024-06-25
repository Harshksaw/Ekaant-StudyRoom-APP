const cloudinary = require("../config/cloudinary");

async function uploadImageToCloudinary(imagePath) {
  try {
    const result = await cloudinary.uploader.upload(imagePath, {
      folder: "library-images", // Optional: Customize Cloudinary upload folder
      resource_type: "auto", // Automatically detect image format
      // ... other upload options (e.g., transformations, tags)
    });

    return result; // Return Cloudinary upload result
  } catch (error) {
    throw new Error(`Error uploading image to Cloudinary: ${error}`); // Re-throw informative error
  }
}

module.exports = uploadImageToCloudinary;
