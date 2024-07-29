import { render } from "@testing-library/react";
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
});
