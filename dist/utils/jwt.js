"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _authjs = require('../config/auth.js'); var _authjs2 = _interopRequireDefault(_authjs);

 function generateToken(params){
  return _jsonwebtoken2.default.sign(params, _authjs2.default.secret, {expiresIn: _authjs2.default.expiresIn })
} exports.generateToken = generateToken;

 function generateRefreshToken(user){
  return _jsonwebtoken2.default.sign(JSON.stringify(user), _authjs2.default.refreshSecret)
} exports.generateRefreshToken = generateRefreshToken;

 function jwtVerify(refresh){
  return _jsonwebtoken2.default.verify(refresh, _authjs2.default.refreshSecret);
} exports.jwtVerify = jwtVerify;

