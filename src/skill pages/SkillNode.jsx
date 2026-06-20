export default function SkillNode({ skillData, isUnlocked, isLocked, isSelected, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={isLocked}
      title={skillData?.name}
      className={`
        w-12 h-12 flex items-center justify-center
        border transition-all duration-200 text-xs font-bold
        ${isUnlocked
          ? "bg-white text-gray-950 border-white"
          : isLocked
            ? "opacity-20 border-gray-600 text-gray-400 cursor-not-allowed"
            : "border-gray-500 text-gray-300 hover:border-white cursor-pointer"
        }
        ${isSelected ? "ring-2 ring-red-700 ring-offset-2 ring-offset-gray-950" : ""}
      `}
    >
      {skillData?.name?.slice(0, 2).toUpperCase()}
    </button>
  )
}