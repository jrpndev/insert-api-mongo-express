import express from 'express';
import ModelController from '../../controllers/model.controller.js';
import books from "../../models/books.js"
import authenticateToken from '../../middleware/validateToken.js';
import multer from 'multer';
const router = express.Router();
const bookController = new ModelController(books);
const prefix = "/books";

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 20 * 1024 * 1024 }
});


router.get(`${prefix}`, authenticateToken, bookController.list);
router.get(`${prefix}/getByField`, authenticateToken, bookController.getByField);
router.get(`${prefix}/:id`, authenticateToken, bookController.listById);
router.post(`${prefix}`, authenticateToken, bookController.create);
router.post(`${prefix}/uploadFile/:owner/:itemId/:type/:field`, authenticateToken, upload.single('file'), bookController.uploadFile);
router.patch(`${prefix}/:id`, authenticateToken, bookController.update);
router.delete(`${prefix}/:id`, authenticateToken, bookController.remove);

export default router;
