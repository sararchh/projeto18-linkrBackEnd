import { Router } from "express";
import userRouter from "./userRouter.js";
import authRouter from "../routes/authRouter.js"

const routes = Router();

routes.use(userRouter);
routes.use(authRouter);

routes.get('/', (req, res, next) => {
  return res.status(200).json({ message: "Servidor em operacao" })
});

routes.get('*', (req, res, next) => {
  return res.status(200).json({ message: "Não existe requisicao para rota solicitada!" })
})

export default routes;