function addStatPoint(player, stat) {
    if (player.statusPoints <= 0) return player
        const updated = {...player} 
        const oldMaxHp = updated.maxHp
        const oldMaxAtk = updated.maxAtk
        const oldMaxDef = updated.maxDef
        const oldMaxMana = updated.maxMana
        const oldMaxStamina = updated.maxStamina

        if (stat === "str") {
            updated.str += 1
            updated.maxAtk += 1
            updated.maxHp += 5
            updated.maxDef += 2
            updated.maxStamina += 10
            updated.statusPoints -= 1
        }

        if (stat === "dex") {
            updated.dex += 1
            updated.maxAtk += 2
            updated.maxStamina += 10
            updated.critChance += updated.critChance * 0.05
            updated.critDamage += updated.critDamage * 0.05
            updated.evadeChance += updated.evadeChance * 0.05
            updated.statusPoints -= 1
        }

        if (stat === "int") {
            updated.int += 1
            updated.maxAtk += 2
            updated.maxMana += 10 + updated.maxMana * 0.01
            updated.critChance += updated.critChance * 0.05
            updated.critDamage += updated.critDamage * 0.05
            updated.statusPoints -= 1
        }

        updated.atk += (updated.maxAtk - oldMaxAtk)
        updated.hp += (updated.maxHp - oldMaxHp)
        updated.def += (updated.maxDef - oldMaxDef)
        updated.stamina += (updated.maxStamina - oldMaxStamina)
        updated.mana += (updated.maxMana - oldMaxMana)

        return updated
    }

    export {addStatPoint}
