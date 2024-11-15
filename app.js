require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

// Import the Plant model
const Plant = require('./models/plants');

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

// Import routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const resourceRouter = require('./routes/resource');
const plantsRouter = require('./routes/plants');

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
app.use('/resource', resourceRouter);
app.use('/plants', plantsRouter);

// Error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// Reseed function to populate initial data
async function reseed() {
  try {
    // Remove all documents from the collection
    await Plant.deleteMany();

    // Add initial seed data
    const seedPlants = [
      { plant_name: 'Aloe Vera', plant_type: 'Succulent', plant_age: 2 },
      { plant_name: 'Bamboo Palm', plant_type: 'Palm', plant_age: 5 },
      { plant_name: 'Spider Plant', plant_type: 'Indoor', plant_age: 3 },
    ];

    // Insert seed data into the collection
    await Plant.insertMany(seedPlants);
    console.log('Database reseeded successfully with initial plants data.');
  } catch (err) {
    console.error('Error during reseeding:', err);
  }
}

// Conditionally run the reseed function if RESEED_DB is set to true
if (process.env.RESEED_DB === 'true') {
  reseed();
}

module.exports = app;
