import {Router} from "express";
import { createPost, getPosts } from "../controllers/posts.controllers.js";
import {checkjwt} from "../middlewares/checkjwt.js"
const router = Router();

router.get("/timeline",  getPosts)
router.post("/timeline", createPost)


export default router;