
const { requestCountMiddleware } = require('./requestCounts');
const { requestDurationMiddleware } = require('./requestDuration');

const metricsMiddleware = (req, res, next) => {


  requestCountMiddleware(req, res, () => {});
  requestDurationMiddleware(req, res, () => {});
  

  next();
};
module.exports = { metricsMiddleware };