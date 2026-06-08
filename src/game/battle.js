import { createPlayer } from "./player"
import { createEnemy } from "./enemy"

function isAlive(character) {
        return character.hp > 0
    }


function calcDamage(attacker, defender, skill = null) {

    const damage = skill ? attacker.atk * skill.damageScale : attacker.atk
    const finalDamage = Math.round(
    damage * (100 / (100+ defender.def))
    )

    return Math.max(1, finalDamage)
}