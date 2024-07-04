const { StatusCodes } = require("http-status-codes");
const { bcrypt } = require("bcrypt");
const zod = require("zod");
const { User } = require("../models");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "MY_SECRET_KEY";
// signing up schema
const signupSchema = zod.object({
  username: zod.string().min(3).max(255),
  email: zod.string().email(),
  password: zod.string().min(8),
  phoneNumber: zod.number().min(9),
  // accountType: zod.string().min(3).max(255),
});
let pingCounter = 0;

function pingAuthController(req, res) {
  // logger.error("ping error logs for ping controller");
  pingCounter++;
  return res.json({ message: "Auth controller is up", pingCount: pingCounter });
}

async function getUser(req, res, next) {
  console.log("req.user is ", req.user);
  try {
    const user = await getUserById(req.user.id); // Assuming your JWTs encode the user's ID
    if (!user) return res.status(404).send({ message: "User not found" });

    res.send({ user });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
}

// signup function--
async function signUp(req, res, next) {
  const { success } = signupSchema.safeParse(req.body);
  console.log("success is ", success, req.body);
  if (!success) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Invalid data",
      error: { 411: "Invalid data" },
      data: {},
    });
  }
  //   checking whether the user already exists or not
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "User already exists",
      error: { 411: "User already exists" },
      data: {},
    });
  }

  try {
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      phoneNumber: req.body.phoneNumber,
      accountType: req.body.accountType,
    });
    // hashing the password--

    const hashedPassword = await newUser.createHash(req.body.password);
    console.log("hashedpassword is ", hashedPassword);
    newUser.password = hashedPassword;
    // saving the user--
    await newUser.save();
    // getting the user_id--
    const user_id = newUser._id;

    // generating the token--
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
    // next(error);
  }
}
// signin schema
const signinSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(8),
});
async function signIn(req, res, next) {
  const { success } = signinSchema.safeParse(req.body);
  if (!success) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Invalid data",
      error: { 411: "Invalid data" },
      data: {},
    });
  }
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    // Find user with requested email
    if (user) {
      if (await user.validatePassword(password)) {
        const token = jwt.sign({ user_id: user._id }, JWT_SECRET);
        return res.status(StatusCodes.OK).json({
          success: true,
          message: "User authenticated successfully",
          error: {},
          data: { user, user_id: user._id },
          token: token,
        });
      } else {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          success: false,
          message: "Invalid credentials",
          error: { 411: "Invalid credentials" },
          data: {},
        });
      }
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

let otpTest = 0;

// async function sendOtp(phoneNumber) {
//   // """Sends an OTP (One-Time Password) to the provided phone number using Fast2SMS Quick API.

//   // Args:
//   //     phoneNumber (str): The recipient's phone number in international format (e.g., +1234567890).

//   // Returns:
//   //     Promise<object>: A promise that resolves to a dictionary containing the API response,
//   //                        including success status and message.
//   // """

//   // Replace 'YOUR_API_KEY' with your actual Fast2SMS API key
//   const apiKey ="FpDr9oekQIfa4x0PbKgHwyTcZ3Euj8672nYVMvUGtS5CNdRBXARQGtnPEZCmjkVXIsuHxg6hovJFYdMB";
//   const senderId = "FAST2SMS"; // You can customize the sender ID if allowed by Fast2SMS
//   // FpDr9oekQIfa4x0PbKgHwyTcZ3Euj8672nYVMvUGtS5CNdRBXARQGtnPEZCmjkVXIsuHxg6hovJFYdMB
//   // const message = encodeURIComponent(`${senderId} Your OTP is {code}`); // URL-encode message
//   // Generate a random 6-digit OTP
//   const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

//   otpTest = otpCode;

//     // temporary test

//   const message = `Your OTP is ${otpCode}`;

//   // sms data

//   // if (!phoneNumber || !/^\d{10}$/.test(phoneNumber)) {
//   //   // Check if phone number is a 10-digit number
//   //   throw new Error("Invalid phone number");
//   // }
//   // console.log("phone number is in function", phoneNumber, message);
//   // try {
//   //   // const response = await axios.post(
//   //   //   "https://www.fast2sms.com/dev/bulkV2",
//   //   //   smsData,
//   //   //   {
//   //   //     headers: {
//   //   //       Authorization: apiKey,
//   //   //     },
//   //   //   }
//   //   // const response = await axios.post(
//   //   //   "https://www.fast2sms.com/dev/bulkV2",
//   //   //   {
//   //   //     sender_id: senderId,
//   //   //     message: message,
//   //   //     language: "english",
//   //   //     route: "q",
//   //   //     numbers: phoneNumber,
//   //   //   },
//   //   //   {
//   //   //     headers: {
//   //   //       authorization: apiKey,
//   //   //     },
//   //   //   }
//   //   // );

//   //   return { success: response.data.return, message: response.data.message };
//   //   //https://www.fast2sms.com/dev/bulkV2?authorization=FpDr9oekQIfa4x0PbKgHwyTcZ3Euj8672nYVMvUGtS5CNdRBXARQGtnPEZCmjkVXIsuHxg6hovJFYdMB&route=q&message=&flash=0&numbers=
//   //   // https: return response.data; // Return the JSON response
//   //   // console.log("response is ", response.data);
//   // } catch (error) {
//   //   return { success: false, message: `Error sending OTP: ${error.message}` };
//   // }

//   return

// }

// Example usage (assuming a web framework like Express)

// async function sendOtp(phoneNumber) {
//   // """Sends an OTP (One-Time Password) to the provided phone number using Fast2SMS Quick API.

//   // Args:
//   //     phoneNumber (str): The recipient's phone number in international format (e.g., +1234567890).

//   // Returns:
//   //     Promise<object>: A promise that resolves to a dictionary containing the API response,
//   //                        including success status and message.
//   // """

//   // Replace 'YOUR_API_KEY' with your actual Fast2SMS API key
//   const apiKey ="FpDr9oekQIfa4x0PbKgHwyTcZ3Euj8672nYVMvUGtS5CNdRBXARQGtnPEZCmjkVXIsuHxg6hovJFYdMB";
//   const senderId = "FAST2SMS"; // You can customize the sender ID if allowed by Fast2SMS
//   // FpDr9oekQIfa4x0PbKgHwyTcZ3Euj8672nYVMvUGtS5CNdRBXARQGtnPEZCmjkVXIsuHxg6hovJFYdMB
//   // const message = encodeURIComponent(`${senderId} Your OTP is {code}`); // URL-encode message
//   // Generate a random 6-digit OTP
//   const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

//   otpTest = otpCode;

//     // temporary test

//   const message = `Your OTP is ${otpCode}`;

//   // sms data

//   // if (!phoneNumber || !/^\d{10}$/.test(phoneNumber)) {
//   //   // Check if phone number is a 10-digit number
//   //   throw new Error("Invalid phone number");
//   // }
//   // console.log("phone number is in function", phoneNumber, message);
//   // try {
//   //   // const response = await axios.post(
//   //   //   "https://www.fast2sms.com/dev/bulkV2",
//   //   //   smsData,
//   //   //   {
//   //   //     headers: {
//   //   //       Authorization: apiKey,
//   //   //     },
//   //   //   }
//   //   // const response = await axios.post(
//   //   //   "https://www.fast2sms.com/dev/bulkV2",
//   //   //   {
//   //   //     sender_id: senderId,
//   //   //     message: message,
//   //   //     language: "english",
//   //   //     route: "q",
//   //   //     numbers: phoneNumber,
//   //   //   },
//   //   //   {
//   //   //     headers: {
//   //   //       authorization: apiKey,
//   //   //     },
//   //   //   }
//   //   // );

//   //   return { success: response.data.return, message: response.data.message };
//   //   //https://www.fast2sms.com/dev/bulkV2?authorization=FpDr9oekQIfa4x0PbKgHwyTcZ3Euj8672nYVMvUGtS5CNdRBXARQGtnPEZCmjkVXIsuHxg6hovJFYdMB&route=q&message=&flash=0&numbers=
//   //   // https: return response.data; // Return the JSON response
//   //   // console.log("response is ", response.data);
//   // } catch (error) {
//   //   return { success: false, message: `Error sending OTP: ${error.message}` };
//   // }

//   return

// }

// Example usage (assuming a web framework like Express)
async function sendOtp(phoneNumber) {
  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
  console.log(`OTP for ${phoneNumber} is ${otpCode}`);

  otpTest = otpCode;
  return { success: true, message: `OTP sent to ${phoneNumber}` };
}
async function generateOtp(req, res, next) {
  const phoneNumber = req.body.phoneNumber;
  console.log("phone number is ", phoneNumber);
  if (!phoneNumber || !/^\d{10}$/.test(phoneNumber)) {
    console.log("invalid phone number is ", phoneNumber);
    return res
      .status(400)
      .json({ success: false, message: "Missing phone number" });
  }
  console.log("phone number is ", phoneNumber);
  // try {
  const response = await sendOtp(phoneNumber);

  res.json(response);
  // } catch (error) {
  //   console.error(error);
  //   console.error(error.response ? error.response.data : error);
  //   res.status(500).json({ success: false, message: "Internal server error" });
  // }
}

async function verifyOtp(req, res) {
  const { otp } = req.body;
  if (otp === "" || otp === null || otp === undefined || otp === 0) {
    return res.status(200).json({ message: "Pass it" });
  }
  if (otp !== otpTest) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  return res.status(200).json({ message: "OTP verified successfully" });

  // if (!phoneNumber || !/^\d{10}$/.test(phoneNumber)) {
  //   return res.status(400).json({ message: "Invalid phone number" });
  // }

  // if (!otp || !/^\d{6}$/.test(otp)) {
  //   return res.status(400).json({ message: "Invalid OTP" });
  // }

  // try {
  //   const isValid = await otpService.verifyOtp(phoneNumber, otp);

  //   if (isValid) {
  //     res.status(200).json({ message: "OTP verified successfully" });
  //   } else {
  //     res.status(400).json({ message: "Invalid OTP" });
  //   }
  // } catch (error) {
  //   res.status(500).json({ message: "An error occurred while verifying the OTP" });
  // }
}

// forget password--
const forgetPasswordSchema = zod.object({
  userId: zod.string().min(3).max(255),
  password: zod.string().min(8),
  resetPassword: zod.string().min(8),
});

async function forgetPassword(req, res, next) {
  // const { success } = forgetPasswordSchema.safeParse(req.body);
  // console.log("success is ", success, req.body);
  // if (!success) {
  //   return res.status(StatusCodes.BAD_REQUEST).json({
  //     success: false,
  //     message: "Invalid data",
  //     error: { 411: "Invalid data" },
  //     data: {},
  //   });
  // }
  try {
    // const user = await User.findById(req.params._id);
    const { userId, password, resetPassword } = req.body;
    console.log(
      "Received password:",
      password,
      "and resetPassword:",
      resetPassword
    );

    const user = await User.findOne({ _id: userId });
    if (user) {
      // validate the old password
      if (!(await user.validatePassword(password))) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          message: "Invalid password",
          error: { 411: "Invalid password" },
          data: {},
        });
      }
      console.log(
        "validate password is ",
        await user.validatePassword(password)
      );
      const hashedPassword = await user.createHash(resetPassword);
      user.password = hashedPassword;
      await user.save();
      const userId = user._id;
      const token = jwt.sign({ userId }, JWT_SECRET);
      return res.status(StatusCodes.OK).json({
        success: true,
        message: "Password reset successfully",
        error: {},
        data: user,
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
    console.log(e);
  }
}

async function changeProfilePic(req, res) {
  const userId = req.body.userId;
  console.log("userId id ", userId);
  const user = await User.findOne({ _id: userId });
  try {
    if (user) {
      const image = req.file.path;
      user.image = image;
      console.log(user.image, "user image is ");
      console.log(image, "image is ");
      // Save the user object with the updated image path
      await user.save();
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

module.exports = {
  signUp,
  signIn,
  // updateProfile,
  pingAuthController,
  generateOtp,
  verifyOtp,
  forgetPassword,
  getUser,
  changeProfilePic,
};
