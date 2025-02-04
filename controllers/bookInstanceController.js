const BookInstance = require("../models/bookinstance");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Book = require("../models/book");



// Display list of all BookInstances.
exports.bookinstance_list = asyncHandler(async (req, res, next) => {
  const allBookInstances = await BookInstance.find().populate("book").exec();

  res.render("bookinstance_list", {
    title: "Book Instance List",
    bookinstance_list: allBookInstances,
  });
});



// Display detail page for a specific BookInstance.
exports.bookinstance_detail = asyncHandler(async (req, res, next) => {
  const bookInstance = await BookInstance.findById(req.params.id)
    .populate("book")
    .exec();

  if (bookInstance === null) {
    // No results.
    const err = new Error("Book copy not found");
    err.status = 404;
    return next(err);
  }

  res.render("bookinstance_detail", {
    title: "Book:",
    bookinstance: bookInstance,
  });
});




// Display BookInstance create form on GET.
exports.bookinstance_create_get = asyncHandler(async (req, res, next) => {
  const allBooks = await Book.find({}, "title").sort({ title: 1 }).exec();

  // The controller gets a sorted list of all books (allBooks) and passes it via book_list to the view bookinstance_form.pug.
  // no book has been selected when we first display this form, so we don't pass the selected_book variable to render(). Because of this, selected_book will have a value of undefined in the template.
  res.render("bookinstance_form", {
    title: "Create BookInstance",
    book_list: allBooks,
  });
});





// Handle BookInstance create on POST.
exports.bookinstance_create_post = [
  // First we validate and sanitize the data
  body("book", "Book must be specified").trim().isLength({ min: 1 }).escape(),
  body("imprint", "Imprint must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("status").escape(),
  body("due_back", "Invalid date")
    .optional({ values: "falsy" })
    .isISO8601()
    .toDate(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a BookInstance object with escaped and trimmed data.
    const bookInstance = new BookInstance({
      book: req.body.book,
      imprint: req.body.imprint,
      status: req.body.status,
      due_back: req.body.due_back,
    });


    // If the data is invalid, we then re-display the form along with the data that was originally entered by the user and a list of error messages. 
    if (!errors.isEmpty()) {
      // There are errors.
      // Render form again with sanitized values and error messages.
      const allBooks = await Book.find({}, "title").sort({ title: 1 }).exec();

      res.render("bookinstance_form", {
        title: "Create BookInstance",
        book_list: allBooks,
        selected_book: bookInstance.book._id,
        errors: errors.array(),
        bookinstance: bookInstance,
      });
      return;
    } else {
      // Data from form is valid
      // If the data is valid, we save the new BookInstance record and redirect the user to the detail page.
      await bookInstance.save();
      res.redirect(bookInstance.url);
    }
  }),
];







// Display BookInstance delete form on GET.
exports.bookinstance_delete_get = asyncHandler(async (req, res, next) => {
  // Get details of book instance
  const bookInstance = await BookInstance.findById(req.params.id).exec();


  // Render the bookInstance_delete view
  res.render("bookInstance_delete", {
    title: "Delete Book Instance",
    bookinstance: bookInstance,
  });
});


// Handle BookInstance delete on POST.
exports.bookinstance_delete_post = asyncHandler(async (req, res, next) => {
  const bookInstance = await BookInstance.findById(req.body.bookinstanceid).exec();

  if (bookInstance === null) {
    // No results
    res.redirect("/catalog/bookinstances");
  } else {
    // Delete object and redirect to the list of book instances.
    await BookInstance.findByIdAndDelete(req.body.bookinstanceid);
    res.redirect("/catalog/bookinstances");
  }
});


// Display BookInstance update form on GET.
exports.bookinstance_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: BookInstance update GET");
});

// Handle bookinstance update on POST.
exports.bookinstance_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: BookInstance update POST");
});





/* Line: 16
The route controller function calls BookInstance.findById() with the ID of a specific book instance extracted from the URL (using the route), 
and accessed within the controller via the request parameters: req.params.id. 
It then calls populate() to get the details of the associated Book. 
If a matching BookInstance is not found an error is sent to the Express middleware.
Otherwise the returned data is rendered using the bookinstance_detail.pug view.
*/