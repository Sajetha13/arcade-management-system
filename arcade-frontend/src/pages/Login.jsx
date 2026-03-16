import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(){

  const [username, setUsername] = useState("");
  const [role, setRole] = useState("PLAYER");

  const navigate = useNavigate();

  const handleLogin = () => {

    const user = {
      username,
      role
    };

    localStorage.setItem("user", JSON.stringify(user));

    navigate("/");
  };

  return(

    <div style={{padding:"20px"}}>

      <h2>Login</h2>

      <input
        placeholder="Username"
        value={username}
        onChange={(e)=>setUsername(e.target.value)}
      />

      <br/><br/>

      <select value={role} onChange={(e)=>setRole(e.target.value)}>
        <option value="PLAYER">Player</option>
        <option value="ADMIN">Admin</option>
      </select>

      <br/><br/>

      <button onClick={handleLogin}>Login</button>

    </div>

  );

}

export default Login;