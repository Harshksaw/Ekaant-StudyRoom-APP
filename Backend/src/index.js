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
    origin: "*", // Allow all origins
    credentials: true, // Allow credentials (cookies, authorization headers, etc.) to be sent with requests
  })
);
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.text());

app.use(express.json());
// const metrics = {
//   totalCalls: 0,
//   failures: 0,
//   success: 0,
//   endpointUsage: {},
//   startTime: Date.now(),
// };

// Middleware to count API calls and track metrics
// app.use((req, res, next) => {
//   metrics.totalCalls++;
//   const start = process.hrtime();

//   res.on('finish', () => {
//     const duration = process.hrtime(start);
//     const responseTime = duration[0] * 1e3 + duration[1] * 1e-6; // Convert to milliseconds
//     const endpoint = `${req.method} ${req.path}`;

//     // Initialize endpoint usage counter
//     if (!metrics.endpointUsage[endpoint]) {
//       metrics.endpointUsage[endpoint] = { calls: 0, failures: 0, success: 0, totalTime: 0 };
//     }

//     metrics.endpointUsage[endpoint].calls++;
//     metrics.endpointUsage[endpoint].totalTime += responseTime;

//     if (res.statusCode >= 200 && res.statusCode < 400) {
//       metrics.success++;
//       metrics.endpointUsage[endpoint].success++;
//     } else {
//       metrics.failures++;
//       metrics.endpointUsage[endpoint].failures++;
//     }
//   });

//   next();
// });

// If any request comes and route starts with /api, we map it to apiRouter
app.use("/api", apiRouter);

app.get("/ping", (req, res) => {
  return res.json({ message: "Problem Service is alive" });
});
// Health and metrics endpoint
// app.get('/health', (req, res) => {
//   const uptime = Date.now() - metrics.startTime;
//   res.send({
//     status: 'up',
//     uptime: `${uptime / 1000}s`,
//     metrics,
//   });
// });
// last middleware if any error comes
app.use(errorHandler);

app.listen(3002, async () => {
  console.log(`Server started at PORT: ${PORT}`);
  await connectToDB();
  console.log("Successfully connected to db");
});
