require('dotenv').config();  // Load environment variables at the very top
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

// Import routers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var potionRouter = require('./routes/potion');  // Import potion router
var gridRouter = require('./routes/grid');
var pickRouter = require('./routes/pick');
var resourceRouter = require('./routes/resource'); // Import the resource router

// Initialize express app
var app = express();

// MongoDB connection setup
const connectionString = process.env.MONGO_CON;
console.log("MongoDB URI:", connectionString);

mongoose.connect(connectionString);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
  console.log('Connection to MongoDB Atlas succeeded');
});

// Model setup (assuming we are working with a model called Potion)
const Potion = require('./models/potion');  // Ensure correct casing and path for your model file

// Seed the database
async function recreateDB() {
  await Potion.deleteMany(); // Clear existing data

  // Create sample potion entries
  let potion1 = new Potion({ name: "Healing Potion", effect: "Restores health", potency: 60 });
  let potion2 = new Potion({ name: "Mana Potion", effect: "Restores mana", potency: 30 });
  let potion3 = new Potion({ name: "Stamina Potion", effect: "Restores stamina", potency: 50 });

  // Save sample potions to the database
  await potion1.save();
  await potion2.save();
  await potion3.save();

  console.log("Database seeded with sample potions");
}

// Determine whether to reseed the database on startup
let reseed = true;
db.once('open', async () => {
  if (reseed) { await recreateDB(); }
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

// Register routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/potion', potionRouter);  // Ensure this is correct
app.use('/grid', gridRouter);
app.use('/randomitem', pickRouter);
app.use('/resource', resourceRouter); // Use the resource router for the `/resource` endpoint

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  // Provide error message and stack trace in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
