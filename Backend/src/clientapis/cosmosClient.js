const { CosmosClient } = require("@azure/cosmos");

//connecting code to cosmos db

const endpoint = process.env.COSMOS_DB_URL;
const key = process.env.COSMOS_KEY;
if (!endpoint) {
  throw new Error("COSMOS_ENDPOINT is not defined");
}
const databaseId = process.env.COSMOS_DB_NAME;
const containerId = process.env.COSMOS_CONTAINER_NAME;

const client = new CosmosClient({ endpoint, key });
const database = client.database(databaseId);
const container = database.container(containerId);

//add function
async function logToCosmosDB(level, message) {
  try {
    await container.items.create({
      timeStamp: new Date().toISOString(),
      level,
      message,
    });

    console.log("Logged to Cosmos DB");
  } catch (error) {
    console.log(error);
  }
}
module.exports = { logToCosmosDB };
