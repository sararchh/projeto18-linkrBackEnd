import { Router } from "express";
import { likePost, unlikePost } from "../controllers/likesController.js";


const likeRouter = Router();

likeRouter.post("/timeline/:id/like", likePost); //falta a autenticação do token
likeRouter.post("/timeline/:id/unlike", unlikePost);

export default likeRouter;