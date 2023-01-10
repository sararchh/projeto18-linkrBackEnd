"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }var _bcrypt = require('bcrypt'); var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _userModelsjs = require('../models/userModels.js');
var _userRepositoriesjs = require('../repositories/userRepositories.js'); var _userRepositoriesjs2 = _interopRequireDefault(_userRepositoriesjs);

var _databasejs = require('../database/database.js'); var _databasejs2 = _interopRequireDefault(_databasejs);
var _jwtjs = require('../utils/jwt.js');

const db = await _databasejs2.default.call(void 0, );

 async function signUp(req, res) {
    const { email, password, username, pictureUrl } = req.body;
    const { error } = _userModelsjs.userSchema.validate({ email, password, username, pictureUrl }, { abortEarly: false });

    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    }

    try {
        const userExist = await _userRepositoriesjs2.default.getByEmail(email);

        if (userExist.rows.length > 0) {
            return res.status(409).send("E-mail ja cadastrado!");
        }

        await _userRepositoriesjs2.default.insertUser(req.body);
        res.status(201).send("Usuario cadastrado!");
    } catch (err) {
        res.sendStatus(500);
    }
} exports.signUp = signUp;

exports. default = {
    signIn: async (req, res) => {
        try {
            const { email, password } = req.body;
            const userExist = await _userRepositoriesjs2.default.getByEmail(email);

            if (!_optionalChain([userExist, 'optionalAccess', _ => _.rows, 'access', _2 => _2[0]])) {
                return res.status(422).send('Usuário não encontrado');
            }

            const validateToken = _bcrypt2.default.compareSync(password, _optionalChain([userExist, 'optionalAccess', _3 => _3.rows, 'access', _4 => _4[0], 'access', _5 => _5.password]));

            if (!validateToken) {
                return res.status(422).send('Senha inválida')
            }

           let token = _jwtjs.generateToken.call(void 0, {
                id: _optionalChain([userExist, 'optionalAccess', _6 => _6.rows, 'access', _7 => _7[0], 'optionalAccess', _8 => _8.id])
            });

            return res.status(200).send({token, user:_optionalChain([userExist, 'optionalAccess', _9 => _9.rows, 'access', _10 => _10[0], 'access', _11 => _11.pictureUrl]) });
        } catch (error) {
            return res.status(404).send(error)

        }
    }
}