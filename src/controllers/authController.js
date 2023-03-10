import bcrypt from 'bcrypt';

import { userSchema } from "../models/userModels.js";
import userRepository from "../repositories/userRepositories.js";

import connectDB from "../database/database.js";
import { generateToken } from "../utils/jwt.js";

//fsdfs
const db = await connectDB();

export async function signUp(req, res) {
    const { email, password, username, pictureUrl } = req.body;
    const { error } = userSchema.validate({ email, password, username, pictureUrl }, { abortEarly: false });

    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    }

    try {
        const userExist = await userRepository.getByEmail(email);

        if (userExist.rows.length > 0) {
            return res.status(409).send("E-mail ja cadastrado!");
        }

        await userRepository.insertUser(req.body);
        res.status(201).send("Usuario cadastrado!");
    } catch (err) {
        res.sendStatus(500);
    }
}

export default {
    signIn: async (req, res) => {
        try {
            const { email, password } = req.body;
            const userExist = await userRepository.getByEmail(email);

            if (!userExist?.rows[0]) {
                return res.status(422).send('Usuário não encontrado');
            }

            const validateToken = bcrypt.compareSync(password, userExist?.rows[0].password);

            if (!validateToken) {
                return res.status(422).send('Senha inválida')
            }

           let token = generateToken({
                id: userExist?.rows[0]?.id
            });

            return res.status(200).send({token, user:userExist?.rows[0].pictureUrl });
        } catch (error) {
            return res.status(404).send(error)

        }
    }
}