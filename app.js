var createError = require('http-errors'); 
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup (moved here from pick.js)
app.set('views', path.join(__dirname, 'views'));  // Ensure views path is correct
app.set('view engine', 'pug');  // Set Pug as the view engine

// Route for grid page
app.get('/grid', (req, res) => {
  let query = req.query;
  console.log(`rows: ${query.rows}`);
  console.log(`cols: ${query.cols}`);
  
  res.render('grid', { title: 'Grid Display', query: query });
});

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Use index and users routes
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Plants route
app.get('/plants', (req, res) => {
  const results = [
    { plant_name: "Cactus", plant_type: "Succulent", plant_age: 5 },
    { plant_name: "Rose", plant_type: "Flower", plant_age: 2 },
    { plant_name: "Oak Tree", plant_type: "Tree", plant_age: 50 }
  ];
  res.render('plants', { results: results });
});

// Import pick.js routes from the routes folder
var pickRouter = require('./routes/pick');  // Adjusted the path to './routes/pick'
app.use('/pick', pickRouter); // Prefix the pick.js routes with /pick

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
