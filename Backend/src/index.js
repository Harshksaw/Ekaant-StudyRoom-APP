const express = require("express");
const bodyParser = require("body-parser");

const { PORT } = require("./config/server.config");
const apiRouter = require("./routes");

const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
require("dotenv").config();
const cron = require("node-cron");

const { PrismaClient } = require("@prisma/client");
// const { createBackup } = require("./controllers/app.controller");
const backupDatabase = require("./backup");

const prisma = new PrismaClient();

const client = require('prom-client');
const { metricsMiddleware } = require("./metrics");
const { cleanupMiddleware } = require("./metrics/cleanupMiddleware");

// const PORT
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.text());

app.use(express.json({ limit: "50mb" }));
app.use(cleanupMiddleware)
app.use(metricsMiddleware);

app.get("/me", (req, res) => {
  res.status(200).json({ message: "Hello from Problem Service" });
});



app.use("/api", apiRouter);


// Schedule a task to run every minute
cron.schedule("0 */3 * * *", async () => {
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
    console.log("Expired OTPs deleted successfully");
  } catch (error) {
    console.error("Error deleting expired OTPs:", error);
  }
});

app.get("/createBackup", backupDatabase);

async function deleteAllResources(req, res) {
  try {
    const resources = await cloudinary.api.resources();
    const publicIds = resources.resources.map((resource) => resource.public_id);
    console.log("🚀 ~ deleteAllResources ~ publicIds:", publicIds);

    if (publicIds.length > 0) {
      await cloudinary.api.delete_resources(publicIds);
      console.log("All resources deleted successfully.");
      res.status(200).send("All resources deleted successfully.");
    } else {
      console.log("No resources found.");
      res.status(200).send("No resources found.");
    }
  } catch (error) {
    console.error("Error deleting resources:", error);
    res.status(500).send("Error deleting resources.");
  }
}

app.get("/deleteImages", deleteAllResources);


app.get("/metrics", async (req, res) => {
  const metrics = await client.register.metrics();
  res.set('Content-Type', client.register.contentType);
  res.end(metrics);
})

app.listen(PORT, async () => {
  console.log(`Server started at PORT: ${PORT}`);

  console.log("Successfully connected to db");
});