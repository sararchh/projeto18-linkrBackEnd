import { Router } from "express";
import userRouter from "./userRouter.js";
import authRouter from "../routes/authRouter.js"
import likeRouter from "./likeRouter.js";
import postRouter from "./posts.routes.js"

const routes = Router();

routes.use(userRouter);
routes.use(authRouter);
routes.use(likeRouter);
routes.use(postRouter);

routes.get('/', (req, res, next) => {
  return res.status(200).json({ message: "Servidor em operacao" })
});

// routes.get('*', (req, res, next) => {
//   return res.status(200).json({ message: "Não existe requisicao para rota solicitada!" })
// })

export default routes;