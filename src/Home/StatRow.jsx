export default function StatRow({ label, desc, value, onIncrease, onDecrease, canIncrease }) {
  return (
    <div className="flex justify-between items-end border-b border-gray-800 pb-3">
      <div className="flex flex-col">
        <span className="text-gray-400 text-xs uppercase tracking-widest">{label}</span>
        <p className="text-gray-500 text-xs mt-1 max-w-[220px]">{desc}</p>
      </div>

      <div className="flex items-center gap-5">
        <button
          onClick={onDecrease}
          className="w-7 h-7 border border-gray-700 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-500 transition cursor-pointer"
        >
          −
        </button>

        <span className="text-2xl font-bold min-w-[36px] text-center text-white">{value}</span>

        <button
          onClick={onIncrease}
          disabled={!canIncrease}
          className="w-7 h-7 border border-gray-700 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-500 transition cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed"
        >
          +
        </button>
      </div>
    </div>
  )
}