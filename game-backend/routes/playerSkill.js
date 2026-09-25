import express from "express";
import pool from "../db/db.js";
const router = express.Router();

router.post("/:playerId", async (req, res) => {
  const { playerId } = req.params;
  const { skill_id, skill_level, is_equip } = req.body;

  try {
    const [result] = await pool.query(
      `INSERT INTO player_skill (
            player_id,
            skill_id,
            skill_level,
            is_equip
            )
            VALUES (
            ?,?,?,?
            )
            `,
      [playerId, skill_id, skill_level, is_equip],
    );

    res.status(201).json({ message: "Skill learned", id: result.insertId });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

router.get("/:playerId", async (req, res) => {
  const { playerId } = req.params;

  try {
    const [rows] = await pool.query(
      "SELECT * FROM player_skill WHERE player_id = ?",
      [playerId],
    );

    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

router.delete("/:playerId/:skillId", async (req, res) => {
  const { playerId, skillId } = req.params;

  try {
    const [rows] = await pool.query(
      `SELECT skill_level
       FROM player_skill
       WHERE player_id = ? AND skill_id = ?`,
      [playerId, skillId],
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Skill not found" });
    }

    if (rows[0].skill_level === 1) {
      await pool.query(
        `DELETE FROM player_skill
         WHERE player_id = ? AND skill_id = ?`,
        [playerId, skillId],
      );
    } else {
      await pool.query(
        `UPDATE player_skill
         SET skill_level = skill_level - 1
         WHERE player_id = ? AND skill_id = ?`,
        [playerId, skillId],
      );
    }

    await pool.query(
      `UPDATE player
       SET skill_point = skill_point + 1
       WHERE id = ?`,
      [playerId],
    );

    res.status(200).json({ message: "Skill berhasil direfund" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.put("/:playerId/:skillId", async (req, res) => {
    const {playerId, skillId} = req.params;
    const {slot_position} = req.body;

    try {
      const [rows] = await pool.query(
        `SELECT COUNT(*) as total
        FROM player_skill 
        WHERE player_id = ? 
        AND slot_position = ?`,
        [playerId, slot_position]
      )

      if (rows[0].total > 0){
        return res.status(400).json({ message: "Slot position has used" });

      }else {
        await pool.query(
        `UPDATE player_skill
        SET slot_position = ?
        WHERE player_id = ?
        AND skill_id = ?
        `,
        [slot_position, playerId, skillId]
      )
      res.status(200).json({
        message: "Successed Updating skill slot"
      })
      }

    } catch (err) {
    res.status(500).json({ error: err.message })
}
})

export default router;
