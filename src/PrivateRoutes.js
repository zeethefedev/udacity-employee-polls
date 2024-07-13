import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useDispatch } from "react-redux";
import { setUser } from "./store/user.reducer";
import { getFromStorage } from "./utils/utils.user";

function PrivateRoutes({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setUser());
  }, []);

  useEffect(() => {
    !getFromStorage("USER") && navigate("/login");
  }, [user]);

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
