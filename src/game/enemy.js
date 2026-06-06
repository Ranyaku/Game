import enemies from "../data/enemies"
import enemySkills from "../data/enemySkills"

function createEnemy(id) {
    const enemy = enemies.find(s => s.id === id)
    return {...enemy}
}