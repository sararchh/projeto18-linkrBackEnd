import express, { Router } from 'express';
import usersController from "../controllers/usersController.js";
import { findUserById } from "../controllers/usersController.js";
import { checkjwt } from '../middlewares/checkjwt.js';
import { userSearch } from "../middlewares/userSearch.js";

const userRouter = Router();

userRouter.get("/users/:name", [userSearch], usersController.findAll);
userRouter.get("/users/:id", [checkjwt], findUserById);

export default userRouter;