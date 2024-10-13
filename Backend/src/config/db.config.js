const mongoose = require("mongoose");
const { DB_URL, NODE_ENV } = require("./server.config");


async function connectToDB() {
  try {
    if (!DB_URL) {
      throw new Error("DB_URL is not defined. Please check your configuration.");
    }



    await mongoose.connect(DB_URL);
    console.log(`Successfully connected to the database in ${NODE_ENV} mode`);
  } catch (error) {
    console.error("Unable to connect to the DB server ---->");
    console.error(error);
    process.exit(1); // Exit the process with failure
  }}

module.exports = connectToDB;
