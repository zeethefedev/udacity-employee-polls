import { render, screen } from "@testing-library/react";
import Mock from "./Mock";
import LeaderBoard from "../LeaderBoard";

const MockLeaderBoard = () => {
  return (
    <Mock>
      <LeaderBoard />
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
  });
});
