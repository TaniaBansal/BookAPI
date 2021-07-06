const mongoose = require("mongoose");

// Create a author schema
const AuthorSchema = mongoose.Schema({
        id: Number,
        name: String,
        books: [String],
});

// Create a Author model
const AuthorModel = mongoose.model(AuthorSchema);

module.exports = AuthorModel;