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
app.use('/plants', plantsRouter);

// Route handlers
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/resource', resourceRouter);


// Error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// Reseed function to populate initial data
async function seedDatabase() {
  try {
    const plantCount = await Plant.countDocuments();
    if (plantCount === 0) {
      const plants = [
        { plant_name: "Rose", plant_type: "Flower", plant_age: 2 },
        { plant_name: "Bamboo", plant_type: "Tree", plant_age: 5 },
        { plant_name: "Mint", plant_type: "Herb", plant_age: 1 }
      ];
      await Plant.insertMany(plants);
      console.log("Database seeded with initial plants data.");
    } else {
      console.log("Database already seeded.");
    }
  } catch (error) {
    console.error("Error seeding the database:", error);
  }
}

// Call the seed function after connecting to MongoDB
db.once('open', async () => {
  console.log("Connection to DB succeeded");
  await seedDatabase();
});

// Conditionally run the reseed function if RESEED_DB is set to true
if (process.env.RESEED_DB === 'true') {
  reseed();
}

module.exports = app;
