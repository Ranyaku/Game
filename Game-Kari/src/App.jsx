import { useState } from 'react'
import CharCreate from './pages/CreateChar'
import Battle from './pages/Battle'
import CharStatus from './Home/CharStatus'
import SkillTree from './Skill Pages/SkillTree'


export default function App() {
  const [player, setPlayer] = useState(null)
  const [currentEnemy, setCurrentEnemy] = useState(null)
  const [gamePhase, setGamePhase] = useState("charCreate")

  return (
    
    <div className="dark min-h-screen flex flex-col">
      {gamePhase === "charCreate" && 
      <CharCreate setPlayer={setPlayer} setGamePhase={setGamePhase} player={player}/>}
      {gamePhase === "charPanel" && 
      <CharStatus setPlayer={setPlayer} setGamePhase={setGamePhase} player={player}/>}
      {gamePhase === "skillTree" && 
      <SkillTree setPlayer={setPlayer} setGamePhase={setGamePhase} player={player}/>}
      {gamePhase === "charStatus" && 
      <addStatPoint />}
      {gamePhase === "battle" && 
      <Battle setPlayer={setPlayer} setGamePhase={setGamePhase} player={player} />}
    </div>
  )
}
