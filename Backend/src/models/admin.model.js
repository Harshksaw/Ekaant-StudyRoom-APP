const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const AdminSchema = new mongoose.Schema({
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

    default:'Admin',
    required: false,

  },
  ownedProperties: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Library",
    },
  ],
  adhaarCardDetails: {
    adhaarNumber: {
      type: String,
      require: true,
    },

    adhaarCardFile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'File',
      required: true,
    }

  },
  address: {},
  panCardDetails: {
    panNumber: {
      type: String,
      require: true,
    },

    panCardFile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'File',
      required: true,
    }

  },
  profileImage: {
    type: String,
    required: false,
  },
  resetPasswordExpires: {
    type: Date,
  },
  // adding a reset password token
  // token: {
  //   type: String,
  // },
});
// password hashing--
AdminSchema.methods.createHash = async function (password) {
  const saltRounds = 10;
  // const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(password, saltRounds);
};

// validate password--
AdminSchema.methods.validatePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};
const Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;
