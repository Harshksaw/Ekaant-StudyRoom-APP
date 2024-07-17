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

let otpTest = 0;
let emailOtpTest

function pingAuthController(req, res) {
  // logger.error("ping error logs for ping controller");
  pingCounter++;
  return res.json({ message: "Auth controller is up", pingCount: pingCounter });
}

async function getUser(req, res, next) {
  // console.log("req.user is ", req.user);
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
      return res.send("Please login to access this resource", 400)

    }

  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
}

// signup function--
async function signUp(req, res, next) {


  const images = req.file.path;
 
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
      image: images,
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
async function sendOtp(req, res) {
  const { phoneNumber } = req.body;
  const otpCode = Math.floor(1000 + Math.random() * 9000).toString();
  console.log(`OTP for ${phoneNumber} is ${otpCode}`);

  otpTest = otpCode;
  return res.status(200).json({ success: true, message: `OTP sent to ${phoneNumber}` });
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


}

async function sendEmailOtp(email) {
  const otpCode = Math.floor(1000 + Math.random() * 9000).toString();
  console.log(`OTP for ${email} is ${otpCode}`); // In a real scenario, this would be sent via email

  emailOtpTest = otpCode; // Storing the OTP for verification
  console.log("email otp is line 330", emailOtpTest);
  return { success: true, message: `OTP sent to ${email}` };
}

async function verifyEmailOtp(req, res) {
  const { otp } = req.body;
  if (otp === "" || otp === null || otp === undefined || otp === 0) {
    return res.status(200).json({ message: "Pass it" });
  }
  if (otp !== emailOtpTest) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  return res.status(200).json({ message: "OTP verified successfully" });
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

 async function addFriend(req, res){
  try {
    const { userId } = req.params;
    const friendDetails = req.body; // Assuming friendDetails contains name, email, etc.
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }
    user.friends.push(friendDetails);
    await user.save();
    res.status(201).send(user.friends);
  } catch (error) {
    res.status(500).send(error.message);
  }
}


 async function getFriends(req, res){
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate('friends');
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.status(200).send(user.friends);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = {
  signUp,
  signIn,

  pingAuthController,

  verifyOtp,
  forgetPassword,
  getUser,
  changeProfilePic,
  sendEmailOtp,
  verifyEmailOtp,
  sendOtp,
  addFriend,
  getFriends
};
