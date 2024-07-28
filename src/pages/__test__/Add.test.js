import { render } from "@testing-library/react";
import Mock from "./Mock";
import Add from "../Add";

const MockAdd = () => {
  return (
    <Mock>
      <Add />
    </Mock>
  );
};

describe("Add Form", () => {
  it("renders correctly", () => {
    const { add } = render(<MockAdd />);
    expect(add).toMatchSnapshot();
  });
});
