import "dotenv/config";
import express from "express";
import pool from "./db/db.js";
import userRouter from "./routes/user.js";
import playerRouter from "./routes/player.js"

const app = express();

app.use(express.json());

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
app.use("/api/player", playerRouter)

app.listen(5000, () => {
  console.log("Server jalan");
});
