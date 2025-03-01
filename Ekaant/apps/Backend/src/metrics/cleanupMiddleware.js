const { activeRequestsGauge } = require('./activeRequests');


const cleanupMiddleware = (req, res, next) => {
  // Increase active requests gauge when a request starts
  activeRequestsGauge.inc();
  const startTime = Date.now();

  // When the request finishes, run our cleanup logic
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    console.log(`Request to ${req.method} ${req.path} took ${duration}ms`);
  
    // You can call your other metrics here as needed.
    // For example, you might do:
    // requestCountMiddleware(req, res, () => {});
    // requestDurationMiddleware(req, res, () => {});
    
    
    // Decrease active requests gauge when the request finishes
    activeRequestsGauge.dec();
  });
  
  next();
};
module.exports = { cleanupMiddleware };