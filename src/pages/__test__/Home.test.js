import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Mock from "./Mock";
import Home from "../Home";
import { SARAH } from "./data";
import QuestionDetail from "../../components/home/QuestionDetail";
import { Routes, Route } from "react-router-dom";

const MockHome = () => {
  return (
    <Mock>
      <Routes>
        <Route exact path="/" element={<Home user={SARAH} />}>
          <Route
            path="question/:id"
            element={<QuestionDetail user={SARAH} />}
          />
        </Route>
      </Routes>
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

  it("should allow user to view question detail and vote", async () => {
    render(<MockHome />);
    const [questionCard] = await screen.findAllByTestId("question-card");
    const questionId = questionCard.getAttribute("id");
    fireEvent.click(questionCard);

    await waitFor(() =>
      expect(window.location.href).toBe(
        `http://localhost/question/${questionId}`
      )
    );
    const questionDetail = await screen.findByTestId("question-details");
    expect(questionDetail).toBeInTheDocument();
    const optionOneButton = await screen.findByTestId("optionOne");
    fireEvent.click(optionOneButton);

    const successMessage = await screen.findByText(/^You voted for/);
    expect(successMessage).toBeInTheDocument();
  });
});
