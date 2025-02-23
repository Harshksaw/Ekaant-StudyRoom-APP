// filepath: /Volumes/macdrive/harshx/Documents/GitHub/Ekaant/Backend/src/metrics/index.ts
import { requestCountMiddleware } from './requestCounts';
import { requestDurationMiddleware } from './requestDuration';


export const metricsMiddleware = (req, res, next) => {
    requestCountMiddleware(req, res, next);
    requestDurationMiddleware(req, res, next);
};