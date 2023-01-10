"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _userSearchModelsjs = require('../models/userSearchModels.js');

 const userSearch = async (req, res, next) => {
  let errorsSchema;
  await _userSearchModelsjs.userSearchModels.validateAsync(req.params, { abortEarly: false }).catch((errors) => {
    errorsSchema = errors;
  });

  if (errorsSchema) {
    return res.status(422).send({ message: errorsSchema });
  }

  next();
}; exports.userSearch = userSearch