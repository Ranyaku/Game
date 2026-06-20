import SkillNode from './SkillNode'
import skills from '../data/skill'

export default function SkillRow({ level, layout, unlockedSkills, selectedSkill, playerLevel, onSelect, onUnlock }) {
  const slots = layout[level] || [null, null, null, null]

  return (
    <div className="grid grid-cols-[80px_1fr_1fr_1fr_1fr] gap-4 items-center">
      <div className="text-gray-500 text-sm text-center">Lv.{level}</div>

      {slots.map((skillId, index) => {
        if (!skillId) return <div key={index} />

        const skillData = skills.find(s => s.id === skillId)
        const isUnlocked = unlockedSkills.includes(skillId)
        const isLocked = playerLevel < level && !isUnlocked
        const isSelected = selectedSkill === skillId

        return (
          <div key={index} className="flex justify-center">
            <SkillNode
              skillData={skillData}
              isUnlocked={isUnlocked}
              isLocked={isLocked}
              isSelected={isSelected}
              onClick={() => {
                onSelect(skillId)
                if (!isUnlocked && !isLocked) onUnlock(skillId)
              }}
            />
          </div>
        )
      })}
    </div>
  )
}