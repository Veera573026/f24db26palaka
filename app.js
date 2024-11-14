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

const app = express();

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
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/pick', pickRouter);

// Route for grid page with dynamic query parameters
app.get('/grid', (req, res) => {
  const query = req.query;
  console.log(`rows: ${query.rows}`);
  console.log(`cols: ${query.cols}`);
  res.render('grid', { title: 'Grid Display', query: query });
});

// Static route for displaying plants data
app.get('/plants', (req, res) => {
  const results = [
    { plant_name: "Cactus", plant_type: "Succulent", plant_age: 5 },
    { plant_name: "Rose", plant_type: "Flower", plant_age: 2 },
    { plant_name: "Oak Tree", plant_type: "Tree", plant_age: 50 }
  ];
  res.render('plants', { title: 'Plant Collection', results: results });
});

// Catch 404 and forward to error handler
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

// MongoDB connection
const mongoUri = process.env.MONGO_CON;
if (!mongoUri) {
  console.error("MongoDB connection string is missing in the .env file");
} else {
  mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(error => console.error("MongoDB connection error:", error));
}

module.exports = app;
