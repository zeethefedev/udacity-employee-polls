import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/login/Signup";
import LeaderBoard from "./pages/leaderboard/LeaderBoard";
import Add from "./pages/add/Add";
import { useSelector } from "react-redux";
import PrivateRoutes from "./PrivateRoutes";
import Error from "./pages/Error";
import QuestionDetail from "./pages/home/QuestionDetail";

function App() {
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <div className="App">
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
        <Route path="error" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
