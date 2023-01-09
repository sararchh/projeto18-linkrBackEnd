import {Router} from "express";
import { getTrendingList } from "../controllers/hashtagController.js";


const router = Router();

router.get("/hashtag", getTrendingList)



export default router;