const { default: mongoose } = require("mongoose");

const OTPSchema = new mongoose.Schema({
    phoneNumber:{
        type:String,
        required: true,
    },
  
    phoneotp: {
        type:String,
        required:false,
    },
    createdAt: {
        type:Date,
        default:Date.now(),
        // expires: 5*60*60*60,
    }
});



const phoneotp = mongoose.model("phoneotp", OTPSchema);

module.exports = phoneotp;