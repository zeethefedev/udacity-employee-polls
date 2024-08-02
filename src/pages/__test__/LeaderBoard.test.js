import { render, screen } from "@testing-library/react";
import Mock from "./Mock";
import LeaderBoard from "../LeaderBoard";
import { Route } from "react-router-dom";

const MockLeaderBoard = () => {
  return (
    <Mock>
      <Route path="/" element={<LeaderBoard />} />
    </Mock>
  );
};

describe("LeaderBoard", () => {
  it("should renders correctly", () => {
    const { leaderboard } = render(<MockLeaderBoard />);
    expect(leaderboard).toMatchSnapshot();
  });

  it("should display the employee and their details", async () => {
    render(<MockLeaderBoard />);

    const leaderTable = await screen.findByRole("table");
    expect(leaderTable).toBeInTheDocument();

    const [leaderRow] = screen.getAllByTestId(/^user-/);
    expect(leaderRow).toBeInTheDocument();

    // employee
    const [employee] = screen.getAllByTestId(/^avatar-/);
    expect(employee).toBeInTheDocument();

    // number of answers
    const [answer] = screen.getAllByTestId(/^answer-/);
    const answerContent = answer.textContent;
    expect(answerContent).toMatch(/^\d+$/);

    // number of questions
    const [question] = screen.getAllByTestId(/^question-/);
    const questionContent = question.textContent;
    expect(questionContent).toMatch(/^\d+$/);
  });
});
