import { fireEvent, render, screen } from "@testing-library/react";
import Mock from "./Mock";
import Add from "../Add";
import { MESSAGES } from "../../utils/utils.question";
import { SARAH } from "./data/data";
import { Route } from "react-router-dom";

const MockAdd = () => {
  return (
    <Mock>
      <Route path="/" element={<Add user={SARAH} />} />
    </Mock>
  );
};

describe("Add Form", () => {
  it("should allow user to add new question", async () => {
    render(<MockAdd />);

    const optionOneElement = screen.getByTestId("option-one");
    const optionTwoElement = screen.getByTestId("option-two");
    fireEvent.change(optionOneElement, {
      target: { value: "watch movies alone" },
    });
    fireEvent.change(optionTwoElement, {
      target: { value: "eat dinner alone" },
    });

    const addButton = screen.getByRole("button", { name: "Add new question" });
    fireEvent.click(addButton);

    const successMessage = await screen.findByText(
      MESSAGES.ADD_QUESTION_SUCCESS
    );
    expect(successMessage).toBeInTheDocument();
  });
});
