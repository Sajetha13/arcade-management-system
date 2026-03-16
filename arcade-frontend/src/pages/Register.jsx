import { useState } from "react";

function Register(){

  const [username, setUsername] = useState("");

  const handleRegister = () => {

    alert("Registered user: " + username);

  };

  return(

    <div style={{padding:"20px"}}>

      <h2>Register</h2>

      <input
        placeholder="Username"
        value={username}
        onChange={(e)=>setUsername(e.target.value)}
      />

      <br/><br/>

      <button onClick={handleRegister}>Register</button>

    </div>

  );

}

export default Register;