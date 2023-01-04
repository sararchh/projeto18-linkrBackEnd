import joi from "joi"

export const userSearchModels = joi.object({
  name: joi.string().required('Nome obrigatório para pesquisa')
})