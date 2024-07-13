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
// singup
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

    const aadharPath = req.files["aadhar"];
    const panPath = req.files["pan"];

    console.log(aadharPath, panPath);

    //

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
        adhaarImage: aadharPath,
      },
      panCardDetails: {
        panNumber: PanNumber,
        panImage: panPath,
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
