import joi from "joi"

export const userSchema = joi.object({
    email: joi.string().required().email().min(7).max(50),
    password: joi.string().required().min(6).max(50),
    username: joi.string().required().min(3).max(50),
    pictureUrl: joi.string().uri().required()
})