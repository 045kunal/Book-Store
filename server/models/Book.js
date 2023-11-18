const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  isbn: {
    type: String,
    required: true,
  },
  authors: [
    {
      type: String,
      required: true,
    },
  ],
  imageLink: String,
  shortDescription: {
    type: String,
    required: true,
  },
  longDescription: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["added", "pending", "confirmed", "shipped", "delivered"],
    default: "added",
  },
  categories: [
    {
      type: String,
      required: true,
    },
  ],
  inventory: {
    type: Number,
    default: 0,
  },
  publisher: String,
  publication_date: Date,
  language: {
    type: String,
    required: true,
  },
  pages: {
    type: Number,
    min: 0,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
