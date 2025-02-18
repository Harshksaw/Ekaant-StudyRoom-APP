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
// const { requestCountMiddleware } = require("./metrics/requestCounts");
const prisma = new PrismaClient();


const { Histogram } = require('prom-client');
const client = require('prom-client');

// const PORT
const app = express();


// app.use(cors(
  
// ));
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.text());

app.use(express.json({ limit: "50mb" }));



const histogram = new Histogram({
  name : "http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  labelNames: ["method", "route", "code"],
  buckets: [0.1, 0.5, 1, 2, 5, 10]
})


function middleware(req, res , next){
  const startTIme = Date.now();
  res.on('finish', () => {
    const responseTime = Date.now() - startTIme;

    histogram.observe({
      value: responseTime / 1000,
    })
    // histogram.labels(req.method, req.route.path, res.statusCode).observe(responseTime / 1000);
  })
  next();
}






app.use(middleware);











// app.use(requestCountMiddleware)

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



// cloudinary.config({
//   cloud_name: "dbnnlqq5v",
//   api_key: 283514623947746,
//   api_secret: "E2s6axKWvXTiJi5_DGiFuPe7Lxo",
// });

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
