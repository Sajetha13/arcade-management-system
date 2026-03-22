import { useEffect, useState } from "react";
import API from "../api/api";

function Tickets() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [tickets, setTickets] = useState([]);
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");

  // 1. Fetch tickets based on role
  const fetchTickets = () => {
    if (user?.role === "ADMIN") {
      API.get("/tickets") // Get all for admin
        .then((res) => setTickets(res.data))
        .catch((err) => console.log(err));
    } else {
      API.get(`/tickets/user/${user.id}`) // Get only mine for player
        .then((res) => setTickets(res.data))
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  // 2. Player: Create Ticket
  const handleCreateTicket = (e) => {
    e.preventDefault();
    API.post(`/tickets/user/${user.id}`, { type, description })
      .then(() => {
        setType("");
        setDescription("");
        fetchTickets();
        alert("Ticket submitted!");
      })
      .catch((err) => console.log(err));
  };

  // 3. Admin: Update Status
  const handleUpdateStatus = (ticketId, newStatus) => {
    // Note: your backend uses @RequestParam for adminId and status
    API.patch(`/tickets/${ticketId}/status?adminId=${user.id}&status=${newStatus}`)
      .then(() => fetchTickets())
      .catch((err) => console.log(err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Support Tickets</h2>

      {/* PLAYER VIEW: Show Form */}
      {user?.role === "PLAYER" && (
        <form onSubmit={handleCreateTicket} style={{ marginBottom: "30px", border: "1px solid #ddd", padding: "15px" }}>
          <h3>Report an Issue</h3>
          <input
            placeholder="Type (e.g. Machine, Payment)"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          /><br /><br />
          <textarea
            placeholder="Describe the problem..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          /><br /><br />
          <button type="submit">Submit Ticket</button>
        </form>
      )}

      {/* LIST VIEW: Show Tickets */}
      <h3>{user?.role === "ADMIN" ? "All Active Tickets" : "My Tickets"}</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
        {tickets.map((t) => (
          <div key={t.id} style={{ border: "1px solid gray", padding: "10px", width: "250px", borderRadius: "8px" }}>
            <h4>{t.type}</h4>
            <p>{t.description}</p>
            <p><strong>Status:</strong> {t.status}</p>
            <p><small>By: {t.user.username}</small></p>

            {/* ADMIN VIEW: Show Action Buttons */}
            {user?.role === "ADMIN" && t.status === "OPEN" && (
              <button onClick={() => handleUpdateStatus(t.id, "CLOSED")}>
                Mark as Resolved
              </button>
            )}
          </div>
        ))}
        {tickets.length === 0 && <p>No tickets found.</p>}
      </div>
    </div>
  );
}

export default Tickets;