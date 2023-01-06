import connectDB from "../database/database.js"

const db = await connectDB();

export async function getPosts(req, res){

try{
    const posts = await db.query('SELECT * FROM posts ORDER BY "createdAt" DESC LIMIT 20;')
    res.send(posts.rows)
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


