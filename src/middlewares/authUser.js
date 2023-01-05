import { authUserModels } from '../models/authUserModels.js';

export const authUser = async (req, res, next) => {
  let errorsSchema;
  await authUserModels.validateAsync(req.body, { abortEarly: false }).catch((errors) => {
    errorsSchema = errors;
  });

  if (errorsSchema) {
    return res.status(422).send({ message: errorsSchema });
  }

  next();
}