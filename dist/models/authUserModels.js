"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _joi = require('joi'); var _joi2 = _interopRequireDefault(_joi);

 const authUserModels = _joi2.default.object({
    email: _joi2.default.string().required('Preencha seu email').email().min(7).max(50),
    password: _joi2.default.string().required('Preencha sua senha').min(6).max(50)
}); exports.authUserModels = authUserModels