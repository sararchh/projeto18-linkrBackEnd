import {Router} from "express";
import { createPost, getPosts } from "../controllers/posts.controllers.js";

const router = Router();

router.get("/timeline", getPosts)
router.post("/timeline", createPost)


export default router;