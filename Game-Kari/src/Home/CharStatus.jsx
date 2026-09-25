import { useState } from "react";
import { addStatPoint } from "../game/stats";
import StatPanel from "../Home/StatPanel";
import axios from "axios";
import skills from "../data/skill";
import { useEffect } from "react";

export default function CharStatus({ player, setPlayer, setGamePhase }) {
  const [learnedSkills, setLearnedSkills] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showSkill, setShowSkill] = useState(false);

  const equippedSkills = learnedSkills.filter((s) => s.slot_position !== null);
  const unequippedSkills = learnedSkills.filter(
    (s) => s.slot_position === null
  );

  const slots = Array(8)
    .fill(null)
    .map((_, index) => {
      const position = index + 1;
      return equippedSkills.find((s) => s.slot_position === position) || null;
    });

  async function handleAddStat(stat) {
    const updated = addStatPoint(player, stat);
    setPlayer(updated);
    await axios.put(`http://localhost:5000/api/player/${updated.id}`, updated);
  }

  async function fetchSkills() {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/player_skill/${player.id}`
      );

      setLearnedSkills(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  // need improvement, drag & move or smth
  async function handleSlotClick(slot, index) {
    if (slot) {
        const skillId = slot.skill_id
        const res = await axios.put(
          `http://localhost:5000/api/player_skill/${player.id}/${skillId}`,
          {
            slot_position:null,
          }
        )

        fetchSkills();
        setShowSkill(false);
    } else {
        // slot kosong → buka picker
        setSelectedSlot(index + 1)
        setShowSkill(true)
    }
}

  async function equipSkill(skillId) {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/player_skill/${player.id}/${skillId}`,
        {
          slot_position: selectedSlot,
        }
      );

      fetchSkills();
      setShowSkill(false)
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchSkills();
  }, [player.id]);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* HEADER */}
      <div className="text-center py-8 border-b border-gray-800">
        <button
          onClick={() => setGamePhase("charSelect")}
          className="absolute top-4 left-4 px-4 py-2 cursor-pointer text-white rounded-lg hover:opacity-90"
        >
          ← Back
        </button>
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
                {player.health} / {player.maxhp}
              </p>
            </div>
            <div className="bg-gray-900 border border-gray-800 p-4">
              <p className="text-gray-500 text-xs uppercase mb-1">ATK</p>
              <p className="text-xl font-bold">{player.attack}</p>
            </div>
            <div className="bg-gray-900 border border-gray-800 p-4">
              <p className="text-gray-500 text-xs uppercase mb-1">DEF</p>
              <p className="text-xl font-bold">{player.defense}</p>
            </div>
            <div className="bg-gray-900 border border-gray-800 p-4">
              <p className="text-gray-500 text-xs uppercase mb-1">Mana</p>
              <p className="text-xl font-bold">
                {player.mana} / {player.maxmana}
              </p>
            </div>
            <div className="bg-gray-900 border border-gray-800 p-4">
              <p className="text-gray-500 text-xs uppercase mb-1">Stamina</p>
              <p className="text-xl font-bold">
                {player.stamina} / {player.maxstm}
              </p>
            </div>
            <div className="bg-gray-900 border border-gray-800 p-4">
              <p className="text-gray-500 text-xs uppercase mb-1">
                Crit / Evade
              </p>
              <p className="text-xl font-bold">
                {Number(player.cr).toFixed(1)}% /{" "}
                {Number(player.cdm).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT - STAT ALLOCATION */}
        <StatPanel player={player} onAddStat={handleAddStat} />
      </div>

      {/* SKILL SLOTS */}
      <div className="flex justify-center mt-16">
        <div className="grid grid-cols-8 gap-3">
          {slots.map((slot, index) => (
            <div
              key={index}
              onClick={() => {
                handleSlotClick(slot, index);
              }}
              className="bg-gray-800 border border-gray-700 rounded-lg h-12 w-12 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-700 transition"
            >
              {slot ? (
                <p className="text-white text-sm font-bold">
                  {skills.find((s) => s.id === slot.skill_id)?.name}
                </p>
              ) : (
                <p className="text-gray-500 text-2xl">+</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {showSkill && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 w-80 flex flex-col gap-4">
            <h2 className="text-white font-bold">Choose a Skill</h2>

            {unequippedSkills.length === 0 ? (
              <p className="text-gray-400 text-sm">
                you're not have any skills
              </p>
            ) : (
              unequippedSkills.map((s) => (
                <button
                  key={s.skill_id}
                  onClick={() => {
                    equipSkill(s.skill_id);
                  }}
                  className="text-left p-3 bg-gray-800 rounded-xl hover:bg-gray-700 transition cursor-pointer"
                >
                  <p className="text-white font-bold">
                    {skills.find((sk) => sk.id === s.skill_id)?.name}
                  </p>
                </button>
              ))
            )}

            <button
              onClick={() => setShowSkill(false)}
              className="text-gray-500 text-sm cursor-pointer"
            >
              Batal
            </button>
          </div>
        </div>
      )}

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
