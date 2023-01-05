import connectDB from "../database/database.js";

const db = await connectDB();

export async function likePost(req, res) {
  const { id } = req.params;
  //const userId = res.locals.userId;
  const userId = 1; //pra testar até aprender a pegar o userId;

  try {
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
    const { rows } = await db.query('SELECT * FROM likes WHERE "postId" = $1', [id]);

    if (rows.length === 0) {
      return res.sendStatus(404);
    }

    if (Number(rows[0].userId) !== userId) {
      return res.sendStatus(401);
    }

    await db.query('DELETE FROM likes WHERE "postId" = $1', [id]);

    res.status(204).send("Post descurtido");
  } catch (err) {
    res.status(500).send(err.message);
  }
}
