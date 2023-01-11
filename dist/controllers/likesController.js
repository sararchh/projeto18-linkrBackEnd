"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _databasejs = require('../database/database.js'); var _databasejs2 = _interopRequireDefault(_databasejs);

const db = await _databasejs2.default.call(void 0, );

 async function likePost(req, res) {
  const { id } = req.params;
  const userId = req.userId;

  try {
    await db.query('UPDATE posts SET "isLiked" = true WHERE "id"=$1 ', [id]);

    //adicionar a linha na tabela likes
    const userLiked = await db.query(
      'SELECT * FROM likes WHERE "userId" = $1 AND "id"=$2',
      [userId, id]
    );

    if (userLiked.rows.length > 0) {
      return res.sendStatus(409);
    }

    await db.query('INSERT INTO likes ("postId", "userId") VALUES ($1, $2)', [
      id,
      userId,
    ]);

    //quem curtiu o post
    const usersThatLiked = await db.query(
      'SELECT ("username") FROM users JOIN likes ON users.id = likes."userId" WHERE "postId" = $1',
      [id]
    );

    const users = usersThatLiked.rows.map((u) => u.username);

    res.status(201).send(users);
  } catch (err) {
    res.status(500).send(err);
  }
} exports.likePost = likePost;

 async function unlikePost(req, res) {
  const { id } = req.params;
  const userId = req.userId;

  try {
    await db.query('UPDATE posts SET "isLiked" = false WHERE "id"=$1 ', [id]);

    //apagar a linha na tabela likes

    const { rows } = await db.query(
      'SELECT * FROM likes WHERE "postId" = $1 AND "userId" = $2',
      [id, userId]
    );

    if (rows.length === 0) {
      return res.sendStatus(404);
    }

    if (Number(rows[0].userId) !== userId) {
      return res.sendStatus(401);
    }

    await db.query('DELETE FROM likes WHERE "postId" = $1 AND "userId" = $2 ', [
      id,
      userId,
    ]);

    const usersThatLiked = await db.query(
      'SELECT ("username") FROM users JOIN likes ON users.id = likes."userId" WHERE "postId" = $1',
      [id]
    );

    const users = usersThatLiked.rows.map((u) => u.username);

    res.status(201).send(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
} exports.unlikePost = unlikePost;

 async function getUsersLikesByPostId(req, res) {
  const { id } = req.params;
  //const userId = res.locals.userId;
  const userId = 1; //pra testar até aprender a pegar o userId;

  try {
    
      const hashtagsDoPost = await db.query(
        'SELECT * FROM "postHashtags" WHERE "postId" = $1',
        [id]
      )


      if (usersThatLiked.rows.length === 0) {
        p.whoLiked = [];
      } else {
        p.whoLiked = usersThatLiked.rows;
      }


    res.status(202).send(hashtagsDoPost.rows);

  } catch (err) {
    console.log({getUsersLikesByPostId:err});
  }
} exports.getUsersLikesByPostId = getUsersLikesByPostId;
