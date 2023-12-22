import express from "express";
import BookController from "../controllers/books.handler.js";
import authenticateToken from "../middleware/validateToken.js";
const router = express.Router();

router
  .get("/books", authenticateToken, BookController.listBooks)
  .get("/books/search", authenticateToken, BookController.listBooksByPublisher)
  .get("/books/:id", authenticateToken, BookController.getBookById)
  .post("/books", authenticateToken, BookController.createBook)
  .put("/books/:id", authenticateToken, BookController.updateBook)
  .delete("/books/:id", authenticateToken, BookController.deleteBook);

export default router;
