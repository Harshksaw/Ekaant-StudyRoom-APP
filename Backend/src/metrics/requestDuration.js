// filepath: /Volumes/macdrive/harshx/Documents/GitHub/Ekaant/Backend/src/metrics/requestDuration.ts

const client = require('prom-client');
const histogram = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  labelNames: ['method', 'route', 'code'],
  buckets: [0.1, 0.5, 1, 2, 5, 10]
});

const requestDurationMiddleware = (req, res, next) => {
  const startTime = Date.now();
  res.on('finish', () => {
    const responseTime = Date.now() - startTime;
    // Pass the values as separate arguments in the same order as labelNames
    histogram.labels(req.method, req.originalUrl, res.statusCode.toString()).observe(responseTime / 1000);
  });
  next();
};
module.exports = { requestDurationMiddleware };