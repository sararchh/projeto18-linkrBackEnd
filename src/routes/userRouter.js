import express, { Router } from 'express';
import usersController from "../controllers/usersController.js";
import { userSearch } from "../middlewares/userSearch.js";

const userRouter = Router();

userRouter.get("/users/:name", [userSearch], usersController.findAll);

export default userRouter;