"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _express = require('express');




var _likesControllerjs = require('../controllers/likesController.js');
var _checkjwtjs = require('../middlewares/checkjwt.js');

const likeRouter = _express.Router.call(void 0, );

likeRouter.post("/timeline/:id/like", [_checkjwtjs.checkjwt], _likesControllerjs.likePost); //falta a autenticação do token
likeRouter.post("/timeline/:id/unlike", [_checkjwtjs.checkjwt], _likesControllerjs.unlikePost);
likeRouter.get("/likes/:id", _likesControllerjs.getUsersLikesByPostId);

exports. default = likeRouter;
