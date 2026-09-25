import express from "express";
import pool from "../db/db.js";
const router = express.Router();

router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const [rows] = await pool.query("SELECT * FROM player WHERE user_id = ?", [
      userId,
    ]);

    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

router.get("/:playerId", async (req, res) => {
  const { playerId } = req.params;

  try {
    const [rows] = await pool.query("SELECT * FROM player WHERE id = ?", [
      playerId,
    ]);
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

router.post("/", async (req, res) => {
  const { user_id, name } = req.body;

  const defaultPlayer = {
    class: "",
    level: 1,
    exp: 0,
    expToNextLevel: 100,
    mode: "",

    atk: 10,
    hp: 100,
    def: 10,
    maxAtk: 10,
    maxHp: 100,
    maxDef: 10,

    statusPoints: 0,
    str: 1,
    inteligence: 1,
    dex: 1,

    stamina: 100,
    mana: 100,
    maxStamina: 100,
    maxMana: 100,

    critChance: 5,
    critDamage: 50,
    evadeChance: 10,

    skillSlot: 8,

    skillPoints: 1,
    passivePoints: 0,
  };

  try {
    const [chars] = await pool.query(
      "SELECT COUNT(*) as total FROM player WHERE user_id = ?",
      [user_id],
    );
    if (chars[0].total >= 6) {
      return res.status(400).json({
        message: "Max Char for 1 Account is 6",
      });
    }

    const [result] = await pool.query(
      `INSERT INTO player
    (
        user_id,
        name,
        class,
        level,
        exp,
        next_level,
        mode,
        attack,
        health,
        defense,
        maxatk,
        maxhp,
        maxdef,
        status_point,
        strength,
        dexterity,
        inteligence,
        stamina,
        mana,
        maxstm,
        maxmana,
        cr,
        cdm,
        evade,
        skill_slot,
        skill_point,
        passive_point
    )
    VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ,?)`,
      [
        user_id,
        name,
        defaultPlayer.class,
        defaultPlayer.level,
        defaultPlayer.exp,
        defaultPlayer.expToNextLevel,
        defaultPlayer.mode,
        defaultPlayer.atk,
        defaultPlayer.hp,
        defaultPlayer.def,
        defaultPlayer.maxAtk,
        defaultPlayer.maxHp,
        defaultPlayer.maxDef,
        defaultPlayer.statusPoints,
        defaultPlayer.str,
        defaultPlayer.dex,
        defaultPlayer.inteligence,
        defaultPlayer.stamina,
        defaultPlayer.mana,
        defaultPlayer.maxStamina,
        defaultPlayer.maxMana,
        defaultPlayer.critChance,
        defaultPlayer.critDamage,
        defaultPlayer.evadeChance,
        defaultPlayer.skillSlot,
        defaultPlayer.skillPoints,
        defaultPlayer.passivePoints,
      ],
    );
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    attack,
    health,
    defense,
    maxatk,
    maxhp,
    maxdef,
    stamina,
    mana,
    maxstm,
    maxmana,
    cr,
    cdm,
    evade,
    strength,
    dexterity,
    inteligence,
    status_point,
    skill_point,
    passive_point,
  } = req.body;

  try {
    const [rows] = await pool.query(
      `UPDATE player 
            SET attack = ?, 
            health = ?, 
            defense = ?, 
            maxatk = ?, 
            maxhp = ?, 
            maxdef = ?, 
            stamina = ?, 
            mana = ?, 
            maxstm = ?, 
            maxmana = ?, 
            cr = ?, 
            cdm = ?, 
            evade = ?, 
            strength = ?, 
            dexterity = ?, 
            inteligence = ?,
            tatus_point = ?, 
            skill_point = ?, 
            passive_point= ? 
            WHERE id = ?`,
      [
        attack,
        health,
        defense,
        maxatk,
        maxhp,
        maxdef,
        stamina,
        mana,
        maxstm,
        maxmana,
        cr,
        cdm,
        evade,
        strength,
        dexterity,
        inteligence,
        status_point,
        skill_point,
        passive_point,
        id,
      ],
    );
  } catch (err) {
    res.status(200).json({ message: "Player updated" });
  }
  // return data player yang udah diupdate
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query(
      "DELETE FROM player_skill WHERE player_id = ?",
      [id],
    );
    await pool.query("DELETE FROM player WHERE id = ?", [id]);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

router.post("/:playerId", async (req, res) => {
  const { playerId } = req.params;
  const { skill_id, skill_level} = req.body;

  try {
    // cek skill point
    const [players] = await pool.query(
      "SELECT skill_point FROM player WHERE id = ?",
      [playerId],
    );

    if (players.length === 0) {
      return res.status(404).json({ message: "Player tidak ditemukan" });
    }

    if (players[0].skill_point <= 0) {
      return res.status(400).json({ message: "Skill point habis" });
    }

    // cek apakah skill sudah dimiliki
    const [skills] = await pool.query(
      "SELECT id FROM player_skill WHERE player_id = ? AND skill_id = ?",
      [playerId, skill_id],
    );

    if (skills.length > 0) {
      return res.status(400).json({ message: "Skill sudah dipelajari" });
    }

    // insert skill
    await pool.query(
      `INSERT INTO player_skill
       (player_id, skill_id, skill_level)
       VALUES (?, ?, ?)`,
      [playerId, skill_id, skill_level],
    );

    // kurangi skill point
    await pool.query(
      `UPDATE player
       SET skill_point = skill_point - 1
       WHERE id = ?`,
      [playerId],
    );

    res.status(201).json({
      message: "Skill berhasil dipelajari",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
