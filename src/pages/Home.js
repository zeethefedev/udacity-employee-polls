import React from "react";
import Dashboard from "../components/home/Dashboard";
import Button from "../components/generics/Button";
import { useDispatch } from "react-redux";
import { logout } from "../store/user.reducer";

function Home() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <Button onClick={handleLogout}>Log out</Button>
      <Dashboard />
    </div>
  );
}

export default Home;
