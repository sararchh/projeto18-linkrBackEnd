import connectDB from "../database/database.js";

const db = await connectDB();

export async function getPostsByHashtagName(req, res) {
  const { hashtag } = req.params;

  const userId = req.userId;

  try {
    const { rows } = await db.query(
      'SELECT posts.*,posts.id AS "postId", users.* FROM posts JOIN users ON posts."userId" = users.id JOIN "postHashtags" ON posts.id = "postHashtags"."postId" JOIN hashtags ON hashtags.id = "postHashtags"."hashtagId" WHERE hashtags.name = $1 ORDER BY posts."createdAt" DESC LIMIT 20;',
      [hashtag]
    );



    if (rows.length === 0) {
      return res.sendStatus(404);
    }

    res.status(201).send(rows);
  } catch (err) {
    console.log(err);
  }
}
