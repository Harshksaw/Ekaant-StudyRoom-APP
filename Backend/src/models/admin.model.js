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
    required: true,
  },
  ownedProperties:[
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
    adhaarImage: {
        type: String,
        require: true,
    }
  },
  address: {},
  panCardDetails: {
    panNumber: {
        type: String,
        require: true,
    },
    panImage: {
        type: String,
        require: true,
    }
  },
  profileImage: {
    type: String,
    required: false,
  },
  resetPasswordExpires: {
    type: Date,
  },
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

