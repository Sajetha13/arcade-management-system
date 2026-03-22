import { useEffect, useState } from "react";
import API from "../api/api";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (user?.id) {
      // backend: GET /score/player/{id}
      API.get(`/score/player/${user.id}`)
        .then(res => setHistory(res.data))
        .catch(err => console.log("Error fetching history:", err));
    }
  }, [user?.id]);

  if (!user) return <div style={{ padding: "20px" }}>Please log in to see your profile.</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>User Profile</h2>
      <div style={{
        border: "1px solid #ccc",
        padding: "15px",
        borderRadius: "8px",
        maxWidth: "400px",
        backgroundColor: "#f9f9f9"
      }}>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p><strong>User ID:</strong> {user.id}</p>
      </div>

      <h3 style={{ marginTop: "30px" }}>Your Gaming History</h3>
      {history.length > 0 ? (
        <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#eee" }}>
              <th>Game</th>
              <th>Score</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {history.map((h) => (
              <tr key={h.id}>
                <td>{h.game.name}</td>
                <td>{h.score}</td>
                <td>{new Date(h.recordedAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No games played yet. Go find a machine!</p>
      )}
    </div>
  );
}

export default Profile;