import "dotenv/config";
import express from "express";
import pool from "./db/db.js";
import userRouter from "./routes/user.js";
import playerRouter from "./routes/player.js"
import playerSkill from "./routes/playerSkill.js"
import cors from 'cors'

const app = express();

app.use(express.json());
app.use(cors())

app.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1");

    res.json(rows);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: err.message,
    });
  }
});

app.use("/api/users", userRouter);
app.use("/api/player", playerRouter);
app.use("/api/player_skill", playerSkill)

app.listen(5000, () => {
  console.log("Server jalan");
});
