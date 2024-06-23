
const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: 'aaa',
  api_key: 'bbb',
  api_secret: 'ccc'
});

module.exports = cloudinary;