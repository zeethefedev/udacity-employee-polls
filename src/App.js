import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LeaderBoard from "./pages/LeaderBoard";
import Add from "./pages/Add";
import QuestionDetail from "./components/home/QuestionDetail";
import { useSelector } from "react-redux";
import PrivateRoutes from "./PrivateRoutes";
import Error from "./pages/Error";

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
        <Route path="signup" element={<Signup />} />
        <Route path="error" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
