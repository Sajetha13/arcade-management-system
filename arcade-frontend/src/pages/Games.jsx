import { useEffect, useState } from "react";
import API from "../api/api";
import GameAdminCard from "../components/GameAdminCard";

function Games() {

  const [games, setGames] = useState([]);
  const [newGame, setNewGame] = useState("");

  // TEMP role (later from login)
  const role = "USER";

  const fetchGames = () => {
    API.get("/game")
      .then(res => setGames(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const addGame = () => {

    API.post("/game", {
      name: newGame,
      active: true
    })
      .then(() => {
        setNewGame("");
        fetchGames();
      })
      .catch(err => console.log(err));
  };

  return (
    <div style={{padding:"20px"}}>

      <h2>Arcade Games</h2>

      {role === "ADMIN" && (
        <div style={{marginBottom:"20px"}}>

          <input
            placeholder="Game name"
            value={newGame}
            onChange={(e) => setNewGame(e.target.value)}
          />

          <button onClick={addGame} style={{marginLeft:"10px"}}>
            Add Game
          </button>

        </div>
      )}

      <div style={{display:"flex", flexWrap:"wrap"}}>

        {games.map(game => (
          <GameAdminCard
            key={game.id}
            game={game}
            role={role}
            refreshGames={fetchGames}
          />
        ))}

      </div>

    </div>
  );
}

export default Games;