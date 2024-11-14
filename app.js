// Import dependencies
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config(); // Load environment variables

// MongoDB setup with Mongoose
var mongoose = require('mongoose');
const connectionString = process.env.MONGO_CON; // MongoDB Atlas connection string

// Connect to MongoDB Atlas
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

// Check MongoDB connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB Atlas');
});

// Initialize express app
var app = express();

// Import routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var pickRouter = require('./routes/pick');

// Configure view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Use imported routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/pick', pickRouter);

// Route for grid page
app.get('/grid', (req, res) => {
  const { rows, cols } = req.query;
  console.log(`Grid request - rows: ${rows}, cols: ${cols}`);
  res.render('grid', { title: 'Grid Display', rows, cols });
});

// Define the Plant model
const Plant = require('./models/plants');

// Plants route that retrieves data from MongoDB
app.get('/plants', async (req, res) => {
  try {
    const results = await Plant.find(); // Retrieve all plant entries from MongoDB
    res.render('plants', { title: 'Plant Collection', results });
  } catch (err) {
    console.error("Error fetching plants:", err);
    res.status(500).send("Error fetching plants");
  }
});

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
