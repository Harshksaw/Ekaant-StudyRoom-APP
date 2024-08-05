const express = require('express');

const AuthRouter = require('./auth.routes');
const AdminRouter = require('./admin.routes');

const LibraryRouter = require('./library.routes');
const BookingRouter = require('./booking.routes');
const AppRouter = require('./app.routes');


const v1Router = express.Router();

// v1Router.use('/problems', ProblemRouter);




v1Router.use('/auth', AuthRouter);
v1Router.use('/admin', AdminRouter);
v1Router.use('/library', LibraryRouter);
v1Router.use('/booking', BookingRouter);
v1Router.use('/app', AppRouter);


module.exports = v1Router