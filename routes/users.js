let express = require('express');  //  loads the express module and uses it to get an express.Router object.
let router = express.Router();


// Then it specifies a route on that object and lastly exports the router from the module (this is what allows the file to be imported into app.js).

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('<h1>this is /users endpoint!</h1>');
});

router.get('/cool',(req, res) => {
  res.send('<h1>You\'re so cool!</h1>')
})

module.exports = router;


/*
The route defines a callback that will be invoked whenever an HTTP GET request with the correct pattern is detected. 
The matching pattern is the route specified when the module is imported ('/users') plus whatever is defined in this file ('/'). 
In other words, this route will be used when a URL of /users/ is received.
*/


/*
The callback function has the third argument 'next', and is hence a middleware function rather than a simple route callback. 
While the code doesn't currently use the next argument, it may be useful in the future if you want to add multiple route handlers to the '/' route path.
*/