import connectDB from "../database/database.js"

const db = await connectDB();

export async function getPosts(req, res){

try{
    const posts = await db.query('SELECT posts.*,posts.id AS "postId", users.* FROM posts JOIN users ON posts."userId" = users.id ORDER BY posts."createdAt" DESC LIMIT 20;')
    console.log(posts.rows)
    //para pegar os usuários que curtiram cada post
    const usersLiked = await db.query(
        'SELECT users."username", likes."postId" FROM users JOIN likes ON users.id = likes."userId"'
      );

    const mainData = {
        posts: posts.rows,
        likes: usersLiked.rows
    }  

    res.send(mainData)
}catch (err) {
    res.status(500).send(err.message);
}
}


export async function createPost(req, res){
    const {url, content} = req.body
    //const userId = req.userId
    const userId = 17
    console.log(userId)
    const dadosUser =  await db.query('SELECT * FROM users WHERE id = $1;', [userId])

    /*const { authorization } = req.headers;
      const token = authorization?.replace("Bearer ", "");*/

try{
    
    await db.query('INSERT INTO posts (url, content, "userId") VALUES ($1, $2, $3);', [url, content, userId])
    res.send('post criado')
}catch (err) {
    res.status(500).send(err.message);
}
}


export async function deletePost(req, res){
    const {id} = req.params
    try{
        await db.query('DELETE FROM posts WHERE id = $1;', [id])
        res.sendStatus(204)
    }catch (err) {
        res.status(500).send(err.message);
    }
}

