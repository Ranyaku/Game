import StatRow from "./StatRow";

export default function StatPanel({ player, onAddStat }) {
  const canAllocate = player.statusPoints > 0;

  return (
    <div className="bg-gray-900 border border-gray-800 p-8 flex flex-col gap-8">
      <div className="flex justify-between items-center border-b border-gray-800 pb-4">
        <span className="text-gray-400 text-xs tracking-widest uppercase">
          Status Tuning
        </span>
        <div className="flex flex-col items-end">
          <span className="text-gray-500 text-xs uppercase tracking-widest">
            Points Remaining
          </span>
          <span className="text-3xl font-bold text-red-700">
            {player.statusPoints}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-7">
        <StatRow
          label="Strength"
          desc="Increases atk, hp, def, and stamina"
          value={player.str}
          canIncrease={canAllocate}
          onIncrease={() => onAddStat("str")}
        />
        <StatRow
          label="Dexterity"
          desc="Increases atk, stamina, evade, crit chance & damage"
          value={player.dex}
          canIncrease={canAllocate}
          onIncrease={() => onAddStat("dex")}
        />
        <StatRow
          label="Intelligence"
          desc="Increases atk, mana, crit chance & damage"
          value={player.int}
          canIncrease={canAllocate}
          onIncrease={() => onAddStat("int")}
        />
      </div>
    </div>
  );
}
