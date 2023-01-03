import { Router } from "express";
// import authRoutes from "./authRoutes.js";

const routes = Router();

// routes.use(authRoutes);

routes.get('/', (req, res, next) => {
  return res.status(200).json({ message: "Servidor em operacao" })
});

routes.get('*', (req, res, next) => {
  return res.status(200).json({ message: "Não existe requisicao para rota solicitada!" })
})

export default routes;