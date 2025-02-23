import { activeRequestsGauge } from './activeRequests.js';
import { requestCountMiddleware } from './requestCounts.js';
import { requestDurationMiddleware } from './requestDuration.js';

export const metricsMiddleware = (req, res, next) => {


  requestCountMiddleware(req, res, () => {});
  requestDurationMiddleware(req, res, () => {});
  

  next();
};