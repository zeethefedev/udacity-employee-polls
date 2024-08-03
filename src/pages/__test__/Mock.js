import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes } from "react-router-dom";
import store from "../../store/store";

function Mock({ children }) {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>{children}</Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default Mock;
