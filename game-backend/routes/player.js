import express from "express";
import pool from "../db/db.js";
const router = express.Router();

router.get("/user/:userId", async (req, res) => {
    const { userId } = req.params;

    try {
    const [rows] = await pool.query(
        "SELECT * FROM player WHERE user_id = ?",
        [userId]
    );

    res.status(200).json(rows)

    } catch (err) {
        res.status(500).json({
        error: err.message,
    });
    }
});

router.get("/:playerId", async (req, res) => {
    const {playerId} = req.params

    try {
        const [rows] = await pool.query(
            "SELECT * FROM player WHERE id = ?",
            [playerId]
        )   
        res.status(200).json(rows)
    }
    
    catch (err){
        res.status(500).json({
        error: err.message,
    });
    }
})

router.post("/", async (req, res) => {
    const {user_id, name} = req.body

    const defaultPlayer = {
            class: "",
            level:1,
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
            
            skillPoints: 3,
            passivePoints: 0,
        }

        try {
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
        defaultPlayer.passivePoints
    ]
);
    res.status(200).json(result)

}

    catch (err) {
        res.status(500).json({
        error: err.message,
    });
    }
})

export default router