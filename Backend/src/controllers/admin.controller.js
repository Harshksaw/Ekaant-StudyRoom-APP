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
    // const {
    //   phoneNumber,
    //   email,
    //   password,
    //   fullName,
    //   Dob,
    //   AddharNumber,
    //   PanNumber,
    //   Address,
    //   username,
    // } = req.body;

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

    const pancardFile = req.files['pancard'][0];
    // const aadharFile = req.files['aadhar'][0];

    // Read file contents
    const pancardData = fs.readFileSync(pancardFile.path, { encoding: 'utf8' });


// Now use `encryptedString` as the value for `encryptedContent`
// when saving your file, ensuring it matches the expected string type
    // const encryptedAadhar = encryptData(aadharData);

    // const aadharCardFile = await File.create({
    //   fileName: AddharNumber,
    //   filePath: aadharFile.path,
    //   encryptedContent: encryptedAadhar,
    // });
    const panCardFile = await File.create({
      fileName: '22233232',
      // filePath: pancardFile.path,
      encryptedContent: encryptedString,
    });
    panCardFile.save();
    res.status(StatusCodes.OK).json({ message: "File uploaded successfully" });

    const admin = await Admin.create({
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
        // adhaarCardFile: aadharCardFile._id,
      },
      panCardDetails: {
        panNumber: PanNumber,
        panCardFile: panCardFile._id,
      },
    });
    console.log(password);
    //  hashing the password
    const hashedPassword = await admin.createHash(password);
    console.log("hashedPassword is ", hashedPassword);
    admin.password = hashedPassword;
    console.log("hashed password is ", admin.password);
    // saving the admin
    const response = await admin.save();
    console.log(response);
    // jwt --
    const admin_id = admin._id;
    const token = jwt.sign({ admin_id }, JWT_SECRET);
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "User authenticated successfully",
      error: {},
      data: admin,
      token: token,
    });

    // const user = await User.create({ email, password });
    // const accessToken = jwt.sign(
    //     { userId: user.id, email: user.email },
    //     JWT_SECRET
    // );
    // res.status(StatusCodes.CREATED).json({ accessToken });
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
