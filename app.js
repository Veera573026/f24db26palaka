<<<<<<< HEAD
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy

passport.use(new LocalStrategy(function(username, password, done) {
  Account.findOne({ username: username }).then(function (user){
    if (err) { 
      return done(err);
    }
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    if (!user.validPassword(password)) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  }).catch(function(err){
    return done(err)
  })
}))


=======
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
>>>>>>> 7aed5c59f629a1cdde052b98f4532532eb01c877
require('dotenv').config();
const connectionString = process.env.MONGO_CON;
mongoose = require('mongoose');
var plant = require('./models/plants');

<<<<<<< HEAD
mongoose.connect(connectionString);
=======
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
>>>>>>> 7aed5c59f629a1cdde052b98f4532532eb01c877


<<<<<<< HEAD
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", function() {
console.log("Connected to DB succeeded.");
  
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var plantsRouter = require('./routes/plants');
var gridRouter = require('./routes/grid');
var pickRouter = require('./routes/pick');
var resourceRouter = require('./routes/resource');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(logger('dev'));
=======
// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware setup
app.use(logger('dev')); 
>>>>>>> 7aed5c59f629a1cdde052b98f4532532eb01c877
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

<<<<<<< HEAD

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/plants', plantsRouter);  
app.use('/grid', gridRouter);
app.use('/pick', pickRouter);
app.use('/resource',resourceRouter);


async function recreateDB() {
  // Delete everything
  await plant.deleteMany();
  let instance1 = new plant({ 
    plant_name: "Clove",
        plant_type: "Andhra Pradesh", 
        plant_age: 40
  });
  instance1.save().then(doc=>{
    console.log("First object saved")
  }).catch(err=>{
    console.error(err)
  })

  let instance2 = new plant({
    plant_name: "Star anise", 
        plant_type: "Himalayas", 
        plant_age: 60
  });
  instance2.save().then(doc=>{
    console.log("Second object saved")
  }).catch(err=>{
    console.error(err)
  })

  let instance3 = new plant({ 
    plant_name: "Caraway", 
        plant_type: "Rajasthan", 
        plant_age: 80  
  });
  instance3.save().then(doc=>{
    console.log("Third object saved")
  }).catch(err=>{
    console.error(err)
  })
}
let reseed = true;
if (reseed) { recreateDB(); }

//routes/resource.js
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var resourceRouter = require('./routes/resource');
app.use('/resource', resourceRouter);

// passport config
// Use the existing connection
// The Account model 
var Account =require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());
=======
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
>>>>>>> 7aed5c59f629a1cdde052b98f4532532eb01c877

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

<<<<<<< HEAD
// Export the app for use in other files
module.exports = app;
=======
module.exports = app;
>>>>>>> 7aed5c59f629a1cdde052b98f4532532eb01c877
