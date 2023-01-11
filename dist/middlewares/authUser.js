"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _authUserModelsjs = require('../models/authUserModels.js');

 const authUser = async (req, res, next) => {
  let errorsSchema;
  await _authUserModelsjs.authUserModels.validateAsync(req.body, { abortEarly: false }).catch((errors) => {
    errorsSchema = errors;
  });

  if (errorsSchema) {
    return res.status(422).send({ message: errorsSchema });
  }

  next();
}; exports.authUser = authUser