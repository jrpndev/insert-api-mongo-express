import express from 'express';
import multer from 'multer';
import BookController from '../controllers/books.handler.js';
import authenticateToken from '../middleware/validateToken.js';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router
  .get('/books', authenticateToken, BookController.listBooks)
  .post('/books/image/:owner/:bookId', authenticateToken, upload.single('file'), BookController.uploadImage)
  .get('/books/search', authenticateToken, BookController.listBooksByPublisher)
  .get('/books/:id', authenticateToken, BookController.getBookById)
  .post('/books', authenticateToken, BookController.createBook)
  .put('/books/:id', authenticateToken, BookController.updateBook)
  .delete('/books/:id', authenticateToken, BookController.deleteBook);

export default router;
