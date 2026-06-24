import { useState } from 'react'
import SkillRow from './SkillRow'
import skills from '../data/skill'

const LEVELS = [30, 25, 20, 15, 10, 5, 1]

const SKILL_LAYOUT = {
  warrior: {
    1:  ["thrust", "crossSlash", null, null],
    5:  [null, null, "counter", null],
    10: [null, null, null, null],
    15: [null, null, null, null],
    20: [null, null, null, null],
    25: [null, null, null, null],
    30: [null, null, null, null],
  }
}

export default function SkillTree({ player, setPlayer }) {
  const [selectedSkill, setSelectedSkill] = useState(null)
  const layout = SKILL_LAYOUT[player?.class] || SKILL_LAYOUT.warrior

  function isUnlocked(skillId) {
    return player.skill.some(s => s.id === skillId)
  } 
  
  function handleUnlock(skillId) {
    if (player.skillPoints <= 0) return
    if (isUnlocked(skillId)) return

    setPlayer({
      ...player,
      skill: [...player.skill, {id: skillId, skillLevel: 1}],
      skillPoints: player.skillPoints - 1
    })
  }

  const selectedSkillData = skills.find(s => s.id === selectedSkill)

  return (
    <div className="min-h-screen bg-gray-950 text-white pb-24">

      {/* HEADER */}
      <div className="text-center py-8 border-b border-gray-800">
        <h1 className="text-3xl font-bold tracking-widest uppercase">Skill Tree</h1>
        <p className="text-gray-400 mt-1 capitalize">{player?.class || "warrior"}</p>
      </div>

      {/* GRID */}
      <div className="max-w-3xl mx-auto px-6 py-8 flex flex-col gap-8">
        {LEVELS.map(level => (
          <SkillRow
            key={level}
            level={level}
            layout={layout}
            isUnlocked={isUnlocked}
            selectedSkill={selectedSkill}
            playerLevel={player?.level ?? 1}
            onSelect={setSelectedSkill}
            onUnlock={handleUnlock}
          />
        ))}
      </div>

      {/* BOTTOM BAR */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 p-4">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <div className="flex gap-8">
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Skill Points</p>
              <p className="text-2xl font-bold">{player?.skillPoints ?? 0}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Passive Points</p>
              <p className="text-2xl font-bold">{player?.passivePoints ?? 0}</p>
            </div>
          </div>

          {selectedSkillData && (
            <div className="text-right">
              <p className="text-white font-bold">{selectedSkillData.name}</p>
              <p className="text-gray-400 text-sm">Cost: {selectedSkillData.cost} {selectedSkillData.resource}</p>
              <p className="text-gray-400 text-sm">Damage: {selectedSkillData.damageScale * 100}%</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}