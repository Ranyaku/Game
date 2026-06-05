const skill = [
    {
        id: "thrust",
        name: "Thrust",
        type: "active",
        cost: 15,
        resource: "stamina",
        requiredLevel: 1,
        skillLevel: 1,
        status: "bleeding",
        statusChance:30,
        desc: "",
        damageScale: 1.5,
        maxLevel: 5,
        upgradeBonus: 0.1,
        target:"single",
        class:"warrior"
    }
]

const player = {
    id: Date.now(),
    name:"",
    class: "",
    level:1,
    exp: 0,
    expToNextLevel: 100,
    mode: "",

    atk: 10,
    hp: 100,
    maxAtk: 10,
    maxHp: 100,
    
    statusPoints: 0,
    str: 0,
    int: 0,
    dex: 0,

    stamina: 100,
    mana: 100,
    maxStamina: 100,
    maxMana: 100,

    critChance: 5,
    critDamage: 50,
    evadeChance: 10,

    skillSlot: 8,
    status:"",
    skill: [],
    inventory: [],

    skillPoints: 0,
    PassivePoints: 0,
}

const enemy = {
    id:name,
    name: "enemy",

    atk: maxAtk,
    hp: maxHp,
    def: 0,
    expDrop: 0,
    maxAtk: 0,
    maxHp: 0,

    status: "",
    itemDrop: [],
    skill: [],
}