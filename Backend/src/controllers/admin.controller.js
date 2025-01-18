const { StatusCodes } = require("http-status-codes");
const axios = require("axios");

const jwt = require("jsonwebtoken");
const Admin = require("../models/admin.model");
const JWT_SECRET = "MY_SECRET_KEY";
const { PrismaClient, Prisma } = require('@prisma/client');

const prisma = new PrismaClient();

const bcrypt = require("bcrypt");

const { Library } = require("../models/library.model");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const phoneotp = require("../models/phoneotp");
const AWS = require('aws-sdk');
const ping = (req, res) => {
  res.status(StatusCodes.OK).json({ message: "Ping successful" });
};
// singup
// Function to encrypt file data
// Function to encrypt data using AES-256
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.REGION
});

async function RegisterAdmin(req, res, next) {
  try {
    const {
      phoneNumber,
      email,
      password,
      fullName,
      Dob,
      AddharNumber,
      PanNumber,
      Address,
      username,
    } = req.body;


    const existingAdmin = await prisma.admin.findFirst({ where : { email : email }});
    if (existingAdmin) {
      const token = jwt.sign({ admin_id: existingAdmin.id }, JWT_SECRET);
      return res.status(200).json({
        success: true,
        message: 'Admin already registered',
        data: existingAdmin,
        token,
      });
    }
       const uploadToS3 = (file, folder) => {
        const params = {
          Bucket: process.env.S3_BUCKET_NAME,
          Key: `${folder}/${file.originalname}`,
          Body: file.buffer,
          ContentType: file.mimetype
        };
        return s3.upload(params).promise();
      };
    const { pancard, aadhar } = req.files;

    if (!pancard || !pancard[0]) {
      return res.status(400).json({ message: 'Pancard file is required' });
    }

    if (!aadhar || !aadhar[0]) {
      return res.status(400).json({ message: 'Aadhar file is required' });
    }



    const pancardUpload = await uploadToS3(pancard[0], `admin/${username}`);
    const aadharUpload = await uploadToS3(aadhar[0], `admin/${username}`);
  

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await prisma.admin.create({

      data :{

        phoneNumber,
        username,
        email,
        password: hashedPassword,
        fullName,
        Dob : new Date(Dob),
        AddharNumber,
        PanNumber,
        address: Address,
        adhaarCardDetails: {
          create: {
            adhaarNumber: AddharNumber,
            adhaarCardFile: aadharUpload.Location,
          },
        },
        panCardDetails: {
          create: {
            panNumber: PanNumber,
            panCardFile: pancardUpload.Location,
          },
        },
      }
      });
    console.log("🚀 ~ RegisterAdmin ~ newAdmin:", newAdmin)

    const token = jwt.sign({ admin_id: newAdmin.id }, JWT_SECRET);

    return res.status(201).json({
      success: true,
      message: 'Admin created successfully',
      data: newAdmin,
      token,
    });
  } catch (error) {
    console.error('Error in RegisterAdmin:', error);
    next(error);
  }
}

// login--
async function LoginAdmin(req, res) {
  const { email, password } = req.body;
  // console.log("🚀 ~ LoginAdmin ~ req.body:", req.body)



  try {
    const admin = await prisma.admin.findFirst({ where: { email : email} });
    console.log(admin)
    if (!admin) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ success: false, message: "Authentication failed" });
    }


    const isMatch = await bcrypt.compare(password, admin.password);
    console.log("isMatch is ", isMatch);  
    if (!isMatch) {
      return res
        .status(401)
        .json({
          success: false,
          message: "Authentication failed. Wrong password.",
        });
    }

    // Generate token
    const token = jwt.sign({ admin_id: admin.id }, JWT_SECRET);
    const libraries = await  prisma.library.findFirst({ where : {libraryOwnerId: admin.id } })

    if(admin.accountType === "Owner"){
      return res.status(200).json({
        success: true,
        message: "Admin authenticated successfully, library owner.",
        data: admin,
        token,
      });
    }

    if (libraries.length > 1) {
      // User owns more than one library, considered an existing user
      return res.status(200).json({
        success: true,
        message: "Existing user with multiple libraries.",
        data: admin,
        token,
      });


    } else if (libraries.length === 1) {


      const hasRooms = libraries[0].rooms ;
      console.log(hasRooms);

      if (hasRooms.length === 0) {
        // The single library has rooms
        return res.status(200).json({
          success: true,
          message: "Admin authenticated successfully, library has no  rooms.",
          hasRooms : false,
          data: admin,
          token,
        });
      } else {
        // The single library does not have rooms
        return res.status(200).json({
          success: true,
          message: "Admin authenticated successfully, but the library has  rooms.",
          hasRooms : true,
          data: admin,
          token,
        });
      }
    } else {
      // No libraries found, user does not own any libraries
      return res.status(200).json({
        success: true,
        message: "Admin authenticated successfully, but no libraries owned.",
        data: admin,
        token,
      });
    }
  
  } catch (error) {

    console.log(error)
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: error.message });
  }
}
// change password--
// async function ChangeAdminPassword(req, res, next) {
//   try {
//     const { oldPassword, newPassword, confirmPassword } = req.body;

//     const admin = await Admin.findById(req.admin.admin_id); //can be a problem
//     //validation of oldPass
//     if (!admin.validatePassword(oldPassword)) {
//       return res.status(StatusCodes.BAD_REQUEST).json({
//         success: false,
//         message: "Old password is incorrect",
//         error: {},
//       });
//     }
//     //validation of newPass
//     if (newPassword !== confirmPassword) {
//       return res.status(StatusCodes.BAD_REQUEST).json({
//         success: false,
//         message: "Password does not match",
//         error: {},
//       });
//     }
//     const hashedPassword = await admin.createHash(newPassword);
//     const updatedAdminDetails = await Admin.findOneAndUpdate(
//       { admin_id: req.admin.admin_id },
//       { password: hashedPassword },
//       { new: true }
//     );

//     //send mail - Password updated
//     try {
//       const emailResponse = await mailSender(
//         updatedUserDetails.email,
//         `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`,
//         passwordUpdated(
//           updatedUserDetails.email,
//           `${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
//         )
//       );
//       console.log("Email sent successfully:", emailResponse.response);
//     } catch (error) {
//       // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
//       console.error("Error occurred while sending email:", error);
//       return res.status(500).json({
//         success: false,
//         message: "Error occurred while sending email",
//         error: error.message,
//       });
//     }
//     return res
//       .status(200)
//       .json({ success: true, message: "Password updated successfully" });
//   } catch (error) {
//     console.log("error is ", error);
//   }
// }
// reset password--
//



async function resetpasswordotp(req, res , next){

  try {
    
    const { phoneNumber } = req.body;
    const apiKey = process.env.FASTSMS;
    var otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
  
    // console.log("OTP GENERATED => ", otp, phoneNumber, apiKey);
  
    if (!phoneNumber) {
      return res.status(400).json({
        success: false,
        message: "Phone number is required",
      });
    }
    
    if (!apiKey) {

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
    const otpPayload = { phoneNumber, phoneotp: otp };
    const otpBody = await prisma.phoneOtp.create(otpPayload);

  
    if (response.status == 200) {
      return res.status(200).json({
        success: true,
        message: `OTP sent to ${phoneNumber}`,
      });
    } else {
      return res.status(response.status).json({
        success: false,
        message: "Failed to send OTP",
      });
    }

  } catch (error) {
    console.log("error is ", error);

    
  }

}
async function ResetAdminPassword(req, res, next) {
  const { phoneNumber, otp , password, confirmPassword } = req.body;
  // console.log("🚀 ~ ResetAdminPassword ~ req.body:", req.body)
  if (password !== confirmPassword) {
    // console.log("Password does not match");
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Password does not match",
      error: {},
    });
  }

  const latest = await  prisma.phoneOtp.find({ phoneNumber : phoneNumber}).sort({ createdAt: -1 });
  if(latest[0].phoneotp !== otp){
    console.log("OTP is incorrect", latest, otp);
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "OTP is incorrect",
      error: {},
    });
  }
  const admin = await prisma.admin.findOne({ phoneNumber });

  if (admin) {
    const hashedPassword = await admin.createHash(password);
    admin.password = hashedPassword;
    await admin.save();
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Password updated  successfully",
      error: {},
    });
  } else {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Email not found",
      error: {},
    });
  }
}

async function BookSeat(req, res) {
  const { libraryId, roomNo, seatId, adminId, date  , slotId} = req.body;

  console.log("🚀 ~ BookSeat ~ req.body:", req.body)

  try {
    await prisma.$transaction(async (prisma) => {
      console.log("Starting transaction for booking seat and timeslot");

      const library = await prisma.library.findUnique({
      where: { id: libraryId }
      });
      if (!library) {
      console.log("Library not found");
      return res.status(404).json({ message: "Library not found" });
      }
      console.log("Library found:", library);

      const room = await prisma.room.findFirst({
      where: {
        libraryId: libraryId,
        roomNo: Number(roomNo)
      }
      });
      if (!room) {
      console.log("Room not found");
      return res.status(404).json({ message: "Room not found" });
      }
      console.log("Room found:", room);

      const timeslot = await prisma.timeSlot.findUnique({
      where: { id: slotId }
      });
      if (!timeslot) {
      console.log("Timeslot not found");
      return res.status(404).json({ message: "Timeslot not found" });
      }
      if (timeslot.booked) {
      console.log("Timeslot is already booked");
      return res.status(400).json({ message: "Timeslot is already booked" });
      }
      console.log("Timeslot found:", timeslot);

      const updatedSeat = await prisma.transaction.create({
      where: { id: seatId },
      data: {
        booked: true,
        bookedBy: adminId,
        libraryId: libraryId,
        type:"OFFLINE_BOOKING"

      },
      });
      console.log("Seat updated:", updatedSeat);

      const updatedTimeslot = await prisma.timeSlot.update({
      where: { id: slotId },
      data: {
        booked: true,
        bookedById: adminId,
        bookingSource: "admin",
        bookingEndDate: new Date(date),
      },
      });
      console.log("Timeslot updated:", updatedTimeslot);

      res.status(200).json({ message: "Seat and timeslot booked successfully" });
    });

  } catch (error) {
    res.status(500).json({ message: "Error booking seat", error });
  }


}
async function RemoveSeatBooking(req, res) {
  const { libraryId, roomNo, seatId } = req.body;

  try {
    // Find the seat by its ID
    const seat = await prisma.seat.findUnique({
      where: { id: seatId },
      include: {
        room: {
          include: {
            library: true,
          },
        },
      },
    });

    if (!seat) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Seat not found" });
    }

    if (!seat.booked) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: "Seat is not booked" });
    }

    // Update the seat information
    const updatedSeat = await prisma.seat.update({
      where: { id: seatId },
      data: {
        booked: false,
        bookedBy: null,
        bookingSource: null,
      },
    });

    res.status(StatusCodes.OK).json({ message: "Seat booking removed successfully", data: updatedSeat });
  } catch (error) {
    console.error("Error removing seat booking:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error removing seat booking", error: error.message });
  }
}

async function getEarnings(req, res) {
  const {id: adminId} = req.params;

  try {
    
    const libraryId = await prisma.library.findFirst({ where : {libraryOwnerId : adminId}});

    if (!libraryId) {
      return res.status(404).json({ message: "Library not found" });
    }

    const earnings = await prisma.booking.findMany({
      where: {
        libraryId: libraryId.id,
        paid: true,
      },
     
    });

    const totalEarnings = earnings.reduce((total, booking) => total + booking.finalPrice , 0);

    return res.status(200).json({
      message: "Earnings fetched successfully",
      data:  totalEarnings ,
    })


  } catch (error) {
    console.error("Error getting earnings:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error getting earnings", error: error.message });
    
  }
}

module.exports = {
  pingAdminController: ping,
  RegisterAdmin,
  LoginAdmin,
  ResetAdminPassword,
  BookSeat,
  RemoveSeatBooking,
  resetpasswordotp,
  getEarnings

};

