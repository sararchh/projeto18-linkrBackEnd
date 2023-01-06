import { userSearchModels } from '../models/userSearchModels.js';

export const userSearch = async (req, res, next) => {
  let errorsSchema;
  await userSearchModels.validateAsync(req.params, { abortEarly: false }).catch((errors) => {
    errorsSchema = errors;
  });

  if (errorsSchema) {
    return res.status(422).send({ message: errorsSchema });
  }

  next();
}