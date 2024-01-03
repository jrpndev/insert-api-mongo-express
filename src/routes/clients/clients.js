import express from 'express';
import ModelController from '../../controllers/model.controller.js';
import authenticateToken from '../../middleware/validateToken.js';
import User from '../../models/users.js';

const router = express.Router();
const clientsController = new ModelController(User);
const prefix = "/clients";

router.get(`${prefix}`, authenticateToken, clientsController.list);
router.get(`${prefix}/getByField`, authenticateToken, clientsController.getByField);  // Adicionando a nova rota
router.get(`${prefix}/:id`, authenticateToken, clientsController.listById);
router.post(`${prefix}`, authenticateToken, clientsController.create);
router.patch(`${prefix}/:id`, authenticateToken, clientsController.update);
router.delete(`${prefix}/:id`, authenticateToken, clientsController.remove);

export default router;
