const  { NextFunction, Request, Response } = require('express');
const client = require('prom-client');
// Create a counter metric



const requestCounter = new client.Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'route', 'status_code']
});

export const requestCountMiddleware = (req, res, next) => {
    res.on('finish', () => {
        // Increment request counter
        requestCounter.inc({
            method: req.method,
            route: req.originalUrl,
            status_code: res.statusCode.toString()
        });
    });

    next();
};