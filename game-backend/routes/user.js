import express from "express";
import pool from "../db/db.js";
const router = express.Router();

router.post("/", async (req, res) => {
  const { username } = req.body;

  try {
    const [rows] = await pool.query("SELECT id FROM users WHERE username = ?", [
      username,
    ]);

    if (rows.length > 0) {
      return res.status(200).json({
        message: "Welcome Back",
        user: rows[0],
      });
    } else {
      const [result] = await pool.query(
        "INSERT INTO users (username) VALUES (?)",
        [username],
      );
      return res.status(201).json({
        message: "Account Created",
        userId: { id: result.insertId, username },
      });
    }
  } catch (err) {
        res.status(500).json({
        error: err.message,
    });
  }
});

export default router;
