import { useState, useEffect } from 'react'
import { createEnemy } from '../game/enemy'
import { isAlive, handleStatus, takeTurn } from '../game/battle'
import { enemyAction } from '../game/enemy'

export default function Battle({ player, setPlayer, setGamePhase }) {
    const [enemies, setEnemies] = useState([])
    const [battleLog, setBattleLog] = useState([])
    const [turn, setTurn] = useState("player") 
    const [battleState, setBattleState] = useState("ongoing")  
    
    function spawnEnemy() {
        const random = Math.random() * 100

        if (battleState === "ongoing") {
            if (random <= 30) {
                setEnemies([createEnemy("slime")])
            }else if (random <= 80) {
                setEnemies([createEnemy("goblin")])
            }else {
                setEnemies([createEnemy("orc")])
            }
        }
    }

    useEffect(() => {
    spawnEnemy()
    }, [])
}