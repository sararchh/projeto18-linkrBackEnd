import { Router } from "express";
import { checkjwt } from "../middlewares/checkjwt.js";
import { follow, unfollow } from "../controllers/followController.js";

const router = Router();

router.post("/follow/:id", [checkjwt], follow);
router.post("/unfollow/:id", [checkjwt], unfollow);


export default router;