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
  it("should allow user to add new question", () => {
    const { add } = render(<MockAdd />);
    expect(add).toMatchSnapshot();
  });
});
