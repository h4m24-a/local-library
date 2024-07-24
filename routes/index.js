let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.redirect('/catalog');
});

module.exports = router;






/*
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', test: 'this is added from the index.js file' });
});



The views (templates) are stored in the /views directory (as specified in app.js) and are given the file extension .pug. 
The method Response.render() is used to render a specified template along with the values of named variables passed in an object,
and then send the result as a response. 

In the code above from /routes/index.js you can see how that route renders a response using the template "index" passing the template variable "title".
*/



/*The corresponding template for the above route is given below (index.pug). We'll talk more about the syntax later. 
All you need to know for now is that the title variable (with value 'Express') is inserted where specified in the template.
*/