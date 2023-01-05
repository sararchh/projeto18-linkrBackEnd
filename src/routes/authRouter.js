import { Router } from "express";
import { signUp } from "../controllers/authController.js";
import AuthController from "../controllers/authController.js";
import { authUser } from "../middlewares/authUser.js"

const routes = Router();

routes.post("/sign-up", signUp);
routes.post("/sign-in", [authUser], AuthController.signIn);

export default routes;