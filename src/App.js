import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LeaderBoard from "./pages/LeaderBoard";
import Add from "./pages/Add";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="leaderboard" element={<LeaderBoard />} />
        <Route path="add" element={<Add />} />
      </Routes>
    </div>
  );
}

export default App;
