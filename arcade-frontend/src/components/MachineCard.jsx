import { useNavigate } from "react-router-dom";
import GameCard from "./GameCard";

function MachineCard({machine}){

  const navigate = useNavigate();

  const openLeaderboard = () => {

    if(!machine.game){
      alert("No game installed on this machine");
      return;
    }

    navigate(`/leaderboard/${machine.game.id}`);
  };

  return(

    <div
      style={{
        border:"1px solid gray",
        padding:"15px",
        margin:"10px",
        width:"220px",
        borderRadius:"8px"
      }}
    >

      <h3>{machine.serialNumber}</h3>

      <p>Status: {machine.status}</p>

      {machine.game ? (

        <div onClick={openLeaderboard} style={{cursor:"pointer"}}>
          <GameCard game={machine.game}/>
        </div>

      ) : (

        <p>No game installed</p>

      )}

    </div>

  );
}

export default MachineCard;