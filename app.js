const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const plantsRouter = require('./routes/plants');  // Correct path

const app = express();

// Set Pug as the view engine
app.set('view engine', 'pug');  // Set Pug as the default view engine
app.set('views', path.join(__dirname, 'views'));  // Ensure the 'views' folder is being used for Pug templates

// Middleware setup
app.use(logger('dev'));
app.use(express.json());  // Ensure express.json() is enabled for POST requests
app.use(express.urlencoded({ extended: false }));  // For form submissions
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes setup
app.use('/plants', plantsRouter);  // Make sure you use the plantsRouter

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/your_db_name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = app;
