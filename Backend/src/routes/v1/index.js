const express = require('express');

const AuthRouter = require('./auth.routes');




const v1Router = express.Router();

// v1Router.use('/problems', ProblemRouter);




v1Router.use('/auth', AuthRouter);

module.exports = v1Router