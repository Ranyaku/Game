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
    <div><h1>Select Char</h1></div>
)
}