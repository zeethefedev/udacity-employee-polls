import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Mock from "./Mock";
import { Route } from "react-router-dom";
import Home from "../home/Home";
import QuestionDetail from "../home/QuestionDetail";
import { SARAH } from "./data/data";

const MockHome = () => {
  return (
    <Mock>
      <Route exact path="/" element={<Home user={SARAH} />}>
        <Route path="questions/:id" element={<QuestionDetail user={SARAH} />} />
      </Route>
    </Mock>
  );
};

describe("Home", () => {
  it("should render correctly", () => {
    const { home } = render(<MockHome />);
    expect(home).toMatchSnapshot();
  });

  it("should fetch all questions and display unanswered questions by default", async () => {
    render(<MockHome />);

    const questionListHeading = await screen.findByText("Unanswered Questions");
    expect(questionListHeading).toBeInTheDocument();
  });

  it("should allow user to toggle between answered and unanswered questions", async () => {
    render(<MockHome />);

    const questionCheckbox = screen.getByTestId("question-checkbox");
    expect(questionCheckbox.checked).toBe(false);

    fireEvent.click(questionCheckbox);
    expect(questionCheckbox.checked).toBe(true);

    const questionListHeading = await screen.findByText("Answered Questions");
    expect(questionListHeading).toBeInTheDocument();
  });

  it("should allow user to view question detail and vote", async () => {
    render(<MockHome />);
    const [questionCard] = await screen.findAllByTestId("question-card");
    const questionId = questionCard.getAttribute("id");
    fireEvent.click(questionCard);

    await waitFor(() =>
      expect(window.location.href).toBe(
        `http://localhost/questions/${questionId}`
      )
    );
    const questionDetail = await screen.findByTestId("question-details");
    expect(questionDetail).toBeInTheDocument();

    // author
    const avatar = await screen.findByTestId("avatar");
    expect(avatar).toBeInTheDocument();

    // 2 options
    const optionOneButton = await screen.findByTestId("optionOne");
    expect(optionOneButton).toBeInTheDocument();

    const optionTwoButton = await screen.findByTestId("optionTwo");
    expect(optionTwoButton).toBeInTheDocument();

    fireEvent.click(optionOneButton);

    // vote result
    const successMessage = await screen.findByText(/^You voted for/);
    expect(successMessage).toBeInTheDocument();

    const percentMessage = await screen.findByText(/employees vote for/);
    expect(percentMessage).toBeInTheDocument();
  });
});
