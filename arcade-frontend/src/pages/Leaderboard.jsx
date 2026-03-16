import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";

function Leaderboard() {

  const { gameId } = useParams();
  const [scores, setScores] = useState([]);

  useEffect(() => {
    API.get(`/score/leaderboard/${gameId}`)
      .then(res => setScores(res.data))
      .catch(err => console.log(err));
  }, [gameId]);

  return (
    <div style={{ padding: "20px" }}>

      <h2>Leaderboard</h2>

      {scores.length === 0 && <p>No scores yet</p>}

      {scores.map((score, index) => (
        <div key={score.id} style={{ margin: "10px 0" }}>
          <strong>#{index + 1}</strong> — {score.user.username} : {score.score}
        </div>
      ))}

    </div>
  );
}

export default Leaderboard;