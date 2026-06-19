import enemy from "./enemies"

const enemySkill = [
    // Slime
{
    id: "devour",
    name: "Devour",
    damageScale: 1.5,
    status: "",
    cooldown: 1,
    statusChance: 0,
    target: "single",
},

    // goblin
{
    id: "slash",
    name: "Slash",
    damageScale: 1.5,
    status: "",
    statusChance: 0,
    cooldown: 1,
    target: "single",
},

{
    id: "throw",
    name: "Throw",
    damageScale: 1.4,
    status: "",
    statusChance: 0,
    cooldown: 1,
    target: "single",
},

    // orc
    {
    id: "stomp",
    name: "Stomp",
    damageScale: 1.5,
    status: "",
    statusChance: 0,
    cooldown: 1,
    target: "aoe",
},

{
    id: "fear",
    name: "Fear",
    damageScale: 0,
    status: "weaken",
    debuffStatus: {
        stat: "def",
        value: 0.2,
        duration: 2,
    },

    cooldown: 3,
    statusChance: 100,
    target: "aoe",
},

{
    id: "splitInTwo",
    name: "Split in Two",
    damageScale: 2.4,
    status: "",

    statusChance: 0,
    cooldown: 3,
    target: "single",
},

{
    id: "callReinforcements",
    name: "Call Reinforcements",
    damageScale: 0,
    status: "",
    spawnUnit: {
        id: "goblin",
        value: 2,
    },

    cooldown: 5,
    statusChance: 0,
    target: "single",
},

{
    id: "unyieldingSpirit",
    name: "Unyielding Spirit",
    status: "heal",
    healAmmount: 0.2,
    specialBuff: {
        stat: "atk",
        value: 5,
    },

    usedOnce: true,
    statusChance: 0,
    target: "single",
},

]

export default enemySkill