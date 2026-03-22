import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    // window.location.href - force a refresh
    window.location.href = "/login";
  };

  return (
    <nav style={{
      padding: "10px",
      borderBottom: "1px solid gray",
      marginBottom: "20px"
    }}>
      <Link to="/machines">Machines</Link>
      {" | "}
      <Link to="/tickets">Tickets</Link>

      {/* admin nly */}
       {user?.role === "ADMIN" && (
        <>
          {" | "}
          <Link to="/admin/games">Manage Games</Link>
          {" | "}
          <Link to="/admin/machines">Manage Machines</Link>
        </>
      )}

      {/* AUTH LOGIC */}
      {user ? (
        <>
          {" | "}
          <Link to="/profile" style={{ fontWeight: "bold", color: "darkblue" }}>
            Profile ({user.username})
          </Link>
          {" | "}
          <button
            onClick={handleLogout}
            style={{ cursor: "pointer", background: "none", border: "none", color: "red", textDecoration: "underline" }}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          {" | "}
          <Link to="/login">Login</Link>
          {" | "}
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;