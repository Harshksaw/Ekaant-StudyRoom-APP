const { StatusCodes } = require("http-status-codes");
const { bcrypt } = require("bcrypt");
const zod = require("zod");
const { User } = require("../models");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin.model");
const JWT_SECRET = "MY_SECRET_KEY";

const ping = (req, res) => {
  res.status(StatusCodes.OK).json({ message: "Ping successful" });
};

async function RegisterAdmin(req, res, next) {
  try {
    const {
      phoneNumber,
      email,
      password,
      fullName,
      Dob,
      AddharNumber,
      PanNumber,
      Address,
      username
    } = req.body;

    console.log(
      phoneNumber,
      email,
      password,
      fullName,
      Dob,
      AddharNumber,
      PanNumber,
      Address
    );

    const aadharPath = req.files["aadhar"] ;
    const panPath = req.files["pan"] ? req.files["pan"][0].path : null;

    const admin = await Admin.create({
      phoneNumber,
      username,
      email,
      password,
      fullName,
      Dob,
      AddharNumber,
      PanNumber,
      address: Address, // Assuming Address is an object that matches the expected structure
      adhaarCardDetails: {
        adhaarNumber: AddharNumber, // Ensure correct spelling as per your schema (adhaarNumber)
        adhaarImage: aadharPath,
      },
      panCardDetails: {
        panNumber: PanNumber,
        panImage: panPath,
      },
    });

    const response = await admin.save();
    console.log(response);

    return res.status(StatusCodes.OK).json({
        success: true,
        message: "User authenticated successfully",
        error: {},
      });

    // const user = await User.create({ email, password });
    // const accessToken = jwt.sign(
    //     { userId: user.id, email: user.email },
    //     JWT_SECRET
    // );
    // res.status(StatusCodes.CREATED).json({ accessToken });
  } catch (error) {
    next(error)
  }
}

module.exports = {
  pingAdminController: ping,
  RegisterAdmin,
};
