import { Router } from "express";
import { postNote } from "../controllers/note.controller.js";
import { getNotes } from "../controllers/note.controller.js";
import { deleteNote } from "../controllers/note.controller.js";
import { dummyAuth } from "../middlewares/dummyAuth.middleware.js";

const noteRouter = Router()

noteRouter.route("/post").post(postNote)
noteRouter.route("/").get(dummyAuth,getNotes)
noteRouter.route("/").delete(deleteNote)

export default noteRouter 