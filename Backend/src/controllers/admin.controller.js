const { StatusCodes } = require("http-status-codes");
const { bcrypt } = require("bcrypt");
const zod = require("zod");
const { User } = require("../models");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin.model");
const JWT_SECRET = "MY_SECRET_KEY";
const fs = require("fs");
const { Image } = require("../models/file.model");
const crypto = require('crypto');
const path = require('path');
const File = require("../models/file.model");

const ping = (req, res) => {
  res.status(StatusCodes.OK).json({ message: "Ping successful" });
};
// singup
// Function to encrypt file data
// Function to encrypt data using AES-256
function encryptData(data) {
  const algorithm = 'aes-256-cbc'; // AES 256 CBC mode
  const secretKey = Buffer.from(JWT_SECRET); // Using JWT_SECRET as the key
  const iv = crypto.randomBytes(16); // IV should be 128 bits (16 bytes)

  // Ensure the secret key is 32 bytes long (256 bits)
  const key = crypto.createHash('sha256').update(String(secretKey)).digest('base64').substr(0, 32);

  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return { encryptedData: encrypted, key: key, iv: iv.toString('hex') };
}
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
      username,
    } = req.body;

    // console.log(
    //   phoneNumber,
    //   email,
    //   password,
    //   fullName,
    //   Dob,
    //   AddharNumber,
    //   PanNumber,
    //   Address
    // );

    // const exist = await Admin.findOne({ email });
    // if (exist) {
    //   return res.status(StatusCodes.BAD_REQUEST).json({
    //     success: false,
    //     message: "User already exists",
    //     error: { 411: "User already exists" },
    //     data: {},
    //   });
    // }
  
    const { pancard, aadhar } = req.files;
    if (pancard) {
      console.log(pancard[0]); // Access the first (and only) pancard file

    }

    // Access aadhar file
    if (aadhar) {
      console.log(aadhar[0]); // Access the first (and only) aadhar file

    }

 


    const pancardFile = new File({
      filename: pancard[0].originalname,
      path: pancard[0].path,
    });

    const aadharFile = new File({
      filename: aadhar[0].originalname,
      path: aadhar[0].path,
    });

    const pancardPath = await pancardFile.save();
    const addharCardPath = await aadharFile.save();


    console.log("pancardPath is ", pancardPath._id);
    console.log("addharCardPath is ", addharCardPath._id);  



    const newAdmin = await Admin.create({
      phoneNumber,
      username,
      email,
      password,
      fullName,
      Dob,
      AddharNumber,
      PanNumber,
      address: Address,
      adhaarCardDetails: {
        adhaarNumber: AddharNumber,
        adhaarCardFile: addharCardPath._id, 
      },
      panCardDetails: {
        panNumber: PanNumber,
        panCardFile: pancardPath._id,
      },
    });

    const hashedPassword = await newAdmin.createHash(password);
    console.log("hashedpassword is ", hashedPassword);
    newAdmin.password = hashedPassword;
    // saving the user--
    await newAdmin.save();

    const admin_id = newAdmin._id;

    // generating the token--
    const token = jwt.sign({ admin_id }, JWT_SECRET);
    
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "User authenticated successfully",
      error: {},
      data: newAdmin,
      token: token,
    });

  } catch (error) {
    console.log("error is ", error);
    next(error);
  }
}
// login--
async function LoginAdmin(req, res, next) {
  const { email, password } = req.body;
  console.log("email and password is ", email, password);
  // console.log(email, password);
  try {
    const admin = await Admin.findOne({ email });
    console.log(admin);
    if (admin) {
      if (await admin.validatePassword(password)) {
        const token = jwt.sign({ admin_id: admin._id }, JWT_SECRET);
        return res.status(StatusCodes.OK).json({
          success: true,
          message: "User authenticated successfully",
          error: {},
          data: { admin, admin_id: admin._id },
          token: token,
        });
      } else {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          success: false,
          message: "Invalid password",
          error: {},
        });
      }
    } else {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "email not found",
        error: {},
      });
    }
  } catch (error) {
    console.log("error is ", error);
  }
}

module.exports = {
  pingAdminController: ping,
  RegisterAdmin,
  LoginAdmin,
};

// ienipepec11@
// Gourish.,1

// AdminHarsh

// AdminHarsh@gmail.com
// Harsh123
