import { useEffect, useState } from "react";
import API from "../api/api";
import MachineAdminCard from "../components/MachineAdminCard";

function AdminMachines() {
  const [machines, setMachines] = useState([]);
  const [games, setGames] = useState([]); // Needed for the "Assign Game" dropdown
  const [serialNumber, setSerialNumber] = useState("");
  const [selectedGameId, setSelectedGameId] = useState("");

  const fetchData = () => {
    API.get("/machines").then(res => setMachines(res.data));
    API.get("/game").then(res => setGames(res.data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddMachine = (e) => {
    e.preventDefault();
    if (!selectedGameId) return alert("Please select a game for this machine!");

    // Your backend: POST /machines/game/{gameId}
    API.post(`/machines/game/${selectedGameId}`, { serialNumber })
      .then(() => {
        setSerialNumber("");
        fetchData();
        alert("Machine added and game assigned!");
      })
      .catch(err => console.log(err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Manage Arcade Machines</h2>

      {/* FORM TO ADD MACHINE */}
      <form onSubmit={handleAddMachine} style={{ marginBottom: "30px", padding: "15px", border: "1px solid #ccc" }}>
        <h3>Add New Machine</h3>
        <input
          placeholder="Serial Number (e.g. MAC-101)"
          value={serialNumber}
          onChange={(e) => setSerialNumber(e.target.value)}
          required
        />
        <select onChange={(e) => setSelectedGameId(e.target.value)} value={selectedGameId} required style={{ marginLeft: "10px" }}>
          <option value="">-- Select Game to Install --</option>
          {games.map(g => (
            <option key={g.id} value={g.id}>{g.name}</option>
          ))}
        </select>
        <button type="submit" style={{ marginLeft: "10px" }}>Install Machine</button>
      </form>

      {/* list machines*/}
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {machines.map(m => (
          <MachineAdminCard key={m.id} machine={m} refresh={fetchData} />
        ))}
      </div>
    </div>
  );
}

export default AdminMachines;