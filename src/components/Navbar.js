import React from "react";
import Button from "./generics/Button";
import { useDispatch } from "react-redux";
import { logout } from "../store/user.reducer";
import { Link } from "react-router-dom";

const PAGES = ["home", "leaderboard", "add"];

function Navbar({ user }) {
  const { id, avatarURL, name } = user;
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="flex">
      {PAGES.map((page) => (
        <Link to={page === "home" ? "" : page}>{page}</Link>
      ))}
      <img className="avatar w-12 h-12" src={avatarURL} alt={id} />
      <div>{name}</div>
      <Button onClick={handleLogout}>Log out</Button>
    </div>
  );
}

export default Navbar;
