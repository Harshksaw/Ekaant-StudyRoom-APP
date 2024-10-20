const express = require("express");
const path = require("path");
const { AdminController } = require("../../controllers");
const AdminRouter = express.Router();
const multer = require("multer");
const AWS = require('aws-sdk');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: multer.memoryStorage() });


AdminRouter.get("/ping", AdminController.pingAdminController);
AdminRouter.post(
  "/registerAdmin",

  upload.fields([{ name: 'pancard', maxCount: 1 }, { name: 'aadhar', maxCount: 1 }]), 

  AdminController.RegisterAdmin
);
AdminRouter.post("/loginAdmin", AdminController.LoginAdmin);

AdminRouter.post("/resetAdminPassword", AdminController.ResetAdminPassword);



module.exports = AdminRouter;
