"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);

var _databasejs = require('../database/database.js'); var _databasejs2 = _interopRequireDefault(_databasejs);

const db = await _databasejs2.default.call(void 0, );

exports. default = {
  findAll: async (req, res) => {
    try {
      const { name } = req.params;
      const selectedUsers = await db.query(`SELECT * FROM users WHERE username LIKE '%' || $1 || '%'`, [name]);

      return res.status(200).send(selectedUsers.rows);
    } catch (error) {
      return res.sendStatus(404);
    }
  }
}

 async function findUserById(req, res) {
  try {
    const { id } = req.params;
    const userInfo = await db.query(`SELECT * FROM users WHERE id $1;`, [id]);
    const userPosts = await db.query(`SELECT * FROM posts WHERE userId $1;`, [id]);

    if (userPosts.length === 0) {
      userPosts = "User has no posts!"
    }

    const body = {
      username: userInfo.rows[0].username,
      pictureUrl: userInfo.rows[0].pictureUrl,
      userPosts: [userPosts.rows]
    };

    return res.status(200).send(body);

  } catch (err) {
    return res.sendStatus(404);
  }
} exports.findUserById = findUserById;