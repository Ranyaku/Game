async function addStatPoint(stat) {
    if (player.statusPoints <= 0) return player
        const updated = {...player} 
        const oldMaxHp = updated.maxhp
        const oldMaxAtk = updated.maxatk
        const oldMaxDef = updated.maxdef
        const oldMaxMana = updated.maxmana
        const oldMaxStamina = updated.maxstm

        if (stat === "str") {
            updated.strength += 1
            updated.maxatk += 1
            updated.maxhp += 5
            updated.maxdef += 2
            updated.maxstm += 10
            updated.status_point -= 1
        }

        if (stat === "dex") {
            updated.dexterity += 1
            updated.maxatk += 2
            updated.maxstm += 10
            updated.cr += updated.cr * 0.05
            updated.cdm += updated.cdm * 0.05
            updated.evade += updated.evade * 0.05
            updated.status_point -= 1
        }

        if (stat === "int") {
            updated.inteligence += 1
            updated.maxatk += 2
            updated.maxmana += 10 + updated.maxmana * 0.01
            updated.cr += updated.cr * 0.05
            updated.cdm += updated.cdm * 0.05
            updated.status_point -= 1
        }

        updated.attack += (updated.maxatk - oldMaxAtk)
        updated.health += (updated.maxhp - oldMaxHp)
        updated.defense += (updated.maxdef - oldMaxDef)
        updated.stamina += (updated.maxstm - oldMaxStamina)
        updated.mana += (updated.maxmana - oldMaxMana)

        return updated
    }

    export {addStatPoint}
