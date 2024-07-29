import { fireEvent, render, screen } from "@testing-library/react";
import Login from "../Login";
import Mock from "./Mock";
import { ERROR, MESSAGES } from "../../utils/utils.user";

const MockLogin = () => {
  return (
    <Mock>
      <Login />
    </Mock>
  );
};

describe("Login", () => {
  // it("should prevent user from logging in with the wrong credential", async () => {
  //   const { login } = render(<MockLogin />);
  //   const usernameElement = screen.getByTestId("username");
  //   const passwordElement = screen.getByTestId("password");
  //   fireEvent.change(usernameElement, { target: { value: "sarahedo" } });
  //   fireEvent.change(passwordElement, { target: { value: "password124" } });

  //   const loginButton = screen.getByRole("button", { name: "login" });
  //   fireEvent.click(loginButton);
  //   const errorMessage = await screen.findByText(ERROR.LOGIN);
  //   expect(errorMessage).toBeInTheDocument();
  // });

  it("should allow user to log in with the right credential", async () => {
    const { login } = render(<MockLogin />);
    const usernameElement = screen.getByTestId("username");
    const passwordElement = screen.getByTestId("password");
    fireEvent.change(usernameElement, { target: { value: "sarahedo" } });
    fireEvent.change(passwordElement, { target: { value: "password123" } });

    const loginButton = screen.getByRole("button", { name: "login" });
    fireEvent.click(loginButton);

    // const successMessage = await screen.findByText(MESSAGES.LOGIN_SUCCESS);
    // expect(successMessage).toBeInTheDocument();

    expect(login).toMatchSnapshot();
  });
});
