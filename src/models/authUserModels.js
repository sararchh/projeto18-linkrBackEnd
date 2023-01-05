import joi from "joi"

export const authUserModels = joi.object({
    email: joi.string().required('Preencha seu email').email().min(7).max(50),
    password: joi.string().required('Preencha sua senha').min(6).max(50)
})