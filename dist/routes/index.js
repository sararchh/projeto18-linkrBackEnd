"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _userRouterjs = require('./userRouter.js'); var _userRouterjs2 = _interopRequireDefault(_userRouterjs);
var _authRouterjs = require('../routes/authRouter.js'); var _authRouterjs2 = _interopRequireDefault(_authRouterjs);
var _likeRouterjs = require('./likeRouter.js'); var _likeRouterjs2 = _interopRequireDefault(_likeRouterjs);
var _postsroutesjs = require('./posts.routes.js'); var _postsroutesjs2 = _interopRequireDefault(_postsroutesjs);
var _hashtagroutesjs = require('./hashtag.routes.js'); var _hashtagroutesjs2 = _interopRequireDefault(_hashtagroutesjs);

const routes = _express.Router.call(void 0, );

routes.use(_userRouterjs2.default);
routes.use(_authRouterjs2.default);
routes.use(_likeRouterjs2.default);
routes.use(_postsroutesjs2.default);
routes.use(_hashtagroutesjs2.default);

routes.get('/', (req, res, next) => {
  return res.status(200).json({ message: "Servidor em operacao" })
});

routes.get('*', (req, res, next) => {
   return res.status(200).json({ message: "Não existe requisicao para rota solicitada!" })
 })

exports. default = routes;
