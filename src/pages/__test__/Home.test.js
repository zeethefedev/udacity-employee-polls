import { render } from "@testing-library/react";
import Mock from "./Mock";
import Home from "../Home";

const MockHome = () => {
  return (
    <Mock>
      <Home />
    </Mock>
  );
};

describe("Home", () => {
  it("renders correctly", () => {
    const { home } = render(<MockHome />);
    expect(home).toMatchSnapshot();
  });
});
