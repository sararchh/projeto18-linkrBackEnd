"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _joi = require('joi'); var _joi2 = _interopRequireDefault(_joi);

 const userSchema = _joi2.default.object({
    email: _joi2.default.string().required().email().min(7).max(50),
    password: _joi2.default.string().required().min(6).max(50),
    username: _joi2.default.string().required().min(3).max(50),
    pictureUrl: _joi2.default.string().uri().required()
}); exports.userSchema = userSchema