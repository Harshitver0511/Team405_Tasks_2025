import { Router } from "express";
import { postUser } from "../controllers/user.controller.js";
import { getUsers } from "../controllers/user.controller.js";

const router = Router()

router.post("/post",postUser);
router.get("/get",getUsers);

export default router  