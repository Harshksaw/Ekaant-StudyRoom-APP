const mongoose = require("mongoose");
const {  NODE_ENV } = require("./server.config");


async function connectToDB() {
  const DB_URL = process.env.DATABASE_URI;
  try {



    await mongoose.connect(String(DB_URL))
    console.log(`Successfully connected to the database in ${NODE_ENV} mode`);
  } catch (error) {
    console.error("Unable to connect to the DB server ---->");
    console.error(error);
    process.exit(1); // Exit the process with failure
  }}

module.exports = connectToDB;
