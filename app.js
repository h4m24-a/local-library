let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
require('dotenv').config();
const mongoose = require("mongoose");


//  These modules/files contain code for handling particular sets of related "routes" (URL paths). 
let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let catalogRouter = require('./routes/catalog');
const compression = require('compression');
const helmet = require("helmet");



//  we create the app object using our imported express module,
let app = express();


// Use Helmet to protect against well known vulnerabilities
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "script-src": ["'self'", "code.jquery.com", "cdn.jsdelivr.net"],
    },
  }),
);




// Set up rate limiter: maximum of twenty requests per minute
const RateLimit = require("express-rate-limit");
const limiter = RateLimit({  
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20,                 // limits all requests to 20 per minute
});
// Apply rate limiter to all requests
app.use(limiter);





// Set up mongoose connection
mongoose.set("strictQuery", false);

const mongoDB = process.env.MONGODB_URI;

main().catch((err) => console.log('Error connecting to MongoDB:', err));

async function main() {
  try {
    await mongoose.connect(mongoDB);
    console.log('Connected to MongoDB successfully');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}


//  There are two parts to setting up the engine. First, we set the 'views' value to specify the folder where the templates will be stored (in this case the subfolder /views). 
//  Then we set the 'view engine' value to specify the template library (in this case "pug").
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');





// call app.use() to add the middleware libraries that we imported above into the request handling chain. For example, express.json() and express.urlencoded() are needed to populate req.body with the form fields.
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



// Compressing all routes
app.use(compression());


// After these libraries we also use the express.static middleware, which makes Express serve all the static files in the /public directory in the project root.
app.use(express.static(path.join(__dirname, 'public')));



// We add our (previously imported) route-handling code to the request handling chain. The imported code will define particular routes for the different parts of the site
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catalog', catalogRouter);    // Add catalog routes to middleware chain.



// adds handler methods for errors and HTTP 404 responses.

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



// The Express application object (app) is now fully configured. 
// The last step is to add it to the module exports (this is what allows it to be imported by /bin/www).
module.exports = app;
