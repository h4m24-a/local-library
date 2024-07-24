const mongoose = require("mongoose");
const {DateTime} = require("luxon");

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});



// Virtual for author's full name
AuthorSchema.virtual("name").get(function () {
  // To avoid errors in cases where an author does not have either a family name or first name
  // We want to make sure we handle the exception by returning an empty string for that case

  let fullname = "";                        // initialize a variable with an empty string.
  if (this.first_name && this.family_name) {    // if both of these are truthy:
    fullname = `${this.family_name}, ${this.first_name}`;  // This line constructs a string that combines the first name and family name.
  }

  return fullname;
});




// Virtual for author's URL
AuthorSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/author/${this._id}`;
});



// date of birth Date format
AuthorSchema.virtual("date_of_birth_formatted").get(function () {
  return this.date_of_birth ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED) : '';
});




// date of death Date format
AuthorSchema.virtual("date_of_death_formatted").get(function () {
  return this.date_of_death ? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED) : '';
});







// Export model
module.exports = mongoose.model("Author", AuthorSchema);







/*
.virtual('url'): This creates a virtual property named url on the author schema. Virtual properties are not persisted in the database, 
 but are computed on-the-fly when needed.


Regular functions have their own this context, whereas arrow functions do not. In this context, this refers to the instance of the author document.


The template literal (${this._id}) is used to dynamically insert the author's _id into the string.






The schema defines an author as having String SchemaTypes for the first and family names (required, with a maximum of 100 characters),
and Date fields for the dates of birth and death.


We've also declared a virtual for the AuthorSchema named "url" that returns the absolute URL required to get a particular instance of the model
 — we'll use the property in our templates whenever we need to get a link to a particular author.
*/