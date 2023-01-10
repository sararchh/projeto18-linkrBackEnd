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

    //para pegar os usuários que curtiram cada post
    const usersLiked = await db.query(
      'SELECT users."username", likes."postId" FROM users JOIN likes ON users.id = likes."userId";'
    );
    //para pegar a lista de trending
    const trendingList = await db.query("SELECT name FROM hashtags;");

    const dadosUser = await db.query('SELECT * FROM users WHERE id = $1;', [userId])

    const mainHashtagData = {
      posts: rows,
      likes: usersLiked.rows,
      dadosUser: dadosUser.rows,
      trendingList: trendingList.rows
    }
    

    res.status(201).send(mainHashtagData);
  } catch (err) {
    console.log(err);
  }
}
