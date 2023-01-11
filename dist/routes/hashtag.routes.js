"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _express = require('express');
var _hashtagControllerjs = require('../controllers/hashtagController.js');
var _checkjwtjs = require('../middlewares/checkjwt.js');

const router = _express.Router.call(void 0, );

router.get("/hashtag/:hashtag", [_checkjwtjs.checkjwt], _hashtagControllerjs.getPostsByHashtagName);

exports. default = router;
