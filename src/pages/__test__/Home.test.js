import { render, screen } from "@testing-library/react";
import Mock from "./Mock";
import Home from "../Home";
import { SARAH } from "./dataTest";

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

  it("should display question list", async () => {
    render(<MockHome />);

    const questionListHeading = await screen.findByText("Unanswered Questions");
    expect(questionListHeading).toBeInTheDocument();
  });

  // it("should allow user to toggle to show answered and unanswered questions", () => {
  //   const { home } = render(<MockHome />);
  //   expect(home).toMatchSnapshot();
  // });

  // it("should allow user to view question detail", () => {
  //   const { home } = render(<MockHome />);
  //   expect(home).toMatchSnapshot();
  // });

  // it("should display question Id in the URL when user view question detail", () => {
  //   const { home } = render(<MockHome />);
  //   expect(home).toMatchSnapshot();
  // });

  // it("should allow user to vote on a question", () => {
  //   const { home } = render(<MockHome />);
  //   expect(home).toMatchSnapshot();
  // });
});
