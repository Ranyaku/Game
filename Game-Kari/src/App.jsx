import { useState } from 'react'
import CharSelect from './pages/CharSelect'
import Battle from './pages/Battle'
import CharStatus from './Home/CharStatus'
import SkillTree from './Skill Pages/SkillTree'
import Login from './pages/Login'


export default function App() {
  const [player, setPlayer] = useState(null)
  const [currentEnemy, setCurrentEnemy] = useState(null)
  const [gamePhase, setGamePhase] = useState("login")
  const [user, setUser] = useState(null)

  return (
    
    <div className="dark min-h-screen flex flex-col">
      {gamePhase === "login" && 
      <Login setUser={setUser} setGamePhase={setGamePhase}/>}
      {gamePhase === "charSelect" && 
      <CharSelect setPlayer={setPlayer} setGamePhase={setGamePhase} user={user}/>}
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
