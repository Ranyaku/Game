import { useState } from 'react'
import axios from 'axios'

export default function Login({ setUser, setGamePhase }) {
    const [username, setUsername] = useState("")

    async function handleLogin() {
        try {
            const res = await axios.post(
            "http://localhost:5000/api/users",
            { username }
        )

        setUser(res.data.user)
        setGamePhase("charSelect")
        console.log(res.data)
        }  catch (err) {
            console.log(err)
    }
}

    return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-10 w-[420px] flex flex-col gap-6">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-white mb-2">⚔️ RPG</h1>
                <p className="text-gray-400">Masukan Usernamemu</p>
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-gray-400 text-sm">Nama User</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyDown= {(e) => {
                        if (e.key === "Enter"){
                            handleLogin();
                        }
                    }}
                    placeholder="Masukkan nama..."
                    className="w-full h-11 bg-gray-800 border border-gray-700 rounded-xl px-4 text-white outline-none focus:border-gray-500"
                />
            </div>

            <button
                onClick={handleLogin}
                disabled={username === ""}
                className="w-full h-11 rounded-xl bg-white text-gray-950 font-bold hover:opacity-90 transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
                Start
            </button>
        </div>
    </div>
    )
}