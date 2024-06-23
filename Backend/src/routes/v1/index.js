const express = require('express');

const AuthRouter = require('./auth.routes');

const LibraryRouter = require('./library.routes');


const v1Router = express.Router();

// v1Router.use('/problems', ProblemRouter);




v1Router.use('/auth', AuthRouter);
v1Router.use('/library', LibraryRouter);

module.exports = v1Router