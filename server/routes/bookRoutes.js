const Router = require("koa-router");
const Book = require("../models/Book.js");
const bookController = require("../controllers/bookController.js");
const middlewares = require("../middlewares/auth.js");

const router = new Router();

router.get("/all-books", bookController.getAllBooks);
router.get("/book/:id", bookController.getBookById);
router.post("/upload-book/", bookController.addBook);
router.patch("/edit-book/:id", bookController.updateBook);
router.delete("/book/:id", bookController.deleteBook);

module.exports = router;
