import { useState } from 'react'
import axios from 'axios'

export default function Login({ setUser, setGamePhase }) {
    const [username, setUsername] = useState("")

    async function handleLogin() {
        // 1. POST ke /api/users dengan username
        // 2. simpan response.data.user ke setUser
        // 3. setGamePhase ke "charSelect"
    }

    return (
        // UI sama kayak CreateChar.jsx yang udah ada
    )
}