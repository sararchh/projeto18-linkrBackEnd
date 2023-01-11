import connectDB from "../database/database.js";

const db = await connectDB();

export async function follow(req, res){
    const {id} = req.params
    const userId = req.userId;

    try{
        await db.query('INSERT INTO follows ("userId", "userFollowedId") VALUES ($1, $2)', [userId, id])

        res.sendStatus(201);

    }catch(err){
        console.log(err);
    }

}

export async function unfollow(req,res){
    const {id} = req.params
    const userId = req.userId;

    try{
        await db.query('DELETE FROM follows WHERE "userId" = $1 AND "userFollowedId" = $2', [userId, id])

        res.sendStatus(201);

    }catch(err){
        console.log(err);
    }

}