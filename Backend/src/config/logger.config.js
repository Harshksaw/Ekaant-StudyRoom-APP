const winston = require("winston");
const { LOG_DB_URL } = require("./server.config");
const allowedTransports = [];
require("winston-mongodb");

const { Writable } = require("stream");
const logToCosmosDB = require("../clientapis/cosmosClient").logToCosmosDB;

const customStream = new Writable({
  write(chunk, encoding, callback) {
    const log = chunk.toString();
    logToCosmosDB("Log intercepted in custom transport", log);
    logToCosmosDB("Error", log);
    callback();
  },
});

//the below transport enable logging on the file
const customStreamTransport = new winston.transports.Stream({
  stream: customStream,
});

allowedTransports.push(customStreamTransport);

//the below transport enable logging on the console
allowedTransports.push(
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss",
      }),
      winston.format.printf(
        (log) => `${log.timestamp} [${log.level}] : ${log.message}`
      ),
      winston.format.colorize()
    ),
  })
);

// the below transport enable logging on the MongoDb db
allowedTransports.push(
  new winston.transports.MongoDB({
    //particular type
    level: "error",
    db: LOG_DB_URL,
    collection: "logs",
    // metaKey: winston.format.metadata(),
    // format: winston.format.combine({
    // })
  })
);

allowedTransports.push(
  new winston.transports.File({
    filename: `app.log`,
  })
);

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.printf(
      (log) => `${log.timestamp} [${log.level.toUpperCase()}] : ${log.message}`
    )
  ),
  transports: allowedTransports,
});

module.exports = logger;
