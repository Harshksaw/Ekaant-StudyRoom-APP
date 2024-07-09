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


  async function generateEmailOtp(req, res, next) {
    const email = req.body.email;
    console.log("email is ", email);
    // Regular expression for basic email validation
    if (!email || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      console.log("invalid email is ", email);
      return res
        .status(400)
        .json({ success: false, message: "Invalid email address" });
    }
    const otpCode = Math.floor(1000 + Math.random() * 9000).toString(); // Generating a 4-digit OTP
    console.log(`OTP for ${email} is ${otpCode}`); // In a real scenario, you would send this via email
  
    // Ideally, store the OTP for verification later
    return res.json({ success: true, message: `OTP sent to ${email}`, otp: otpCode });
  }

  
  module.exports = {
    generateOtp,
  }