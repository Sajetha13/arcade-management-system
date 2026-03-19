import Machines from "./pages/Machines";
import Games from "./pages/Games";
import Leaderboard from "./pages/Leaderboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (

    <BrowserRouter>
      <Navbar/>
      <Routes>

        <Route path="/" element={<Machines />} />
        <Route path="/leaderboard/:gameId" element={<Leaderboard />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/admin/games" element={<Games />} />

      </Routes>

    </BrowserRouter>

  );
}
export default App;