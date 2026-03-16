import { Link } from "react-router-dom";

function Navbar(){

  const user = JSON.parse(localStorage.getItem("user"));

  return(

    <div style={{
      padding:"10px",
      borderBottom:"1px solid gray",
      marginBottom:"20px"
    }}>

      <Link to="/">Machines</Link>

      {user?.role === "ADMIN" && (
        <>
          {" | "}
          <Link to="/admin/games">Games</Link>
        </>
      )}

      {" | "}
      <Link to="/login">Login</Link>

      {" | "}
      <Link to="/register">Register</Link>

    </div>

  );

}

export default Navbar;