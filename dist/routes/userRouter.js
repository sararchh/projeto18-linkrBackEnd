"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _usersControllerjs = require('../controllers/usersController.js'); var _usersControllerjs2 = _interopRequireDefault(_usersControllerjs);

var _checkjwtjs = require('../middlewares/checkjwt.js');
var _userSearchjs = require('../middlewares/userSearch.js');

const userRouter = _express.Router.call(void 0, );

userRouter.get("/users/:name", [_userSearchjs.userSearch], _usersControllerjs2.default.findAll);
userRouter.get("/users/:id", [_checkjwtjs.checkjwt], _usersControllerjs.findUserById);

exports. default = userRouter;