import { Router } from "express";
import {
  getUsersLikesByPostId,
  likePost,
  unlikePost,
} from "../controllers/likesController.js";
import { checkjwt } from "../middlewares/checkjwt.js";

const likeRouter = Router();

likeRouter.post("/timeline/:id/like", [checkjwt], likePost); //falta a autenticação do token
likeRouter.post("/timeline/:id/unlike", [checkjwt], unlikePost);
likeRouter.get("/likes/:id", getUsersLikesByPostId);

export default likeRouter;
