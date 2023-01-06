import { Router } from "express";
import { getUserById } from "../controllers/timelineControllers.js"
import { checkjwt } from "../middlewares/checkjwt.js";

const routes = Router();

routes.get("/user/:id", [checkjwt], getUserById);

export default routes;