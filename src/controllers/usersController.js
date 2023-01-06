import express from "express";

import connectDB from "../database/database.js";

const db = await connectDB();

export default {
  findAll: async (req, res) => {
    try {
      const { name } = req.params;
      const selectedUsers = await db.query(`SELECT * FROM users WHERE username LIKE '%' || $1 || '%'`, [name]);

      return res.status(200).send( selectedUsers.rows );
    } catch (error) {
      return res.sendStatus(404);
    }
  }
}

