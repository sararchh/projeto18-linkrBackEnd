"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _joi = require('joi'); var _joi2 = _interopRequireDefault(_joi);

 const userSearchModels = _joi2.default.object({
  name: _joi2.default.string().required('Nome obrigatório para pesquisa')
}); exports.userSearchModels = userSearchModels