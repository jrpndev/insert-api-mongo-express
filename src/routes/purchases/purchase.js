import express from 'express';
import ModelController from '../../controllers/model.controller.js';
import Purchases from '../../models/purchase.js';
import authenticateToken from '../../middleware/validateToken.js';

const router = express.Router();
const purchaseController = new ModelController(Purchases);
const prefix = "/purchases";

router.get(`${prefix}`, authenticateToken, purchaseController.list);
router.get(`${prefix}/getByField`, authenticateToken, purchaseController.getByField);
router.get(`${prefix}/:id`, authenticateToken, purchaseController.listById);
router.post(`${prefix}`, authenticateToken, purchaseController.create);
router.patch(`${prefix}/:id`, authenticateToken, purchaseController.update);
router.delete(`${prefix}/:id`, authenticateToken, purchaseController.remove);

export default router;
