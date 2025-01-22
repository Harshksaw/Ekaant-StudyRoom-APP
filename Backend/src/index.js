const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { PORT } = require("./config/server.config");
const apiRouter = require("./routes");
const errorHandler = require("./utils/errorHandler");

const path = require('path'); 
require('dotenv').config({ path: path.join(__dirname, '.env') });
require("dotenv").config();
const cron = require('node-cron');
// const StatsD = require('hot-shots');
// const dogstatsd = new StatsD();
const { PrismaClient } = require('@prisma/client');
const { createBackup } = require("./controllers/app.controller");
const backupDatabase = require("./backup");
const prisma = new PrismaClient();



// const PORT
const app = express();


app.use(cors(
  
));
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.text());

app.use(express.json({ limit: "50mb" }));

const metrics = {
  totalCalls: 0,
  failures: 0,
  success: 0,
  endpointUsage: {},
  startTime: Date.now(),
};

// Middleware to count API calls and track metrics
app.use((req, res, next) => {
  metrics.totalCalls++;
  const start = process.hrtime();

  res.on('finish', () => {
    const duration = process.hrtime(start);
    const responseTime = duration[0] * 1e3 + duration[1] * 1e-6; // Convert to milliseconds
    const endpoint = `${req.method} ${req.path}`;

    // Initialize endpoint usage counter
    if (!metrics.endpointUsage[endpoint]) {
      metrics.endpointUsage[endpoint] = { calls: 0, failures: 0, success: 0, totalTime: 0 };
    }

    metrics.endpointUsage[endpoint].calls++;
    metrics.endpointUsage[endpoint].totalTime += responseTime;

    if (res.statusCode >= 200 && res.statusCode < 400) {
      metrics.success++;
      metrics.endpointUsage[endpoint].success++;
    } else {
      metrics.failures++;
      metrics.endpointUsage[endpoint].failures++;
    }
  });

  next();
});


app.get('/me', (req, res)=>{
  res.status(200).json({message: "Hello from Problem Service"});
})

// If any request comes and route starts with /api, we map it to apiRouter
app.use("/api", apiRouter);

app.get("/ping", (req, res) => {
  return res.json({ message: "Problem Service is alive" });
});

app.get('/health', (req, res) => {
  const uptime = Date.now() - metrics.startTime;
  dogstatsd.gauge('system.uptime', uptime / 1000); // Example g
  res.send({
    status: 'up',
    uptime: `${uptime / 1000}s`,
    metrics,
  });
});

app.use(errorHandler);
// Schedule a task to run every minute
cron.schedule('0 */3 * * *', async () => {
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

  try {
    // Delete OTPs older than 5 minutes
    await prisma.otp.deleteMany({
      where: {
        createdAt: {
          lt: fiveMinutesAgo,
        },
      },
    });
    await prisma.phoneOtp.deleteMany({
      where: {
        createdAt: {
          lt: fiveMinutesAgo,
        },
      },
    });
    console.log('Expired OTPs deleted successfully');
  } catch (error) {
    console.error('Error deleting expired OTPs:', error);
  }
});



app.get('/createBackup', backupDatabase)


const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function deleteAllResources(req, res) {
  try {
    const resources = await cloudinary.api.resources();
    const publicIds = resources.resources.map(resource => resource.public_id);
    console.log("🚀 ~ deleteAllResources ~ publicIds:", publicIds);

    if (publicIds.length > 0) {
      await cloudinary.api.delete_resources(publicIds);
      console.log('All resources deleted successfully.');
      res.status(200).send('All resources deleted successfully.');
    } else {
      console.log('No resources found.');
      res.status(200).send('No resources found.');
    }
  } catch (error) {
    console.error('Error deleting resources:', error);
    res.status(500).send('Error deleting resources.');
  }
}

app.get('/deleteImages', deleteAllResources)



























































































































































































































































app.listen(PORT, async () => {
  console.log(`Server started at PORT: ${PORT}`);

  console.log("Successfully connected to db");
});
