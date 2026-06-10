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

    const dotDmg = character.maxHp * 0.1
    const status = character.status

    if (status.type === "poison" || status.type === "burn" || status.type === "bleeding") {
        if (status.duration <= 0) {
            status.type = "" 
            status.duration = 0
        }else {
            status.duration -= 1
            character.hp = Math.max(0, character.hp - dotDmg)
        }
    }

    if (!isAlive(character)) {
        character.hp = 0
        return false
    }

    if (status.type === "stun"){
        if (status.duration <= 0) {
            status.type = "" 
            status.duration = 0
        }else {
            status.duration -= 1
        }
        return false
    }

    return true
}

function applySkill (attacker, defender, skill) {

    const applyStatus = Math.random() * 100 < skill.statusChance

    const finalDamage = calcDamage(attacker, defender, skill)
    defender.hp -= finalDamage

    if (applyStatus) {
        defender.status.type = skill.status
        defender.status.duration = skill.statusDuration
    }

    if (skill.debuff) {
        defender.debuffStatus.push({
            stat: skill.debuffStatus.stat,
            value: skill.debuffStatus.value,
            duration: skill.debuffStatus.duration,
        })
        defender[skill.debuffStatus.stat] = Math.round(
            defender[skill.debuffStatus.stat] * (1 - skill.debuffStatus.stat)
        )
    }

    return finalDamage
}