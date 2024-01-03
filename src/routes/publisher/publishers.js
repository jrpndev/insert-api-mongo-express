import express from 'express';
import ModelController from '../../controllers/model.controller.js';
import authenticateToken from '../../middleware/validateToken.js';
import Publisher from "../../models/publisher.js";

const router = express.Router();
const publishersController = new ModelController(Publisher);
const prefix = "/publishers";

router.get(`${prefix}`, authenticateToken, publishersController.list);
router.get(`${prefix}/getByField`, authenticateToken, publishersController.getByField);  // Adicionando a nova rota
router.get(`${prefix}/:id`, authenticateToken, publishersController.listById);
router.post(`${prefix}`, authenticateToken, publishersController.create);
router.patch(`${prefix}/:id`, authenticateToken, publishersController.update);
router.delete(`${prefix}/:id`, authenticateToken, publishersController.remove);

export default router;
