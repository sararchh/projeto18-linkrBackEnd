"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }var _express = require('express');

var _authControllerjs = require('../controllers/authController.js'); var _authControllerjs2 = _interopRequireDefault(_authControllerjs);


var _authUserjs = require('../middlewares/authUser.js');

const routes = _express.Router.call(void 0, );

routes.post("/sign-in", [_authUserjs.authUser], _optionalChain([_authControllerjs2.default, 'optionalAccess', _ => _.signIn]));
routes.post("/sign-up", _authControllerjs.signUp);

exports. default = routes;