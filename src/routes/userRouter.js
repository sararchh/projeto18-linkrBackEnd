import express, { Router } from 'express';
import usersController from "../controllers/usersController.js";
import { findUserById } from "../controllers/usersController.js";
import { checkjwt } from '../middlewares/checkjwt.js';
import { userSearch } from "../middlewares/userSearch.js";

const userRouter = Router();

userRouter.get("/users/:name", [checkjwt], [userSearch], usersController.findAll);

userRouter.get("/users/post/:id", [checkjwt], findUserById);

export default userRouter;