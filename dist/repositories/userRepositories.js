"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _databasejs = require('../database/database.js'); var _databasejs2 = _interopRequireDefault(_databasejs);
var _bcrypt = require('bcrypt'); var _bcrypt2 = _interopRequireDefault(_bcrypt);

const db = await _databasejs2.default.call(void 0, );

async function getByEmail(email) {
    const userExist = await db.query(`SELECT * FROM users WHERE email=$1;`, [email.toLowerCase()]);
    return userExist;
};

async function insertUser(data) {
    const { email, password, username, pictureUrl } = data;
    const passwordHash = _bcrypt2.default.hashSync(password, 12);
    try {
        await db.query(`INSERT INTO users (email, password, username, "pictureUrl") VALUES ($1, $2, $3, $4);`, [email.toLowerCase(), passwordHash, username, pictureUrl]);
    } catch (err) {
        console.log({insertUser:err});
    }
};

const userRepository = {
  getByEmail,
  insertUser,
};

exports. default = userRepository;
