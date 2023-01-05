import { userSchema } from "../models/userModels.js";
import userRepository from "../repositories/userRepositories.js";

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
        console.log(err);
        res.sendStatus(500);
    }
}