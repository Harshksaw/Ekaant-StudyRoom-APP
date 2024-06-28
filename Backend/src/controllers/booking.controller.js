const { StatusCodes } = require("http-status-codes");

const zod = require("zod");
const { User } = require("../models");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "MY_SECRET_KEY";

function pingBookingController(req, res) {
    // logger.error("ping error logs for ping controller");


    return res.json({ message: "Booking controller is up"});
  }



  module.exports = {

    
    pingBookingController,
  }