import express from "express";
import UserController from "../controllers/users.handler.js";
import authenticateToken from "../middleware/validateToken.js";
const router = express.Router();
router
    .get("/users/:userId/books", authenticateToken, UserController.getUserBooks)
    .get("/users/:userId/books/:bookId", authenticateToken, UserController.getBook)
    .post("/users/:userId/books", authenticateToken, UserController.createBook)
    .put("/users/:userId/books/:bookId", authenticateToken, UserController.updateBook)
    .delete("/users/:userId/books/:bookId", authenticateToken, UserController.deleteBook)
export default router;
