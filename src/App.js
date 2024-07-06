import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LeaderBoard from "./pages/LeaderBoard";
import Add from "./pages/Add";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import QuestionDetail from "./components/home/QuestionDetail";

function App() {
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <div className="App">
      {/* {currentUser && <Navbar user={currentUser} />} */}
      <Navbar user={currentUser} />
      <Routes>
        {/* <Route exact path="/" element={currentUser ? <Home /> : <Login />} /> */}
        <Route exact path="/" element={<Home />}>
          <Route path="question/:id" element={<QuestionDetail />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="leaderboard" element={<LeaderBoard />} />
        <Route path="add" element={<Add />} />
      </Routes>
    </div>
  );
}

export default App;
