import { useEffect, useState } from "react";
import axios, { create } from "axios";

export default function CharSelect({ user, setGamePhase, setPlayer }) {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [createChar, setCreateChar] = useState(false);
  const [difficulty, setDifficulty] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const slots = [...characters, ...Array(6 - characters.length).fill(null)]

  async function fetchCharacters() {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/player/user/${user.id}`
      );

      setCharacters(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function deleteChar(id) {
    try {
      await axios.delete(`http://localhost:5000/api/player/${id}`);
      await fetchCharacters();
    } catch (err) {
      console.log(err);
    }
  }

  async function handleChar() {
    try {
      await axios.post("http://localhost:5000/api/player", {
        user_id: user.id,
        name: name,
      });
      setCreateChar(false);
      setName("");
      await fetchCharacters();
    } catch (err) {
      setError(err.response.data.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCharacters();
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* HEADER */}
      <div className="text-center py-8 border-b border-gray-800">
        <h1 className="text-3xl font-bold tracking-widest uppercase">
          Character Select
        </h1>
        <p className="text-gray-400 mt-1">Welcome, {user.username}</p>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid grid-cols-3 gap-4">
          {slots.map((character, index) => (
            <div
              key={character?.id || index}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-6"
            >
              {character ? (
                <>
                  {/* CHARACTER ADA */}

                  <div className="flex flex-col gap-1">
                    <h2 className="text-xl font-bold">{character.name}</h2>

                    <p className="text-gray-400 text-sm">
                      Level {character.level} · {character.class || "No Class"}
                    </p>

                    <div className="flex gap-4 mt-2 text-xs text-gray-500">
                      <span>HP {character.health}</span>
                      <span>ATK {character.attack}</span>
                      <span>DEF {character.defense}</span>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-6">
                    <button
                      onClick={() => deleteChar(character.id)}
                      className="px-6 py-2 bg-white text-gray-950 font-bold hover:bg-red-500 hover:text-white transition cursor-pointer"
                    >
                      Delete
                    </button>

                    <button
                      onClick={() => {
                        setPlayer(character);
                        setGamePhase("charPanel");
                      }}
                      className="px-6 py-2 bg-white text-gray-950 font-bold hover:opacity-90 transition cursor-pointer"
                    >
                      Play
                    </button>
                  </div>
                </>
              ) : (
                /* SLOT KOSONG */

                <button
                  onClick={() => setCreateChar(true)}
                  className="w-full h-full flex items-center justify-center text-6xl text-gray-500 hover:bg-gray-800 hover:text-white transition cursor-pointer rounded-xl"
                >
                  +
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {createChar && (
        <div className="fixed inset-0 z-50  wd-64 grid grid-cols-1 bg-gray-950 flex items-center justify-center">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-10 flex flex-col gap-6">
            <div className="text-center">
              <h1 className="text-3xl gap-3 font-bold text-white mb-2">
                Create Character
              </h1>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-gray-400 text-sm">Character Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleChar();
                }
                }}
                placeholder="Masukkan nama..."
                className="w-full h-11 bg-gray-800 border border-gray-700 rounded-xl px-4 text-white outline-none focus:border-gray-500"
              />
            </div>

            <button
              onClick={handleChar}
              disabled={name === ""}
              className="w-full h-11 rounded-xl bg-white text-gray-950 font-bold hover:opacity-90 transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Create a Character
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
