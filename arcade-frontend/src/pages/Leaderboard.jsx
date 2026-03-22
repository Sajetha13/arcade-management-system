import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";
import "./Leaderboard.css";

function Leaderboard() {
  const { gameId } = useParams();
  const [scores, setScores] = useState([]);
  const [gameName, setGameName] = useState("VIRTUAL");

  useEffect(() => {
    // 1. Fetch scores
    API.get(`/score/leaderboard/${gameId}`)
      .then((res) => setScores(res.data))
      .catch((err) => console.log(err));

    // 2. Fetch game info for the title
    API.get("/game")
      .then((res) => {
        const found = res.data.find((g) => g.id.toString() === gameId);
        if (found) setGameName(found.name.toUpperCase());
      });
  }, [gameId]);

  return (
    <div className="leaderboard-outer">
      <div className="arcade-cabinet-frame">

        {/* ONE BIG UNIFIED SCREEN */}
        <div className="integrated-crt-screen">

          {/* Logo is now inside the screen area */}
          <div className="big-logo-main">{gameName}</div>

          <h2 className="high-scores-title">HIGH SCORES</h2>

          <div className="score-table">
            {scores.length === 0 ? (
              <p style={{ color: "#222", textAlign: "center", fontSize: "1rem" }}>
                Oh, it's not played yet
              </p>
            ) : (
              /* EXTRA BRACES REMOVED HERE */
              scores.map((s, index) => {
                const rank = index + 1;
                const rankClass = index < 7 ? `rank-${rank}` : "rank-default";

                // LOGIC: 1st, 2nd, 3rd, everything else is "th"
                let suffix = "TH";
                if (rank === 1) suffix = "ST";
                else if (rank === 2) suffix = "ND";
                else if (rank === 3) suffix = "RD";

                return (
                  <div key={s.id} className={`score-row ${rankClass}`}>
                    <span>{rank}{suffix} {s.user?.username?.toUpperCase().substring(0, 10) || "PLAYER"}</span>
                    <span>{s.score}</span>
                  </div>
                );
              })
            )}
          </div>

          <div className="screen-footer">
            <span className="blink" style={{ color: "#ffff00" }}>INSERT COIN</span>
            <span style={{ color: "#fff" }}>CREDIT 0</span>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Leaderboard;