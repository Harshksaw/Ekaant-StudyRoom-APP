const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  //   PORT: process.env.PORT ,
  PORT: 3000,
  //   DB_URL: process.env.DATABASE_URI,
  DB_URL:
    "mongodb+srv://indianshahishere:OTzra2mFL0l1Ry3S@studyroom.e604xri.mongodb.net/?retryWrites=true&w=majority&appName=studyroom",
  // LOG_DB_URL: process.env.LOG_DB_URL,
  NODE_ENV: process.env.NODE_ENV || "development",
};
