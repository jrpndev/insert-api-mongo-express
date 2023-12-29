import express from "express";
import AuthController from "../controllers/auth.handler.js";

const router = express.Router();

router.post("/register", AuthController.registerUser);
router.post("/login", AuthController.loginUser);
router.post("/forgot-password", AuthController.forgotPassword);
router.post("/compare-recovery-code", AuthController.compareRecoveryCode);
router.post("/reset-password", AuthController.resetPassword);

export default router;
