import connectDB from "../database/database.js";

const db = await connectDB();

export async function likePost(req, res) {
  const { id } = req.params;
  //const userId = res.locals.userId;
  const userId = 1; //pra testar até aprender a pegar o userId;

  try {
    await db.query('UPDATE posts SET "isLiked" = true WHERE "id"=$1 ', [id]);

    //adicionar a linha na tabela likes
    await db.query('INSERT INTO likes ("postId", "userId") VALUES ($1, $2)', [
      id,
      userId,
    ]);

    res.status(201).send("Post curtido");
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function unlikePost(req, res) {
  const { id } = req.params;

  //const userId = res.locals.userId;
  const userId = 1;

  try {
    await db.query('UPDATE posts SET "isLiked" = false WHERE "id"=$1 ', [id]);

    //apagar a linha na tabela likes

    const { rows } = await db.query('SELECT * FROM likes WHERE "postId" = $1', [
      id,
    ]);

    if (rows.length === 0) {
      return res.sendStatus(404);
    }

    if (Number(rows[0].userId) !== userId) {
      return res.sendStatus(401);
    }

    await db.query('DELETE FROM likes WHERE "postId" = $1', [id]);

    res.status(201).send("Post descurtido");
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getUsersLikesByPostId(req, res) {
  const { id } = req.params;
  //const userId = res.locals.userId;
  const userId = 1; //pra testar até aprender a pegar o userId;

  try {
    const usersThatLiked = await db.query(
      'SELECT ("userId") FROM likes WHERE "postId" = $1',
      [id]
    );

    console.log(usersThatLiked.rows[0].userId);

    let users = []

    for (let i = 0; i < usersThatLiked.rows; i++) {
      const {rows} = await db.query('SELECT "username" FROM users WHERE id = $1', [usersThatLiked.rows[i].userId])

      console.log(rows)
      users.push(rows)

    }

    console.log(users)

    res.status(202).send(users);
  } catch (err) {
    console.log(err);
  }
}
