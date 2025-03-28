import express from "express";
import { protect } from "../middlewares/auth.middlewares.js";
import { signup,login, logout } from "../controllers/authControl.controllers.js";
const router = express.Router();

router.post('/signup',signup );
router.post('/login',login );
router.post('/logout',protect, logout);
export default router;