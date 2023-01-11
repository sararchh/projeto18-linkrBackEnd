"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _express = require('express');
var _postscontrollersjs = require('../controllers/posts.controllers.js');
var _checkjwtjs = require('../middlewares/checkjwt.js');
const router = _express.Router.call(void 0, );

router.get("/timeline", [_checkjwtjs.checkjwt], _postscontrollersjs.getPosts)
router.post("/timeline", [_checkjwtjs.checkjwt], _postscontrollersjs.createPost)
router.delete("/timeline/:id", [_checkjwtjs.checkjwt], _postscontrollersjs.deletePost)
router.post("/timeline/:id", [_checkjwtjs.checkjwt], _postscontrollersjs.editPost)


exports. default = router;