const Book = require("../models/Book");

const bookController = {
  getAllBooks: async (ctx) => {
    try {
      const books = await Book.find();
      // const FAV_BOOK_COUNT = 10;
      // if(books.length > 0) {
      //     books = books.slice(0, FAV_BOOK_COUNT);
      // }
      ctx.body = books;
    } catch {
      ctx.status = 500;
      ctx.body = { error: "Internal Server Error" };
    }
  },
  getBookById: async (ctx) => {
    try {
      const book = await Book.findById(ctx.params.id);
      if (!book) {
        ctx.status = 404;
        ctx.body = { message: "Book not found" };
        return;
      }
      ctx.body = book;
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: "Internal Server Error" };
    }
  },
  addBook: async (ctx) => {
    try {
      const {
        title,
        isbn,
        publication_date,
        price,
        categories,
        publisher,
        language,
        pages,
        authors,
        inventory,
        status,
        shortDescription,
        longDescription,
        imageLink,
      } = ctx.request.body;
      // console.log("");
      // const authorsArray = authors.split(",").map((author) => author.trim());
      const authorsArray = Array.isArray(authors) ? authors : [authors];
      const categoriesArray = Array.isArray(categories)
        ? categories
        : [categories];
      // const categoriesArray = categories
      //   .split(",")
      //   .map((category) => category.trim());
      console.log("test");
      const book = new Book({
        title,
        isbn,
        publication_date,
        price,
        categories: categoriesArray,
        publisher,
        language,
        pages,
        authors: authorsArray,
        inventory,
        status,
        shortDescription,
        longDescription,
        imageLink,
      });
      await book.save();
      //   console.log("successfully uploaded....");
      ctx.body = { message: "Book Added Successfully", book };
    } catch (error) {
      (ctx.status = 500), (ctx.body = { error: "Internal Server Error" });
    }
  },
  updateBook: async (ctx) => {
    try {
      const {
        title,
        isbn,
        publication_date,
        price,
        categories,
        publisher,
        language,
        pages,
        authors,
        inventory,
        status,
        shortDescription,
        longDescription,
        imageLink,
      } = ctx.request.body;
      const updatedBook = await Book.findByIdAndUpdate(
        ctx.params.id,
        {
          title,
          isbn,
          publication_date,
          price,
          categories,
          publisher,
          language,
          pages,
          authors,
          inventory,
          status,
          shortDescription,
          longDescription,
          imageLink,
        },
        { new: true }
      );
      if (!updatedBook) {
        (ctx.status = 404), (ctx.body = { message: "Book not found" });
        return;
      }
      ctx.body = { message: "Book Updated successfully", updatedBook };
    } catch (error) {
      (ctx.status = 500), (ctx.body = { error: "Internal Server Error" });
    }
  },
  deleteBook: async (ctx) => {
    try {
      const deletedBook = await Book.findByIdAndDelete(ctx.params.id);
      if (!deletedBook) {
        (ctx.status = 404), (ctx.body = { message: "Book not found" });
        return;
      }
      console.log(deletedBook);
      ctx.body = { message: "Book deleted successfully", deletedBook };
    } catch (error) {
      (ctx.status = 500), (ctx.body = { error: "Internal Server Error" });
    }
  },
};

module.exports = bookController;
