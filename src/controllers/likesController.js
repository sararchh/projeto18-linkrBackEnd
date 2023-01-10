import connectDB from "../database/database.js";

const db = await connectDB();

export async function likePost(req, res) {
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
}

export async function unlikePost(req, res) {
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
}

export async function getUsersLikesByPostId(req, res) {
  const { id } = req.params;
  //const userId = res.locals.userId;
  const userId = 1; //pra testar até aprender a pegar o userId;

  try {
    const posts = await db.query(
      'SELECT posts.*,posts.id AS "postId", users.* FROM posts JOIN users ON posts."userId" = users.id ORDER BY posts."createdAt" DESC LIMIT 20;'
    );

    posts.rows.map(async (p) => {
      const usersThatLiked = await db.query(
        'SELECT users."username" FROM users JOIN likes ON users.id = likes."userId" WHERE likes."postId" = $1;',
        [p.postId]
      );

      if (usersThatLiked.rows.length === 0) {
        p.whoLiked = [];
      } else {
        p.whoLiked = usersThatLiked.rows;
      }
    });

    res.status(202).send(posts.rows);
  } catch (err) {
    console.log(err);
  }
}
