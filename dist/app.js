"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);

var _databasejs = require('./database/database.js'); var _databasejs2 = _interopRequireDefault(_databasejs);
var _indexjs = require('./routes/index.js'); var _indexjs2 = _interopRequireDefault(_indexjs);
var _postsroutesjs = require('./routes/posts.routes.js'); var _postsroutesjs2 = _interopRequireDefault(_postsroutesjs);

const app = _express2.default.call(void 0, );
app.use(_express2.default.json());
app.use(_cors2.default.call(void 0, ));

app.use(_indexjs2.default);

 await _databasejs2.default.call(void 0, );

exports. default = app;