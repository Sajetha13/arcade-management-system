import { useEffect, useState } from "react";
import API from "../api/api";
import MachineCard from "../components/MachineCard";
import GameCard from "../components/GameCard";

function Machines(){

  const [machines, setMachines] = useState([]);
  const [games, setGames] = useState([]);

  const fetchMachines = () => {
    API.get("/machines")
      .then(res => setMachines(res.data))
      .catch(err => console.log(err));
  };

  const fetchGames = () => {
    API.get("/game")
      .then(res => setGames(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchMachines();
    fetchGames();
  }, []);

  return (

    <div style={{padding:"20px"}}>

      <h2>Arcade Machines</h2>

      <div style={{display:"flex", flexWrap:"wrap"}}>

        {machines.map(machine => (
          <MachineCard
            key={machine.id}
            machine={machine}
          />
        ))}

      </div>


      {/* GAME CATALOG */}

      <h2 style={{marginTop:"40px"}}>Available Games</h2>

      <div style={{display:"flex", flexWrap:"wrap"}}>

        {games.map(game => (
          <GameCard
            key={game.id}
            game={game}
          />
        ))}

      </div>

    </div>

  );
}

export default Machines;