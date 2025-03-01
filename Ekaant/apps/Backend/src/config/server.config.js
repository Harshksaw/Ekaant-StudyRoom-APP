
const dotenv = require("dotenv");
dotenv.config();
module.exports = {

  PORT: 3009,


  NODE_ENV: process.env.NODE_ENV || "development",
};
