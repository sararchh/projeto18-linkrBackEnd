import {Router} from "express";
import { createPost, deletePost, editPost, getPosts } from "../controllers/posts.controllers.js";
import {checkjwt} from "../middlewares/checkjwt.js"
const router = Router();

router.get("/timeline", [checkjwt], getPosts)
router.post("/timeline", [checkjwt], createPost)
router.delete("/timeline/:id", [checkjwt], deletePost)
router.post("/timeline/:id", [checkjwt], editPost)


export default router;