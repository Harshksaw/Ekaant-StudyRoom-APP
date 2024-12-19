const { PrismaClient } = require('@prisma/client');
const { NODE_ENV } = require("./server.config");
const dotenv = require("dotenv"); 
dotenv.config();
const prisma = new PrismaClient();
async function connectToDB() {

  try {


    await prisma.$connect();
    console.log(`Successfully connected to the database in ${NODE_ENV} mode`);
  } catch (error) {
    console.error("Unable to connect to the DB server ---->");
    console.error(error);
    process.exit(1); // Exit the process with failure
  }}

module.exports = connectToDB;
