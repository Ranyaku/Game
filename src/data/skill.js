const skills = [
    // Warrior
    {
        id: "thrust",
        class:"warrior",
        name: "Thrust",
        type: "active",
        cost: 15,
        resource: "stamina",
        requiredLevel: 1,
        skillLevel: 1,

        status: "bleeding",
        statusChance:30,
        statusDuration: 2,

        desc: "",
        damageScale: 1.5,
        maxLevel: 5,
        upgradeBonus: 0.15,
        target:"single",
    },

    {
        id: "counter",
        class: "warrior",
        name: "Counter Stance",
        type: "active",
        resource: "stamina",
        target: "single",

        cost: 25,
        requiredLevel: 1,
        skillLevel: 1,

        status: "counter",
        statusChance: 100,
        buffStatus: {
            duration: 2,
        },

        desc: "",
        damageScale: 1.1,
        maxLevel: 5,
        upgradeBonus: 0.1,
    },

    {
        id: "crossSlash",
        class: "warrior",
        name: "Cross Slash",
        type: "active",
        resource: "stamina",
        target: "single",

        cost: 15,
        requiredLevel: 1,
        skillLevel: 1,

        status: "",
        statusChance: 0,
        desc: "",
        damageScale: 1.7,
        maxLevel: 5,
        upgradeBonus: 0.2,
    },

    // Mage
    {
        id: "fireball",
        name: "Fire Ball",
        class: "mage",
        type: "active",
        resource: "mana",
        target: "single",

        cost: 20,
        requiredLevel: 1,
        skillLevel: 1,

        status: "burn",
        statusChance: 20,
        statusDuration: 2,
        
        desc: "",
        damageScale: 2.0,
        maxLevel: 5,
        upgradeBonus: 0.15,
    },

    {
        id: "iceSpike",
        name: "Ice Spike",
        class: "mage",
        type: "active",
        resource: "mana",
        target: "single",

        cost: 20,
        requiredLevel: 1,
        skillLevel: 1,

        status: "cold",
        statusChance: 25,
        debuffStatus: {
        stat: "def",
        value: 0.2,
        duration: 2,
        },

        desc: "",
        damageScale: 1.8,
        maxLevel: 5,
        upgradeBonus: 0.15,
    },

    {
        id: "lightningBolt",
        name: "Lightning Bolt",
        class: "mage",
        type: "active",
        resource: "mana",
        target: "single",

        cost: 20,
        requiredLevel: 1,
        skillLevel: 1,

        status: "electrified",
        statusChance: 25,
        debuffStatus: {
        stat: "atk",
        value: 0.2,
        duration: 1,
        },

        desc: "",
        damageScale: 2.0,
        maxLevel: 5,
        upgradeBonus: 0.15,
    },

    // Sorcerer
    {
        id: "chaosBlast",
        name: "Chaos Blast",
        class: "sorcerer",
        type: "active",
        resource: "mana",
        target: "single",

        cost: 20,
        requiredLevel: 1,
        skillLevel: 1,

        status: "poison",
        statusChance: 50,
        statusDuration: 2,

        desc: "",
        damageScale: 1.7,
        maxLevel: 5,
        upgradeBonus: 0.15,
    },

    {
        id: "skeletonWarrior",
        name: "Skeleton Warrior",
        class: "sorcerer",
        type: "active",
        resource: "mana",
        target: "single",

        cost: 25,
        requiredLevel: 1,
        skillLevel: 1,

        status: "",
        statusChance: 50,
        desc: "",
        spawnerHP: 0.8,
        damageScale: 1.1,
        maxLevel: 5,
        upgradeBonus: 0.11,
    },

    {
        id: "curseHand",
        name: "Curse Hand",
        class: "sorcerer",
        type: "active",
        resource: "mana",
        target: "single",

        cost: 25,
        requiredLevel: 1,
        skillLevel: 1,

        status: "weaken",
        statusChance: 95,
        debuffStatus: {
            stat: "def",
            value: 0.15,
            duration: 2,
        } ,
        debuffUpgrade: 0.05,

        desc: "",
        damageScale: 1.5,
        maxLevel: 5,
        upgradeBonus: 0.1,
    },

    // Rouge
    {
        id: "backStab",
        name: "Back Stab",
        class: "rouge",
        type: "active",
        resource: "stamina",
        target: "single",

        cost: 20,
        requiredLevel: 1,
        skillLevel: 1,

        status: "bleeding",
        statusChance: 40,
        statusDuration: 2,

        desc: "",
        damageScale: 1.5,
        maxLevel: 5,
        upgradeBonus: 0.2,
    },

    {
        id: "fullyCharged",
        name: "Fully Charged",
        class: "rouge",
        type: "active",
        resource: "stamina",
        target: "single",

        cost: 25,
        requiredLevel: 1,
        skillLevel: 1,

        status: "bleeding",
        statusChance: 20,
        statusDuration: 2,

        desc: "",
        damageScale: 2.0,
        maxLevel: 5,
        upgradeBonus: 0.2,
    },

    {
        id: "quickSlash",
        name: "Quick Slash",
        class: "rouge",
        type: "active",
        resource: "stamina",
        target: "single",

        cost: 25,
        requiredLevel: 1,
        skillLevel: 1,

        status: "bleeding",
        statusChance: 10,
        statusDuration: 2,

        desc: "",
        damageScale: 0.7,
        hitCount: 3,
        maxLevel: 5,
        upgradeBonus: 0.1,
    },
]

export default skills