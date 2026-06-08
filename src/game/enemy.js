import enemies from "../data/enemies"
import enemySkills from "../data/enemySkills"

function createEnemy(id) {
    const enemy = enemies.find(s => s.id === id)
    return {
        ...enemy,
        skill: enemy.skill.map(skillId => ({
            id: skillId,
            currentCooldown: 0,
        }))   
    }
}

function enemyAction(enemy, player) {

    const avaiableSkills = enemy.skill.filter(s => s.currentCooldown === 0)
    const random = Math.random() * 100
    const randomSkills = avaiableSkills[
        Math.floor(Math.random() * avaiableSkills.length)
    ]

    if (avaiableSkills.length > 0 && random < 30) {
        const skillData = enemySkills.find(s => s.id === randomSkills.id)
        return { type: "skill", skill: skillData }
    }else {
        return { type: "attack", skill: null }
    }
}

export {createEnemy, enemyAction}