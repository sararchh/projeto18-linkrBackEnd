import connectDB from "../database/database.js"

const db = await connectDB();

export async function getPosts(req, res){

try{
    const posts = await db.query('SELECT * FROM posts ORDER BY "createdAt" DESC LIMIT 20;')

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
    const userId = 1
    /*const { authorization } = req.headers;
      const token = authorization?.replace("Bearer ", "");*/

try{
    
    await db.query('INSERT INTO posts (url, content, "userId") VALUES ($1, $2, $3);', [url, content, userId])
    res.send('post criado')
}catch (err) {
    res.status(500).send(err.message);
}
}


