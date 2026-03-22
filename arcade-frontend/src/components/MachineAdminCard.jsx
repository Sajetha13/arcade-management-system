import API from "../api/api";

function MachineAdminCard({ machine, refresh }) {

  const handleToggleStatus = () => {
    const newStatus = machine.status === "ACTIVE" ? "MAINTENANCE" : "ACTIVE";
    // Your backend uses @RequestParam status
    API.patch(`/machines/${machine.id}?status=${newStatus}`)
      .then(() => refresh())
      .catch(err => console.log(err));
  };

  const handleDelete = () => {
    if(window.confirm(`Delete machine ${machine.serialNumber}?`)) {
      API.delete(`/machines/${machine.id}`)
        .then(() => refresh())
        .catch(err => console.log(err));
    }
  };

  return (
    <div style={{ border: "1px solid red", padding: "15px", margin: "10px", width: "250px", borderRadius: "8px" }}>
      <h3>{machine.serialNumber}</h3>
      <p><strong>Status:</strong> {machine.status}</p>
      <p><strong>Game:</strong> {machine.game ? machine.game.name : "EMPTY"}</p>

      <button onClick={handleToggleStatus}>
        {machine.status === "ACTIVE" ? "Set Maintenance" : "Set Active"}
      </button>
      <button onClick={handleDelete} style={{ marginLeft: "10px", color: "red" }}>Delete</button>
    </div>
  );
}

export default MachineAdminCard;