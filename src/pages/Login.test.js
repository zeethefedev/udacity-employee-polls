import { render } from "@testing-library/react";
import Login from "./Login";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../store/store";

describe("Login", () => {
  it("renders correctly", () => {
    const { login } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );
    expect(login).toMatchSnapshot();
  });
});
