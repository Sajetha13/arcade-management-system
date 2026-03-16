/*import API from "../api/api";
import { useNavigate } from "react-router-dom";

function GameCard({ game, role, refreshGames }) {

  const navigate = useNavigate();

  const toggleStatus = (e) => {
    e.stopPropagation(); // prevent card click
    API.patch(`/game/${game.id}/status?active=${!game.active}`)
      .then(() => refreshGames())
      .catch(err => console.log(err));
  };

  const deleteGame = (e) => {
    e.stopPropagation(); // prevent card click
    API.delete(`/game/${game.id}`)
      .then(() => refreshGames())
      .catch(err => console.log(err));
  };

  return (
    <div
      onClick={() => navigate(`/leaderboard/${game.id}`)}
      style={{
        border: "1px solid gray",
        padding: "12px",
        margin: "10px",
        borderRadius: "8px",
        width: "200px",
        cursor: "pointer"
      }}
    >

      <h3>{game.name}</h3>

      <p>Status: {game.active ? "Active" : "Inactive"}</p>

      {role === "ADMIN" && (
        <div>

          <button onClick={toggleStatus}>
            {game.active ? "Disable" : "Enable"}
          </button>

          <button onClick={deleteGame} style={{ marginLeft: "10px" }}>
            Delete
          </button>

        </div>
      )}

    </div>
  );
}

export default GameCard;
*/

function GameCard({game}){

  return(

    <div style={{
      border:"1px solid #ccc",
      padding:"10px",
      borderRadius:"6px"
    }}>

      <h4>{game.name}</h4>

      <p>Status: {game.active ? "Active" : "Inactive"}</p>

    </div>

  );

}

export default GameCard;