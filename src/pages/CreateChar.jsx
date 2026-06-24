import { useState } from 'react'
import createPlayer from '../game/player'

export default function CharCreate({ setPlayer, setGamePhase }) {
    const [name, setName] = useState("")

    function handleStart() {
        if (name === "") {
            return false
        }

        const charName = createPlayer(name)
        setPlayer(charName)
        setGamePhase("charPanel")
    }

    return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-10 w-[420px] flex flex-col gap-6">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-white mb-2">⚔️ RPG</h1>
                <p className="text-gray-400">Masukkan nama karaktermu</p>
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-gray-400 text-sm">Nama Karakter</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Masukkan nama..."
                    className="w-full h-11 bg-gray-800 border border-gray-700 rounded-xl px-4 text-white outline-none focus:border-gray-500"
                />
            </div>

            <button
                onClick={handleStart}
                disabled={name === ""}
                className="w-full h-11 rounded-xl bg-white text-gray-950 font-bold hover:opacity-90 transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
                Mulai Petualangan
            </button>
        </div>
    </div>
)
}