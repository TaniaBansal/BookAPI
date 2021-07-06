const mongoose = require("mongoose");

// Create a publication schema
const PublicationSchema = mongoose.Schema({
       id: Number,
       name: String,
       books:[String],
});

// Create a publication model
const PublicationModel = mongoose.model(PublicationSchema);

module.exports = PublicationModel;