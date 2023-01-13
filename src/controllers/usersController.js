import express from "express";

import connectDB from "../database/database.js";

const db = await connectDB();

export default {
  findAll: async (req, res) => {

    
  
    try {
      const { name } = req.params;
      const userId = req.userId

      //para pegar os usuários seguidos
      const followedUsers = await db.query(
        `SELECT users.*, users.id as "userId", COALESCE(follows."userId", 0) as "followsUserId", follows.id AS "followsId" FROM users JOIN follows ON follows."userFollowedId" = users.id WHERE follows."userId" = $1 AND users.username LIKE '%' || $2 || '%' `, [userId, name]) 

      //e pra pegar os não seguidos

      const noFollowedUsers = await db.query(
        `SELECT users.*, users.id as "userId", COALESCE(follows."userId", 0) as "followsUserId", follows.id AS "followsId" FROM users LEFT JOIN follows ON follows."userFollowedId" = users.id WHERE COALESCE(follows."userId", 0) != $1 AND users.username LIKE '%' || $2 || '%' `, [userId, name])

      const selectedUsers = followedUsers.rows.concat(noFollowedUsers.rows);
      
      //const selectedUsers = await db.query(`SELECT * FROM users WHERE username LIKE '%' || $1 || '%'`, [name]);

      return res.status(200).send({selectedUsers, userId: userId});
    } catch (error) {
      return res.sendStatus(404);
    }
  }
}

export async function findUserById(req, res) {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const userInfo = await db.query(`SELECT * FROM users WHERE id = $1;`, [id]);
    const userPosts = await db.query(`SELECT * FROM posts WHERE "userId" = $1;`, [id]);
    const likes = await db.query(`SELECT * FROM likes JOIN users ON likes."userId" = users.id`);


    const posts = await db.query(
      `SELECT posts.*,posts.id AS "postId", users.* FROM posts JOIN users ON posts."userId" = users.id 
      WHERE  posts."userId" = $1
      ORDER BY posts."createdAt" DESC LIMIT 20;`, [id]
    );


    //para pegar os usuários que curtiram cada post
    const usersLiked = await db.query(
      'SELECT users."username", likes."postId" FROM users JOIN likes ON users.id = likes."userId";'
    );

    
    const usersFollowed = await db.query(
      'SELECT "userFollowedId" FROM follows WHERE "userId" = $1;', [userId]
    )



    if (userPosts.length === 0) {
      userPosts = "User has no posts!"
    }


    const body = {
      username: userInfo.rows[0].username,
      pictureUrl: userInfo.rows[0].pictureUrl,
      user: userInfo.rows[0],
      likes: usersLiked.rows,
      posts: posts.rows,
      usersFollowed: usersFollowed.rows

    };

    return res.status(200).send(body);

  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
}