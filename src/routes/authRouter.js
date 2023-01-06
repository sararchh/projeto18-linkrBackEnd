import { Router } from "express";

import { signUp } from "../controllers/authController.js";
import AuthController from "../controllers/authController.js";

import { authUser } from "../middlewares/authUser.js"

const routes = Router();

routes.post("/sign-in", [authUser], AuthController?.signIn);
routes.post("/sign-up", signUp);

export default routes;