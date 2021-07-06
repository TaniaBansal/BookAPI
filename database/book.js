const mongose = require("mongoose");


//Creating a book schema
const BookSchema = mongoose.Schema({
      ISBN: String,
      title: String,
      pubdate: String,
      language: String,
      numPage: Number,
      authors: [Number],
      publications : Number,
      category: [String],
});

// Create a book model
const BookModel = mongoose.model("books", BookSchema);

module.exports = BookModel;