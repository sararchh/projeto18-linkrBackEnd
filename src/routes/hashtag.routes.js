import { Router } from "express";
import { getPostsByHashtagName } from "../controllers/hashtagController.js";
import {checkjwt} from "../middlewares/checkjwt.js"

const router = Router();

router.get("/hashtag/:hashtag",  getPostsByHashtagName);

//[checkjwt],

export default router;
