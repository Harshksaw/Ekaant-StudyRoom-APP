const { StatusCodes } = require("http-status-codes");
const logger = require("../config/logger.config");
const zod = require("zod");
const { User } = require("../models");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "MY_SECRET_KEY";
// signing up schema
const signupSchema = zod.object({
  username: zod.string().min(3).max(255),
  password: zod.string().min(8),
  email: zod.string().email(),
  phoneNumber: zod.string().min(10).max(10),
});
let pingCounter = 0;

function pingAuthController(req, res) {
  // logger.error("ping error logs for ping controller");
  pingCounter++;
  return res.json({ message: "Auth controller is up", pingCount: pingCounter });
}
// signup function--
async function signUp(req, res, next) {
  const { success } = signupSchema.safeParse(req.body);
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
    next(error);
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
    // Find user with requested email
    const user = await User.findOne({ email });
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

function updateProfile(req, res) {
  // Implement the logic to update user profile
}

module.exports = {
  signUp,
  signIn,
  updateProfile,
  pingAuthController,
};
