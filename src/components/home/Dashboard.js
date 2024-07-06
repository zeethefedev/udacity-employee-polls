import React, { useState } from "react";
import QuestionCard from "./QuestionCard";
import Input from "../generics/Input";

function QuestionList({ questions }) {
  const [active, setActive] = useState();
  const handleSetActive = (question) => {
    if (active === null || active === undefined) {
      setActive(question.id);
    } else {
      setActive();
    }
  };

  return (
    <>
      {questions.map((question) => (
        <QuestionCard
          question={question}
          handleSetActive={() => handleSetActive(question)}
          active={question.id === active}
        />
      ))}
    </>
  );
}

function Dashboard({ questions, user }) {
  const { id } = user;
  const questionHasVote = (question) => {
    return (
      question.optionOne.votes.includes(id) ||
      question.optionTwo.votes.includes(id)
    );
  };

  const sortByTimestamp = (array) => {
    return array.sort((a, b) => b.timestamp - a.timestamp);
  };

  const answeredQuestions = sortByTimestamp(
    questions.filter((question) => questionHasVote(question))
  );
  const unansweredQuestions = sortByTimestamp(
    questions.filter((question) => !questionHasVote(question))
  );

  const [showAnswered, setShowAnswered] = useState(false);
  const handleShowAnswered = () => {
    setShowAnswered(!showAnswered);
  };
  return (
    <div>
      <Input
        type="checkbox"
        label="show answered questions"
        checked={showAnswered}
        onChange={handleShowAnswered}
        inputClass="w-auto"
      />
      {showAnswered ? (
        <>
          <h1>Answered Questions</h1>
          <QuestionList questions={answeredQuestions} />
        </>
      ) : (
        <>
          <h1>Unanswered Questions</h1>
          <QuestionList questions={unansweredQuestions} />
        </>
      )}
    </div>
  );
}

export default Dashboard;
