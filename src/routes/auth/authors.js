import express from "express";
import AuthController from "../../controllers/auth.handler.js";
import Authors from "../../models/author.js";

const router = express.Router();
const auth = new AuthController(Authors);

const prefix = "/authors";

router.post(`${prefix}/register`, auth.registerUser);
router.post(`${prefix}/login`, auth.loginUser);
router.post(`${prefix}/forgot-password`, auth.forgotPassword);
router.post(`${prefix}/compare-recovery-code`, auth.compareRecoveryCode);
router.post(`${prefix}/reset-password`, auth.resetPassword);
router.post(`${prefix}/refresh-token`, auth.refreshToken);
router.post(`${prefix}/me`, auth.getMyselfData);

export default router;
