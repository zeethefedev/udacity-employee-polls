import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Mock from "./Mock";
import Home from "../Home";
import { SARAH } from "./data";

const MockHome = () => {
  return (
    <Mock>
      <Home user={SARAH} />
    </Mock>
  );
};

describe("Home", () => {
  it("should render correctly", () => {
    const { home } = render(<MockHome />);
    expect(home).toMatchSnapshot();
  });

  it("should display unanswered questions by default", async () => {
    render(<MockHome />);

    const questionListHeading = await screen.findByText("Unanswered Questions");
    expect(questionListHeading).toBeInTheDocument();
  });

  it("should allow user to toggle to show answered and unanswered questions", async () => {
    render(<MockHome />);

    const questionCheckbox = screen.getByTestId("question-checkbox");
    expect(questionCheckbox.checked).toBe(false);

    fireEvent.click(questionCheckbox);
    expect(questionCheckbox.checked).toBe(true);

    const questionListHeading = await screen.findByText("Answered Questions");
    expect(questionListHeading).toBeInTheDocument();
  });

  // it("should allow user to view question detail", async () => {
  //   render(<MockHome />);
  //   const [questionCard] = await screen.findAllByTestId("question-card");
  //   fireEvent.click(questionCard);

  //   const questionDetail = await screen.findByTestId("question-details");
  //   expect(questionDetail).toBeInTheDocument();
  // });

  // it("should allow user to vote on a question", () => {
  //   const { home } = render(<MockHome />);
  //   expect(home).toMatchSnapshot();
  // });
});
