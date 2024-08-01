const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../utils/mails/emailotp");

const OTPSchema = new mongoose.Schema({
    email:{
        type:String,
        required: true,
    },
    phoneotp: {
        type:String,
        required:false,
    },
    emailotp: {
        type:String,
        required:false,
    },
    createdAt: {
        type:Date,
        default:Date.now(),
        // expires: 5*60*60*60,
    }
});



async function sendVerificationEmail(email, otp) {
    try{
        const mailResponse = await mailSender(email,
             "Verification EMAIL from Ekaant Study Room",
             emailTemplate(otp));
        console.log("Email sent Successfully!! => ", mailResponse);
    } catch(error) {
        console.log("Error while sending email", error);
        throw error;
    }
}

OTPSchema.pre("save", async function(next) {
    // Only send an email when a new document is created
    if (this.isNew) {
        await sendVerificationEmail(this.email, this.emailotp);
    }
    next();
});


const OTP = mongoose.model("OTP", OTPSchema);

module.exports = OTP;