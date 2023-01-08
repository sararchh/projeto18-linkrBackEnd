import {Router} from "express";
import { createPost, deletePost, getPosts } from "../controllers/posts.controllers.js";
import {checkjwt} from "../middlewares/checkjwt.js"
const router = Router();

router.get("/timeline",  getPosts)
router.post("/timeline", createPost)
router.delete("/timeline/:id", deletePost)


export default router;