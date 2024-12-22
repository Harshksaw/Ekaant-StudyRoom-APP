const { StatusCodes } = require("http-status-codes");
const axios = require("axios");

const bcrypt = require('bcrypt');
const zod = require("zod");
const { User, Admin } = require("../models");
const jwt = require("jsonwebtoken");
const OTP = require("../models/OTP");
const JWT_SECRET = "MY_SECRET_KEY";
const otpGenerator = require("otp-generator");
const phoneotp = require("../models/phoneotp");
const apiKey = process.env.FASTSMS;
const { PrismaClient, Prisma } = require('@prisma/client');

const prisma = new PrismaClient();
const cloudinary = require("cloudinary").v2;
// signing up schema
const signupSchema = zod.object({
  username: zod.string().min(3).max(255),
  email: zod.string().email(),
  password: zod.string().min(8),
  phoneNumber: zod.number().min(9),
  // accountType: zod.string().min(3).max(255),
});
let pingCounter = 0;
require('dotenv').config();
let otpTest = 0;
let emailOtpTest;

function pingAuthController(req, res) {
  // logger.error("ping error logs for ping controller");
  pingCounter++;
  return res.json({ message: "Auth controller is up", pingCount: pingCounter });
}

async function getUser(req, res, next) {
  try {
    const access_token = req.headers["access-token"];
    if (!access_token) {
      return next(
        new ErrorHandler("Please login to access this resource", 400)
      );
    }

    const user = await getUserById(req.user.id);

    if (!user) return res.status(404).send({ message: "User not found" });

    res.send({ user });

    if (!user) {
      return res.send("Please login to access this resource", 400);
    }
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
}

cloudinary.config({
  cloud_name: "dbnnlqq5v",
  api_key: 283514623947746,
  api_secret: "E2s6axKWvXTiJi5_DGiFuPe7Lxo",
});

// signup function--
async function signUp(req, res) {
  try {
    let images;

    if (req.file && req.file.path) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'profileimages'
      });
      images = result.secure_url;
    } else {
      // Use a default DiceBear image if no image is provided
      images = `https://avatars.dicebear.com/api/initials/${req.body.username}.svg`;
    }
    const existingUser = await prisma.user.findUnique({
      where: { email: req.body.email },
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists',
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = await prisma.user.create({
      data: {  
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword, 
        phoneNumber: req.body.phoneNumber,
        accountType: req.body.accountType,
        image: images,
      },
    });

    // Hashing the password




    // Saving the user
    // await newUser.save();

    // Getting the user_id
    const user_id = newUser.id;
    console.log("🚀 ~ signUp ~ user_id:", user_id)

    // Generating the token
    const token = jwt.sign({ user_id }, JWT_SECRET);

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "User created successfully",
      error: {},
      data: newUser,
      token: token,
    });
  } catch (error) {
    console.log("error is ", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "An error occurred during sign up",
      error: error.message,
      data: {},
    });
  }
}
// signin schema
const signinSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(8),
});
async function signIn(req, res, next) {

  try {
    const { phoneNumber, password } = req.body;

    // console.log(phoneNumber, password);

    const user = await prisma.user.findOne ({ phoneNumber });
    const inputPassword = req.body.password;
    const storedHashedPassword = user.password;
    // Find user with requested email
    if (user) {
      // Compare the input password with the stored hashed password
      bcrypt.compare(inputPassword, storedHashedPassword, function(err, result) {
        if (err) {
          console.error('Error comparing passwords:', err);
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Internal server error');
        }
    
        if (result) {
          // Passwords match
          const token = jwt.sign({ user_id: user.id }, JWT_SECRET);
          return res.status(StatusCodes.OK).json({
            success: true,
            message: "User authenticated successfully",
            error: {},
            data: { user, user_id: user.id },
            token: token,
          });
        } else {
          // Passwords do not match
          return res.status(StatusCodes.UNAUTHORIZED).send('Invalid credentials');
        }
      });
    } else {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "Invalid credentials",
        error: { 411: "Invalid credentials" },
        data: {},
      });
    }
  } catch (error) {
    next(error);
  }
}

// Example usage (assuming a web framework like Express)
async function sendOtp(req, res) {
  const { phoneNumber } = req.body;
  const apiKey = process.env.FASTSMS;
  var otp = otpGenerator.generate(4, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });



  if (!phoneNumber) {
    return res.status(400).json({
      success: false,
      message: "Phone number is required",
    });
  }
  
  if (!apiKey) {
    console.log("API key for Fast2SMS is not set");
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "API key for Fast2SMS is not set",
      error: {},
      data: {},
    });
  }




  let url = `https://www.fast2sms.com/dev/bulkV2?authorization=${apiKey}&route=dlt&sender_id=EKAANT&message=171779&variables_values=${otp}&flash=0&numbers=${phoneNumber}`;

  if(req.body.Admin){
    url = `https://www.fast2sms.com/dev/bulkV2?authorization=${apiKey}&route=dlt&sender_id=EKAANT&message=171780&variables_values=${otp}&flash=0&numbers=${phoneNumber}` 
  }
  const response = await axios.get(url);
  const otpPayload = { phoneNumber : String( phoneNumber), phoneOtp: otp };
  const otpBody = await prisma.phoneOtp.create({ data: otpPayload });
  // create(otpPayload);


  if (response.status == 200) {
    return res.status(200).json({
      success: true,
      message: `OTP sent to ${phoneNumber}`,
      data: otpBody,
    });
  } else {
    return res.status(response.status).json({
      success: false,
      message: "Failed to send OTP",
    });
  }
}

async function verifyOtp(req, res) {
  const { phoneNumber, otp } = req.body;

  const response = await prisma.phoneOtp.findMany({
    where: { phoneNumber: String(phoneNumber) },
    orderBy: { createdAt: 'desc' },
    take: 1
  });
  // console.log("🚀 ~ verifyOtp ~ response:", response)



  if (response[0].phoneOtp === '') {

    return res.status(400).json({
      success: false,
      message: "The OTP is not valid",
    });
  } else if (otp != response[0].phoneOtp) {
    // Invalid OTP
    return res.status(400).json({
      success: false,
      message: "The OTP you entered is wrong !!",
    });
  }

  return res.status(200).json({ message: "OTP verified successfully" });
}

async function sendEmailOtp(req, res) {
  const { email } = req.body;
  const existingAdmin = await prisma.admin.findFirst({ where: { 
    email:email
  } } ) 
  if (existingAdmin) {
    const token = jwt.sign({ admin_id: existingAdmin.id }, JWT_SECRET);
    return res.status(201).json({
      success: true,
      message: 'Admin already registered',
      data: existingAdmin,
      token,
    });
  }

  //check if user already present..
  const checkUserPresent = await prisma.user.findFirst({ where: { 
    email:email
  } });
  //if user is already present
  if (checkUserPresent) {
    return res.status(401).json({
      success: false,
      message: "User Already Exists",
    });
  }


  var otp = otpGenerator.generate(4, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });
  // console.log("OTP GENERATED => ", otp);

  const otpPayload = { email : email, emailOtp: otp };

  const otpBody = await prisma.otp.create({  data : otpPayload},


  );
  // console.log("otpBODY -> ", otpBody);

  return res.status(200).json({
    success: true,
    message: "OTP Sended SUCCESSFULLY !!",
    data: otpBody,
  });
}

async function verifyEmailOtp(req, res) {
  const { email, otp } = req.body;
  const response = await prisma.otp.findMany({
    where: {
      email: email
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: 1
  });
  console.log("🚀 ~ verifyEmailOtp ~ response:", response)

  if (response[0].emailOtp === '') {

    return res.status(400).json({
      success: false,
      message: "The OTP is not valid",
    });
  } else if (otp != response[0].emailOtp) {
    console.log("🚀 ~ verifyEmailOtp ~ response.emailOtp:", response.emailOtp)
    console.log("🚀 ~ verifyEmailOtp ~ otp:", otp)
    // Invalid OTP
    return res.status(400).json({
      success: false,
      message: "The OTP you entered is wrong !!",
    });
  }

  return res.status(200).json({ message: "OTP verified successfully" });
}

const forgetPasswordSchema = zod.object({
  userId: zod.string().min(3).max(255),
  password: zod.string().min(8),
  resetPassword: zod.string().min(8),
});


async function forgetPassword(req, res, next) {
  try {
    const { userId, password, resetPassword } = req.body;

    // Find the user by ID
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (user) {
      // Validate the old password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          message: "Invalid password",
          error: { 411: "Invalid password" },
          data: {},
        });
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(resetPassword, 10);

      // Update the user's password
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { password: hashedPassword },
      });

      // Generate a new token
      const token = jwt.sign({ userId: updatedUser.id }, JWT_SECRET);

      return res.status(StatusCodes.OK).json({
        success: true,
        message: "Password reset successfully",
        error: {},
        data: updatedUser,
        token: token,
      });
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "User not found",
        error: { 411: "User not found" },
        data: {},
      });
    }
  } catch (e) {
    console.error("Error during password reset:", e);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "An error occurred during password reset",
      error: e.message,
      data: {},
    });
  }
}
async function changeProfilePic(req, res) {
  const userId = req.body.userId;
  // console.log("userId id ", userId);
  const user = await prisma.user.findOne({ _id: userId });
  try {
    if (user) {
      const image = req.file.path;
      user.image = image;
      // console.log(user.image, "user image is ");
      // console.log(image, "image is ");


      return res.status(StatusCodes.OK).json({
        message: "Profile picture updated successfully",
      });
    }
    // } else {
    //   res.status(400).send("No profile picture uploaded.");
    // }
  } catch (error) {
    console.log("error is  at profilepictore uplaoder", error);
  }
}
async function addFriend(req, res) {
  try {
    const { userId } = req.params;
    const friendDetails = req.body; // Assuming friendDetails contains name, email, etc.

    // Find the user by ID
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
      include: { friends: true },
    });

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).send("User not found");
    }

    // Add the new friend to the user's friends list
    const newFriend = await prisma.friend.create({
      data: {
        name: friendDetails.name,
        email: friendDetails.email,
        phoneNumber: friendDetails.phoneNumber,
        relationship: friendDetails.relationship,
        user: { connect: { id: user.id } },
      },
    });

    res.status(StatusCodes.CREATED).send(newFriend);
  } catch (error) {
    console.error("Error adding friend:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
  }
}

async function getFriends(req, res) {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate("friends");
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.status(200).send(user.friends);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function otpLogin(req, res) {
  const { phoneNumber, otp } = req.body;

  const response = await prisma.phoneOtp.findMany({
    where: {
      phoneNumber: phoneNumber,
    },
    orderBy:{
      createdAt: 'desc'
    }  
  
  })
  // console.log("🚀 ~ otpLogin ~ response:", response)

  // const response = await OTP.find({ email }).sort({ createdAt: -1 });
  // console.log(response[0].phoneotp, otp, "RESPONSE123");
  if (otp.length == 0) {

    return res.status(400).json({
      success: false,
      message: "The OTP is not valid",
    });
  } else if (otp != response[0].phoneOtp) {
    // Invalid OTP
    return res.status(400).json({
      success: false,
      message: "The OTP you entered is wrong !!",
    });
  }

  if (!response) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  // console.log("🚀 ~ otpLogin ~ response:", response);

  const token = jwt.sign({ user_id: response[0].id }, JWT_SECRET);
  const user = await prisma.user.findFirst({ where: { phoneNumber: phoneNumber } });
  console.log("🚀 ~ otpLogin ~ user:", user)



  return res.status(200).json({
    success: true,
    message: "User authenticated successfully",

    data: {  user_id: user },
    token: token,
  });
}

module.exports = {
  signUp,
  signIn,

  pingAuthController,
  otpLogin,

  verifyOtp,
  forgetPassword,
  getUser,
  changeProfilePic,
  sendEmailOtp,
  verifyEmailOtp,
  sendOtp,
  addFriend,
  getFriends,
};
