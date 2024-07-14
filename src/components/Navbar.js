import React, { useState } from "react";
import Button from "./generics/Button";
import { useDispatch } from "react-redux";
import { logout } from "../store/user.reducer";
import { Link } from "react-router-dom";
import SVGIcon from "./generics/SVGIcon";

const PAGES = ["home", "leaderboard", "add"];

function Pages({ pages }) {
  return pages.map((page) => (
    <Link
      className="font-semibold capitalize hover:underline"
      to={page === "home" ? "" : page}
    >
      {page}
    </Link>
  ));
}

function Navbar({ user }) {
  const { id, avatarURL, name } = user;
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className="rounded px-6 md:px-28 py-2 border-2 border-solid">
      <div className="flex justify-between items-center">
        <Button className="md:hidden" onClick={handleShowMenu}>
          <SVGIcon
            icon={showMenu ? "close" : "menu"}
            width="1.5em"
            height="1.5em"
          />
        </Button>
        <div className="gap-8 hidden md:flex">
          <Pages pages={PAGES} />
        </div>
        <div className="flex gap-8">
          <div className="flex gap-4">
            <img className="avatar w-12 h-12" src={avatarURL} alt={id} />
            <div className="text-left">
              <div>{name}</div>
              <div>{id}</div>
            </div>
          </div>
          <Button className="hidden md:block" onClick={handleLogout}>
            Log out
          </Button>
        </div>
      </div>
      {showMenu && (
        <div className="mt-8 gap-4 flex flex-col items-start md:hidden">
          <div className="gap-4 flex flex-col text-left">
            <Pages pages={PAGES} />
          </div>
          <Button onClick={handleLogout}>Log out</Button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
