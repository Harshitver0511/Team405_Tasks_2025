import { registerUser, loginUser, logoutUser, getProfile } from "../controllers/user.controller.js";
import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

// allow after login
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/profile").get(verifyJWT, getProfile)

export default router;
