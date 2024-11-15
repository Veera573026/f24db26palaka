require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

// MongoDB connection setup
mongoose.connect('mongodb://localhost:27017/your_db_name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log("Connection to DB succeeded"));

const app = express();

// Import route handlers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const resourceRouter = require('./routes/resource');  // Ensure this import is correct
const plantsRouter = require('./routes/plants');     // Correct import for plantsRouter

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware setup
app.use(logger('dev'));  // Logging requests
app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: false }));  // Parse URL-encoded data (from forms)
app.use(cookieParser());  // Parse cookies
app.use(express.static(path.join(__dirname, 'public')));  // Serve static files

// Route handlers
app.use('/', indexRouter);        // Home route
app.use('/users', usersRouter);   // Users routes
app.use('/resource', resourceRouter); // Resource-related routes
app.use('/plants', plantsRouter); // Plants-related routes

// Catch 404 errors and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
