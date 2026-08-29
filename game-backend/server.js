import express from "express";
import pool from "./db/db.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Backend hidup",
  });
});
