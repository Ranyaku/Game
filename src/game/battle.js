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

function handleStatus(character) {

    const dotDmg = character.hp - character.maxHP * 0.1
    const status = character.status

    if (status.type === "poison" || "burn" || "bleeding") {
        const remove = status.duration === 0 ? status.type = "" : status.duration = - 1
        character.hp - dotDmg
    }

    if (!isAlive(character)) {
        character.hp = 0
        return false
    }

    if (statu.type === "stun"){
        const remove = status.duration === 0 ? status.type = "" : status.duration = - 1
        return false
    }

    return true
}