import connectDB from "../database/database.js"


export async function getPosts(req, res){

try{
    const posts = await connectDB.query('SELECT * FROM posts;')
    res.send(posts.rows[0])
}catch (err) {
    res.status(500).send(err.message);
}
}
