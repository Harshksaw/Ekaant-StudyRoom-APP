const { StatusCodes } = require("http-status-codes");
const { bcrypt } = require("bcrypt");
const zod = require("zod");
const { User } = require("../models");
const { crypto } = require("crypto");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin.model");
const JWT_SECRET = "MY_SECRET_KEY";
const fs = require("fs");
// const mailSender = require("../utils/mailSender");
const ping = (req, res) => {
  res.status(StatusCodes.OK).json({ message: "Ping successful" });
};
// singup
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

    // Convert files to base64
    //  console.log("req.files is ", req.files);
    //  if (!req.files || !req.files.aadhar) {
    //   return res.status(StatusCodes.BAD_REQUEST).json({
    //     success: false,
    //     message: "No aadhar file uploaded",
    //   });
    // }
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const imageData = req.file;
    //  const aadharImage =  fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.aadhar))
    //  const panImage = fs.readFileSync(req.files.pan[0].path).toString('base64');

    console.log("aadharImage is ", imageData);
    // TODO: Add validation
    // return res.status(StatusCodes.OK).json({ message: "Ping successful" });

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
// change password--
// async function ChangeAdminPassword(req, res, next) {
//   try {
//     const { oldPassword, newPassword, confirmPassword } = req.body;
//     const admin = await Admin.findById(req.admin.admin_id); //can be a problem
//     //validation of oldPass
//     if (!admin.validatePassword(oldPassword)) {
//       return res.status(StatusCodes.BAD_REQUEST).json({
//         success: false,
//         message: "Old password is incorrect",
//         error: {},
//       });
//     }
//     //validation of newPass
//     if (newPassword !== confirmPassword) {
//       return res.status(StatusCodes.BAD_REQUEST).json({
//         success: false,
//         message: "Password does not match",
//         error: {},
//       });
//     }
//     const hashedPassword = await admin.createHash(newPassword);
//     const updatedAdminDetails = await Admin.findOneAndUpdate(
//       { admin_id: req.admin.admin_id },
//       { password: hashedPassword },
//       { new: true }
//     );

//     //send mail - Password updated
//     try {
//       const emailResponse = await mailSender(
//         updatedUserDetails.email,
//         `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`,
//         passwordUpdated(
//           updatedUserDetails.email,
//           `${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
//         )
//       );
//       console.log("Email sent successfully:", emailResponse.response);
//     } catch (error) {
//       // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
//       console.error("Error occurred while sending email:", error);
//       return res.status(500).json({
//         success: false,
//         message: "Error occurred while sending email",
//         error: error.message,
//       });
//     }
//     return res
//       .status(200)
//       .json({ success: true, message: "Password updated successfully" });
//   } catch (error) {
//     console.log("error is ", error);
//   }
// }
// reset password--
//
async function ResetAdminPassword(req, res, next) {
  const { email, password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Password does not match",
      error: {},
    });
  }
  const admin = await Admin.findOne({ email });

  if (admin) {
    const hashedPassword = await admin.createHash(password);
    admin.password = hashedPassword;
    await admin.save();
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Password updated successfully",
      error: {},
    });
  } else {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Email not found",
      error: {},
    });
  }
}
module.exports = {
  pingAdminController: ping,
  RegisterAdmin,
  LoginAdmin,
  ResetAdminPassword,
  // ChangeAdminPassword,
};

// ienipepec11@
// Gourish.,1

// AdminHarsh

// AdminHarsh@gmail.com
// Harsh@13
