const express = require("express");  // The module requires Express
const router = express.Router();  // create a Router object. The routes are all set up on the router,


//* The handler functions are all imported from the controller modules

// Require controller modules.
const book_controller = require("../controllers/bookController");
const author_controller = require("../controllers/authorController");
const genre_controller = require("../controllers/genreController");
const book_instance_controller = require("../controllers/bookInstanceController");



//! BOOK ROUTES ///

//*   The routes are defined either using .get() or .post() methods on the router. 
//* Routes that act on some specific resource (e.g. book) use path parameters to get the object id from the URL.



// GET catalog home page.
router.get("/", book_controller.index);

// GET request for creating a Book. NOTE This must come before routes that display Book (uses id).
router.get("/book/create", book_controller.book_create_get);


// POST request for creating Book.
router.post("/book/create", book_controller.book_create_post);


// GET request to delete Book.
router.get("/book/:id/delete", book_controller.book_delete_get);


// POST request to delete Book.
router.post("/book/:id/delete", book_controller.book_delete_post);


// GET request to update Book.
router.get("/book/:id/update", book_controller.book_update_get);


// POST request to update Book.
router.post("/book/:id/update", book_controller.book_update_post);


// GET request for one Book.
router.get("/book/:id", book_controller.book_detail);


// GET request for list of all Book items.
router.get("/books", book_controller.book_list);


//! AUTHOR ROUTES //

// GET request for creating Author. NOTE This must come before route for id (i.e. display author).
router.get("/author/create", author_controller.author_create_get);


// POST request for creating Author.
router.post("/author/create", author_controller.author_create_post);


// GET request to delete Author.
router.get("/author/:id/delete", author_controller.author_delete_get);


// POST request to delete Author.
router.post("/author/:id/delete", author_controller.author_delete_post);


// GET request to update Author.
router.get("/author/:id/update", author_controller.author_update_get);


// POST request to update Author.
router.post("/author/:id/update", author_controller.author_update_post);


// GET request for one Author.
router.get("/author/:id", author_controller.author_detail);


// GET request for list of all Authors.
router.get("/authors", author_controller.author_list);


//! GENRE ROUTES //

// GET request for creating a Genre. NOTE This must come before route that displays Genre (uses id).
router.get("/genre/create", genre_controller.genre_create_get);


//POST request for creating Genre.
router.post("/genre/create", genre_controller.genre_create_post);


// GET request to delete Genre.
router.get("/genre/:id/delete", genre_controller.genre_delete_get);


// POST request to delete Genre.
router.post("/genre/:id/delete", genre_controller.genre_delete_post);


// GET request to update Genre.
router.get("/genre/:id/update", genre_controller.genre_update_get);


// POST request to update Genre.
router.post("/genre/:id/update", genre_controller.genre_update_post);


// GET request for one Genre.
router.get("/genre/:id", genre_controller.genre_detail);


// GET request for list of all Genre.
router.get("/genres", genre_controller.genre_list);


//! BOOKINSTANCE ROUTES //

// GET request for creating a BookInstance. NOTE This must come before route that displays BookInstance (uses id).
router.get(
  "/bookinstance/create",
  book_instance_controller.bookinstance_create_get,
);


// POST request for creating BookInstance.
router.post(
  "/bookinstance/create",
  book_instance_controller.bookinstance_create_post,
);


// GET request to delete BookInstance.
router.get(
  "/bookinstance/:id/delete",
  book_instance_controller.bookinstance_delete_get,
);


// POST request to delete BookInstance.
router.post(
  "/bookinstance/:id/delete",
  book_instance_controller.bookinstance_delete_post,
);


// GET request to update BookInstance.
router.get(
  "/bookinstance/:id/update",
  book_instance_controller.bookinstance_update_get,
);


// POST request to update BookInstance.
router.post(
  "/bookinstance/:id/update",
  book_instance_controller.bookinstance_update_post,
);


// GET request for one BookInstance.
router.get("/bookinstance/:id", book_instance_controller.bookinstance_detail);


// GET request for list of all BookInstance.
router.get("/bookinstances", book_instance_controller.bookinstance_list);


module.exports = router;




/*
This setup allows the application to handle HTTP requests for managing books, authors, genres, and book instances, 
using the methods defined in their respective controllers.


The code creates routes in an Express application, specifies the type of HTTP request (GET or POST), 
and calls the corresponding controller function to handle the request.


This code defines routes for an Express application that manages a library catalog. 
The routes handle CRUD (Create, Read, Update, Delete) operations for four main entities: Books, Authors, Genres, and BookInstances. 
Each entity has its own set of routes to facilitate these operations. 
The code uses controller modules to define the logic for handling each route.
*/






/*
For each entity (Book, Author, Genre, BookInstance), the code defines routes that:

- Specify the URL pattern.
- Determine the type of HTTP request (GET or POST).
- Call the appropriate function from the respective controller to handle the request.




Route: /
Type of Request: GET
Controller Function: index from book_controller
*/