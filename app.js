// Import dependencies
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var gridRouter = require('./routes/grid'); // Ensure this file exists
var pickRouter = require('./routes/pick');
var app = express();
const mongoose = require('mongoose');
const Plant = require("./models/plants"); // Import the Plant model

// MongoDB connection
mongoose.connect(process.env.MONGO_CON);
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Route setup
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/grid', gridRouter);
app.use('/pick', pickRouter);

// Route for grid page (for testing query parameters)
app.get('/grid', (req, res) => {
  const { rows, cols } = req.query;
  console.log(`Grid request - rows: ${rows}, cols: ${cols}`);
  res.render('grid', { title: 'Grid Display', rows, cols });
});

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

// Seed database function (only runs when `reseed` is set to true)
async function recreateDB() {
  await Plant.deleteMany(); // Clear existing plant records

  // Create new plant instances
  let instance1 = new Plant({ plant_name: "Cactus", plant_type: "Succulent", plant_age: 5 });
  let instance2 = new Plant({ plant_name: "Rose", plant_type: "Flower", plant_age: 2 });
  let instance3 = new Plant({ plant_name: "Oak Tree", plant_type: "Tree", plant_age: 50 });

  // Save instances to the database
  await instance1.save();
  await instance2.save();
  await instance3.save();

  console.log("Database seeded with plant data!");
}

// Reseed database (set to false to prevent reseeding)
let reseed = true;
if (reseed) {
  recreateDB();
}

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

mongoose.connect(process.env.MONGO_CON)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

module.exports = app;
