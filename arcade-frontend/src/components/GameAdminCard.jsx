import API from "../api/api";

function GameAdminCard({ game, refreshGames }) {

  const toggleStatus = () => {
    API.patch(`/game/${game.id}/status?active=${!game.active}`)
      .then(() => refreshGames())
      .catch(err => console.log(err));
  };

  const deleteGame = () => {
    API.delete(`/game/${game.id}`)
      .then(() => refreshGames())
      .catch(err => console.log(err));
  };

  return (

    <div style={{
      border:"1px solid gray",
      padding:"12px",
      margin:"10px",
      borderRadius:"8px",
      width:"200px"
    }}>

      <h3>{game.name}</h3>

      <p>Status: {game.active ? "Active" : "Inactive"}</p>

      <button onClick={toggleStatus}>
        {game.active ? "Disable" : "Enable"}
      </button>

      <button
        onClick={deleteGame}
        style={{marginLeft:"10px"}}
      >
        Delete
      </button>

    </div>

  );
}

export default GameAdminCard;