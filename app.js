// Import dependencies
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const pickRouter = require('./routes/pick');
const resourceRouter = require('./routes/resource');  // Ensure this import is correct

const app = express();

// Use the resource routes here
app.use('/resource', resourceRouter);  // All '/resource' routes are handled by resourceRouter

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Route handlers
app.use('/', indexRouter);  // The home route
app.use('/users', usersRouter);  // The users route
app.use('/pick', pickRouter);  // The pick route

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));  // Forward the 404 error to the error handler
});

// Error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};  // Show detailed error in development
  res.status(err.status || 500);  // If no status is set, default to 500
  res.render('error');  // Render the error page
});

// MongoDB connection setup
const mongoUri = process.env.MONGO_CON;  // Load MongoDB URI from the .env file
if (!mongoUri) {
  console.error("MongoDB connection string is missing in the .env file");
  process.exit(1);  // Exit the app if no MongoDB URI is found
} else {
  mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))  // Log successful connection
    .catch(error => {
      console.error("MongoDB connection error:", error);  // Log error if connection fails
      process.exit(1);  // Exit the app if connection fails
    });
}

module.exports = app;  // Export the app for use in the server (bin/www)
