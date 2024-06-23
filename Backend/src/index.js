const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { PORT } = require("./config/server.config");
const apiRouter = require("./routes");
const errorHandler = require("./utils/errorHandler");
const connectToDB = require("./config/db.config");
require("dotenv").config();

const cloudinary = require("cloudinary").v2;

const Multer = require("multer");



// const PORT
const app = express();
app.use(
	cors({
		origin: "*",
		credentials: true,
	})
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());


cloudinary.config({
	cloud_name: 'dzwvmqbv0' ,
	api_key:572782272174972,
	api_secret:'Sx6t5hAG6ynwO6mr8GN-L55A7MI',
  });


// If any request comes and route starts with /api, we map it to apiRouter
app.use("/api", apiRouter);

app.get("/ping", (req, res) => {
  return res.json({ message: "Problem Service is alive" });
});

// last middleware if any error comes
app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`Server started at PORT: ${PORT}`);
  await connectToDB();
  console.log("Successfully connected to db");
});
