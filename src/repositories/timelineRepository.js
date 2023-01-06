import connectDB from "../database/database.js";

const db = await connectDB();

async function getPostByUserId(id) {
    const userTimeline = await db.query(`SELECT * FROM posts WHERE "userId"=$1;`, [id]);
    return userTimeline.rows;
};

async function getUserById(id) {
    const userInfo = await db.query(`SELECT * FROM users WHERE id=$1;`, [id]);
    return userInfo.rows[0];
}

const timelineRepository = {
    getPostByUserId,
    getUserById,
};

export default timelineRepository;
