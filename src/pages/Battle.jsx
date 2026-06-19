import { useState, useEffect, act } from 'react'
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

function handlePlayerAction(action) {
    const canAction = handleStatus(player)

    if (canAction) {
        const finalDamage = takeTurn(player, enemies[0], action)
        setBattleLog([...battleLog, finalDamage])
    }

    if (!isAlive(enemies[0])) {
        return
    }

    setTurn("enemy")
}

function checkBattleState() {
    const allEnemiesDead = enemies.every(e => !isAlive(e))

    if (allEnemiesDead) {
        setBattleState("win")
    }

    if (!isAlive(player)) {
        setBattleState("defeat")
    }
}

function handleEnemyAction() {
    const canAction = handleStatus(enemies[0])

    if (canAction) {
        const action = enemyAction(enemies[0])
        const finalDamage = takeTurn(enemies[0], player, action)
        setBattleLog([...battleLog, '${player.name} attack ${enemies[0].name} for ${finalDamage} '])
    }

    if (!isAlive(player)) {
        return
    }

    setTurn("player")
}

    useEffect(() => {
        setTimeout(() => {
            if (turn === "enemy" && battleState === "ongoing") {
                handleEnemyAction()
            }
        }, 1000);
    }, [turn])
    
    useEffect (() => {
        spawnEnemy()
    }, [])

    
    return (
    <div className="min-h-screen bg-gray-950 flex flex-col p-6 max-w-3xl mx-auto w-full">
        
        {/* HP BARS */}
        <div className="flex justify-between gap-6 mb-6">
            <div className="flex-1">
                <p className="text-white font-bold text-sm mb-1">{player.name} <span className="text-gray-500">Lv.{player.level}</span></p>
                <div className="h-3 bg-gray-800 rounded-md overflow-hidden mb-1">
                    <div 
                        className="h-full bg-green-500" 
                        style={{ width: `${(player.hp / player.maxHp) * 100}%` }}
                    />
                </div>
                <p className="text-gray-400 text-xs">HP {player.hp} / {player.maxHp}</p>
            </div>

            {enemies[0] && (
                <div className="flex-1">
                    <p className="text-white font-bold text-sm mb-1 text-right">{enemies[0].name}</p>
                    <div className="h-3 bg-gray-800 rounded-md overflow-hidden mb-1">
                        <div 
                            className="h-full bg-red-500 ml-auto" 
                            style={{ width: `${(enemies[0].hp / enemies[0].maxHp) * 100}%` }}
                        />
                    </div>
                    <p className="text-gray-400 text-xs text-right">HP {enemies[0].hp} / {enemies[0].maxHp}</p>
                </div>
            )}
        </div>

        {/* BATTLE LOG */}
        <div className="bg-gray-900 rounded-2xl p-4 h-40 overflow-y-auto flex flex-col-reverse gap-2 mb-6">
            {battleLog.length === 0 ? (
                <p className="text-gray-500 text-sm">Battle dimulai!</p>
            ) : (
                battleLog.slice().reverse().map((log, index) => (
                    <p key={index} className="text-gray-300 text-sm">{log}</p>
                ))
            )}
        </div>

        {/* ACTION BUTTONS */}
        <div className="grid grid-cols-2 gap-3">
            <button
                onClick={() => handlePlayerAction({ type: "attack", skill: null })}
                disabled={turn !== "player" || battleState !== "ongoing"}
                className="py-3 rounded-xl bg-gray-800 text-white font-bold hover:bg-gray-700 transition cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            >
                Attack
            </button>

            <button
                disabled={turn !== "player" || battleState !== "ongoing"}
                className="py-3 rounded-xl bg-gray-800 text-white font-bold hover:bg-gray-700 transition cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            >
                Skill
            </button>
        </div>

        {/* WIN/LOSE OVERLAY */}
        {battleState === "win" && (
            <div className="mt-6 text-center">
                <h2 className="text-green-400 text-2xl font-bold">Victory!</h2>
            </div>
        )}
        {battleState === "lose" && (
            <div className="mt-6 text-center">
                <h2 className="text-red-400 text-2xl font-bold">Defeat...</h2>
            </div>
        )}
    </div>
)
}