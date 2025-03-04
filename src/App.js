import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import PrivateRoutes from "./PrivateRoutes";
import Home from "./pages/home/Home";
import QuestionDetail from "./pages/home/QuestionDetail";
import LeaderBoard from "./pages/leaderboard/LeaderBoard";
import Add from "./pages/add/Add";
import Login from "./pages/login/Login";
import Error from "./pages/Error";

function App() {
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <div className="App">
      <Routes>
        <Route element={<PrivateRoutes user={currentUser} />}>
          <Route exact path="/" element={<Home user={currentUser} />}>
            <Route
              path="questions/:id"
              element={<QuestionDetail user={currentUser} />}
            />
          </Route>
          <Route path="leaderboard" element={<LeaderBoard />} />
          <Route path="add" element={<Add user={currentUser} />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="error" element={<Error />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
