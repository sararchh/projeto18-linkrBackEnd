import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../config/auth.js';

export const checkjwt = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: "Token não encontrado para realizar operação" });
    }

    const [, token] = authHeader.split(' '); // receber do header de forma desestruturada para pegar somente o token pois a posicao [0] é o bearer

    try {
        const decoded = await promisify(jwt.verify)(token, authConfig.secret); // Transformar uma função de callback modelo antigo para utilizar async await
        // Valida se o token é valido e procede com a aplicação

        req.userId = decoded.id;
        return next();

    } catch (err) {
        return res.status(401).json({ error: "Token inválido para realizar operação" });
    }

}