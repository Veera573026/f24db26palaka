const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();

const mongoose = require('mongoose');
const connectionString = process.env.MONGO_CON;

// Establish MongoDB connection with better error handling
mongoose.connect(connectionString, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(() => console.log("Connected to DB successfully"))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1); // Exit the application if the connection fails
  });

// Import passport and passport-local modules
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Import routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const resourceRouter = require('./routes/resource');
const galaxiesRouter = require('./routes/galaxies');
//const accountRouter = require('./routes/account'); // Add the account router for login/register/logout

// Import Account model for Passport
const Account = require('./models/account');
const { galaxy_create_Page } = require('./controllers/galaxies');

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

// Passport setup
passport.use(new LocalStrategy(Account.authenticate()));  // Use the local strategy for authentication
passport.serializeUser(Account.serializeUser());  // Serialize user
passport.deserializeUser(Account.deserializeUser());  // Deserialize user

// Session setup for Passport
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/resource', resourceRouter);
app.use('/galaxies', galaxiesRouter);
//app.use('/account', accountRouter);  // Ensure account route is used for login/register/logout

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

// Ensure the database is seeded only after the connection is established
mongoose.connection.once('open', async () => {
  console.log('MongoDB connection is open');

  // Database seeding logic
  let reseed = true; // Set to false to prevent reseeding
  if (reseed) {
    try {
      console.log('Reseeding database...');
      await Artifact.deleteMany();
      const instance1 = new Galaxy({ name: "MilkyWay", year: 1234 ,inventor: "Myself",distance:18000 , type:"ownone"});
      const instance2 = new Galaxy({ name: "MyWay", year: 1100 ,inventor: "My Friend",distance:1222 , type:"Selfless"});
      const instance3 = new Galaxy({ name: "Chocolate", year: 1400,inventor: "MeOwn",distance:1110 , type:"Selish"});
      await instance1.save();
      await instance2.save();
      await instance3.save();
      console.log("Database seeded with artifacts!");
    } catch (err) {
      console.error('Error while seeding database:', err);
    }
  }
});

module.exports = app;