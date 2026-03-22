import Machines from "./pages/Machines";
import Games from "./pages/Games";
import Leaderboard from "./pages/Leaderboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Tickets from "./pages/Tickets";
import Profile from "./pages/Profile";
import AdminMachines from "./pages/AdminMachines";
import Landing from "./pages/Landing";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (

    <BrowserRouter>
      <Navbar/>
      <Routes>

        <Route path="/" element={<Landing />} /> {/* NEW Landing Page */}
         <Route path="/machines" element={<Machines />} />
        <Route path="/leaderboard/:gameId" element={<Leaderboard />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/admin/games" element={<Games />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path='/profile' element={<Profile/>} />
        <Route path="/admin/machines" element={<AdminMachines />} />
      </Routes>

    </BrowserRouter>

  );
}
export default App;