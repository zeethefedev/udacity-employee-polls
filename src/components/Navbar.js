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
    <nav className="flex justify-between items-center rounded px-4 py-2 border-2 border-solid">
      <div className="flex gap-8">
        {PAGES.map((page) => (
          <Link
            className="font-semibold capitalize hover:underline"
            to={page === "home" ? "" : page}
          >
            {page}
          </Link>
        ))}
      </div>
      <div className="flex gap-8">
        <div className="flex gap-4">
          <img className="avatar w-12 h-12" src={avatarURL} alt={id} />
          <div className="text-left">
            <div>{name}</div>
            <div>{id}</div>
          </div>
        </div>
        <Button onClick={handleLogout}>Log out</Button>
      </div>
    </nav>
  );
}

export default Navbar;
