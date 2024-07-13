import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LeaderBoard from "./pages/LeaderBoard";
import Add from "./pages/Add";
import Navbar from "./components/Navbar";
import QuestionDetail from "./components/home/QuestionDetail";
import { useSelector } from "react-redux";
import PrivateRoutes from "./PrivateRoutes";

function App() {
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <div className="App">
      {currentUser && <Navbar user={currentUser} />}
      <Routes>
        <Route element={<PrivateRoutes user={currentUser} />}>
          <Route exact path="/" element={<Home user={currentUser} />}>
            <Route
              path="question/:id"
              element={<QuestionDetail user={currentUser} />}
            />
          </Route>
          <Route path="leaderboard" element={<LeaderBoard />} />
          <Route path="add" element={<Add user={currentUser} />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
