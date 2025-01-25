import e from "express";
import { loginvalidation, signupvalidation } from "../Middlewares/AuthValidation.js";
import { login, signup } from "../Controllers/AuthController.js";

const router = e.Router();
router.post('/login',loginvalidation,login)
router.post('/signup',signupvalidation,signup)

export default router