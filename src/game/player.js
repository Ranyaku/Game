function createPlayer(name) {

        const player = {
            id: Date.now(),
            name: name,
            class: "",
            level:1,
            exp: 0,
            expToNextLevel: 100,
            mode: "",
            
            atk: 10,
            hp: 100,
            def: 10,
            maxAtk: 10,
            maxHp: 100,
            maxDef: 10,
            
            statusPoints: 0,
            str: 1,
            int: 1,
            dex: 1,
            
            stamina: 100,
            mana: 100,
            maxStamina: 100,
            maxMana: 100,
            
            critChance: 5,
            critDamage: 50,
            evadeChance: 10,
            
            skillSlot: 8,
            status: {
                type: "",
                duration: 0 ,
            },
            debuffStatus: [],
            skill: [],
            inventory: [],
            
            skillPoints: 0,
            passivePoints: 0,
        }
    return player
}

export {createPlayer}