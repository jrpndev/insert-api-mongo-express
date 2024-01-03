import express from 'express';
import ModelController from '../../controllers/model.controller.js';
import Authors from '../../models/author.js';
import authenticateToken from '../../middleware/validateToken.js';

const router = express.Router();
const authorsController = new ModelController(Authors);
const prefix = "/authors";

router.get(`${prefix}`, authenticateToken, authorsController.list);
router.get(`${prefix}/getByField`, authenticateToken, authorsController.getByField);  // Adicionando a nova rota
router.get(`${prefix}/:id`, authenticateToken, authorsController.listById);
router.post(`${prefix}`, authenticateToken, authorsController.create);
router.patch(`${prefix}/:id`, authenticateToken, authorsController.update);
router.delete(`${prefix}/:id`, authenticateToken, authorsController.remove);

export default router;
