import express from "express";
import AutorController from "../controllers/authors.handler.js";
import authenticateToken from "../middleware/validateToken.js";

const router = express.Router();

router
  .get("/authors", authenticateToken, AutorController.listAuthors)
  .get("/authors/:id", authenticateToken, AutorController.getAuthorById)
  .post("/authors", authenticateToken, AutorController.createAuthor)
  .put("/authors/:id", authenticateToken, AutorController.updateAuthor)
  .delete("/authors/:id", authenticateToken, AutorController.deleteAuthor)

export default router;   