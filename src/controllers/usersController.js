import express from "express";

import connectDB from "../database/database.js";

const db = await connectDB();

export default {
  findAll: async (req, res) => {
    try {
      const { name } = req.params;
      const selectedUsers = await db.query(`SELECT * FROM users WHERE username LIKE '%' || $1 || '%'`, [name]);

      return res.status(200).send(selectedUsers.rows);
    } catch (error) {
      return res.sendStatus(404);
    }
  }
}

export async function findUserById(req, res) {
  try {
    const { id } = req.params;
    const userInfo = await db.query(`SELECT * FROM users WHERE id $1;`, [id]);
    const userPosts = await db.query(`SELECT * FROM posts WHERE userId $1;`, [id]);

    if (userPosts.length === 0) {
      userPosts = "User has no posts!"
    }

    const body = {
      username: userInfo.rows[0].username,
      pictureUrl: userInfo.rows[0].pictureUrl,
      userPosts: [userPosts.rows]
    };

    return res.status(200).send(body);

  } catch (err) {
    return res.sendStatus(404);
  }
}