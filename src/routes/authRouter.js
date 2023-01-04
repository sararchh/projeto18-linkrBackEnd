import { Router } from "express";
import { signUp } from "../controllers/authController.js";

const routes = Router();

routes.post("/sign-up", signUp);

export default routes;