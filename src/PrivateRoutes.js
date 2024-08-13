import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useDispatch } from "react-redux";
import { logout, setUser } from "./store/user.reducer";
import {
  getCurrentPageFromStorage,
  getFromStorage,
  saveCurrentPageToStorage,
} from "./utils/utils.user";

function PrivateRoutes({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch(setUser());
    const current = getCurrentPageFromStorage();
    current && navigate(current);
  }, []);

  useEffect(() => {
    !getFromStorage("USER") && navigate("/login");
  }, [user]);

  useEffect(() => {
    const { key, pathname } = location;
    //get previous pathname
    const savedPathname = getCurrentPageFromStorage();

    //save current pathname
    saveCurrentPageToStorage(pathname);
    if (key === "default" || savedPathname === pathname) {
      if (pathname !== "/") {
        dispatch(logout());
        navigate("/login");
      }
    }
  }, [location]);

  return (
    user && (
      <>
        <Navbar user={user} />
        <Outlet />
      </>
    )
  );
}

export default PrivateRoutes;
