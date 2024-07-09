const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const FriendSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false, // Assuming email might not be mandatory
  },
  phoneNumber: {
    type: Number,
    required: false, // Assuming phone number might not be mandatory
  },
  relationship: {
    type: String,
    required: false, // Describe the relationship (optional)
  },
  // Add any other relevant fields here
}, { _id: false }); 


const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

  phoneNumber: {
    type: Number,
    required: true,
    maxLength: 10,
    minLength: 10,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  accountType: {
    type: String,
    enum: ["Admin", "User", "Owner"],
    required: true,
  },
  additionalDetails: {
    type: [String],
    required: false,
    // ref: "Profile",
  },
  ownedProperties: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Library",
    },
  ],
  bookings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Library", //bboking table
    },
  ],
  image: {
    type: String,
    required: false,
  },

  resetPasswordExpires: {
    type: Date,
  },
  friends: [FriendSchema]
});
// password hashing--
UserSchema.methods.createHash = async function (password) {
  const saltRounds = 10;
  // const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(password, saltRounds);
};

// validate password--
UserSchema.methods.validatePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};
const User = mongoose.model("User", UserSchema);

module.exports = User;
