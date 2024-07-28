import { render } from "@testing-library/react";
import Login from "../Login";
import Mock from "./Mock";

const MockLogin = () => {
  return (
    <Mock>
      <Login />
    </Mock>
  );
};

describe("Login", () => {
  it("renders correctly", () => {
    const { login } = render(<MockLogin />);
    expect(login).toMatchSnapshot();
  });
});
