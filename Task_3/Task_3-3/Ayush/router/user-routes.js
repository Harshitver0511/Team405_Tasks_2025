import { registerUser, loginUser, logoutUser, getProfile } from "../controles/user-controle.js";
import { Router } from "express";
import verifyJWT from "../middleware/auth.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/profile").get(verifyJWT, getProfile)

export default router;