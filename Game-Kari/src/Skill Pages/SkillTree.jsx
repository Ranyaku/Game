import { useState } from "react";
import SkillRow from "./SkillRow";
import skills from "../data/skill";
import { useEffect } from "react";
import axios from "axios";

const LEVELS = [30, 25, 20, 15, 10, 5, 1];

const SKILL_LAYOUT = {
  warrior: {
    1: ["thrust", "crossSlash", null, null],
    5: [null, null, "counter", null],
    10: [null, null, null, null],
    15: [null, null, null, null],
    20: [null, null, null, null],
    25: [null, null, null, null],
    30: [null, null, null, null],
  },
};

export default function SkillTree({ player, setPlayer, setGamePhase }) {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [learnedSkills, setLearnedSkills] = useState([]);
  const layout = SKILL_LAYOUT[player?.class] || SKILL_LAYOUT.warrior;
  const selectedSkillData = skills.find((s) => s.id === selectedSkill);

  function isUnlocked(skillId) {
    return learnedSkills.some((s) => s.skill_id === skillId);
  }

  async function handleUnlock(skillId) {
  try {
    await axios.post(
      `http://localhost:5000/api/player/${player.id}`,
      {
        skill_id: skillId,
        skill_level: 1,
      }
    );

    await fetchCharacters();
    await fetchSkills();
  } catch (err) {
    console.log(err);
  }
}

  async function handleRefund(skillId) {
    try {
        await axios.delete(
        `http://localhost:5000/api/player_skill/${player.id}/${skillId}`
        )

        fetchSkills();
        fetchCharacters();
    } catch (err) {
      console.log(err)
    }
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

  async function fetchCharacters() {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/player/${player.id}`
      );
      setPlayer(response.data[0]);
    } catch (err) {
      console.error("fetchCharacters error:", err);
    }
  }

  useEffect(() => {
    fetchSkills();
    fetchCharacters();
  }, [player.id]);

  return (
    <div className="min-h-screen bg-gray-950 text-white pb-24">
      <button
        onClick={() => setGamePhase("charPanel")}
        className="absolute top-4 left-4 px-4 py-2 cursor-pointer text-white rounded-lg  hover:bg-gray-700"
      >
        ← Back
      </button>
      {/* HEADER */}
      <div className="text-center py-8 border-b border-gray-800">
        <h1 className="text-3xl font-bold tracking-widest uppercase">
          Skill Tree
        </h1>
        <p className="text-gray-400 mt-1 capitalize">
          {player?.class || "warrior"}
        </p>
      </div>

      {/* GRID */}
      <div className="max-w-3xl mx-auto px-6 py-8 flex flex-col gap-8">
        {LEVELS.map((level) => (
          <SkillRow
            key={level}
            level={level}
            layout={layout}
            isUnlocked={isUnlocked}
            selectedSkill={selectedSkill}
            playerLevel={player?.level ?? 1}
            onSelect={setSelectedSkill}
            onUnlock={handleUnlock}
            onRefund={handleRefund}
          />
        ))}
      </div>

      {/* BOTTOM BAR */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 p-4">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <div className="flex gap-8">
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">
                Skill Points
              </p>
              <p className="text-2xl font-bold">{player?.skill_point ?? 0}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">
                Passive Points
              </p>
              <p className="text-2xl font-bold">{player?.passive_point ?? 0}</p>
            </div>
          </div>

          {selectedSkillData && (
            <div className="text-right">
              <p className="text-white font-bold">{selectedSkillData.name}</p>
              <p className="text-gray-400 text-sm">
                Cost: {selectedSkillData.cost} {selectedSkillData.resource}
              </p>
              <p className="text-gray-400 text-sm">
                Damage: {selectedSkillData.damageScale * 100}%
              </p>
            </div>
          )}

          {selectedSkill && (
            <div className="flex gap-3">
              {!isUnlocked(selectedSkill) &&
                player.level >= selectedSkillData?.requiredLevel &&
                player.skill_point > 0 && (
                  <button
                    className="cursor-pointer hover:bg-auto hover:opacity-80"
                    onClick={() => handleUnlock(selectedSkill)}
                  >
                    Learn
                  </button>
                )}

              {isUnlocked(selectedSkill) && (
                <button
                  className="cursor-pointer hover:bg-auto hover:opacity-80"
                  onClick={() => handleRefund(selectedSkill)}
                >
                  Refund
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
