import { addStatPoint } from "../game/stats";
import StatPanel from "../Home/StatPanel";

export default function CharStatus({ player, setPlayer, setGamePhase }) {
  function handleAddStat(stat) {
    const updated = addStatPoint(player, stat);
    setPlayer(updated);
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* HEADER */}
      <div className="text-center py-8 border-b border-gray-800">
        <h1 className="text-3xl font-bold tracking-widest uppercase">
          {player.name}
        </h1>
        <p className="text-gray-400 mt-1">Level {player.level}</p>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* LEFT - STAT READOUT */}
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-900 border border-gray-800 p-4">
              <p className="text-gray-500 text-xs uppercase mb-1">HP</p>
              <p className="text-xl font-bold">
                {player.hp} / {player.maxHp}
              </p>
            </div>
            <div className="bg-gray-900 border border-gray-800 p-4">
              <p className="text-gray-500 text-xs uppercase mb-1">ATK</p>
              <p className="text-xl font-bold">{player.atk}</p>
            </div>
            <div className="bg-gray-900 border border-gray-800 p-4">
              <p className="text-gray-500 text-xs uppercase mb-1">DEF</p>
              <p className="text-xl font-bold">{player.def}</p>
            </div>
            <div className="bg-gray-900 border border-gray-800 p-4">
              <p className="text-gray-500 text-xs uppercase mb-1">Mana</p>
              <p className="text-xl font-bold">
                {player.mana} / {player.maxMana}
              </p>
            </div>
            <div className="bg-gray-900 border border-gray-800 p-4">
              <p className="text-gray-500 text-xs uppercase mb-1">Stamina</p>
              <p className="text-xl font-bold">
                {player.stamina} / {player.maxStamina}
              </p>
            </div>
            <div className="bg-gray-900 border border-gray-800 p-4">
              <p className="text-gray-500 text-xs uppercase mb-1">
                Crit / Evade
              </p>
              <p className="text-xl font-bold">
                {player.critChance.toFixed(1)}% /{" "}
                {player.evadeChance.toFixed(1)}%
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT - STAT ALLOCATION */}
        <StatPanel player={player} onAddStat={handleAddStat} />
      </div>

      {/* NAVIGATION */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 p-4">
        <div className="max-w-3xl mx-auto flex gap-3">
          <button
            onClick={() => setGamePhase("skillTree")}
            className="flex-1 py-3 border border-gray-700 text-white font-bold hover:bg-gray-800 transition cursor-pointer"
          >
            Skill Tree
          </button>
          <button
            onClick={() => setGamePhase("battle")}
            className="flex-1 py-3 bg-white text-gray-950 font-bold hover:opacity-90 transition cursor-pointer"
          >
            Battle
          </button>
        </div>
      </div>
    </div>
  );
}
