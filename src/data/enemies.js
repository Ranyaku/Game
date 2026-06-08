import enemySkill from "../data/enemySkills"

const enemy = [

    {
        id: "slime",
        name: "Slime",
        
        atk: 5,
        hp: 50,
        def: 10,
        expDrop: 50,
        maxAtk: 5,
        maxHp: 50,
        
        status: "",
        itemDrop: ["Slime Core"],
        skill: ["devour"],
    },

    {
        id: "goblin",
        name: "Goblin",
        
        atk: 10,
        hp: 50,
        def: 5,
        expDrop: 60,
        maxAtk: 10,
        maxHp: 50,
        
        status: "",
        itemDrop: ["Goblin Ear", "Goblin Sword", "Goblin Fang"],
        skill: ["slash", "throw"],
    },

    {
        id: "orc",
        name: "Orc",
        
        atk: 20,
        hp: 100,
        def: 30,
        expDrop: 200,
        maxAtk: 20,
        maxHp: 100,
        
        status: "",
        itemDrop: ["Orc Ear", "Orc Sword", "Orc Fang", "Orc Plate"],
        skill: ["stomp", "fear", "splitInTwo", "callReinforcements"],
        uniqueSkill: ["unyieldingSpirit"]
    },
]


function bossAction(enemy, player) {
    if (specialSkill) {
        return uniqueSkill()
    }else if (enemy.cooldown === 0) {
        return enemySkill()
    }else {
        return normalAttack()
    }
}

