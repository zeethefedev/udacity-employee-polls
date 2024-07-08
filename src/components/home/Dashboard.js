import React, { useState } from "react";
import QuestionCard from "./QuestionCard";
import Input from "../generics/Input";
import { Outlet, useLocation } from "react-router-dom";
import { questionHasVote, sortByTimestamp } from "../../utils/utils.question";

function QuestionList({ questions }) {
  return (
    <div className="flex flex-row flex-wrap justify-center gap-4">
      {questions.map((question) => (
        <QuestionCard question={question} />
      ))}
    </div>
  );
}

function Dashboard({ questions, user }) {
  const answeredQuestions = sortByTimestamp(
    questions.filter((question) => questionHasVote(question, user))
  );
  const unansweredQuestions = sortByTimestamp(
    questions.filter((question) => !questionHasVote(question, user))
  );

  const [showAnswered, setShowAnswered] = useState(false);
  const location = useLocation();
  const isQuestionDetailScreen = location.pathname.includes("question");

  const handleShowAnswered = () => {
    setShowAnswered(!showAnswered);
  };
  return isQuestionDetailScreen ? (
    <Outlet />
  ) : (
    <>
      <Input
        type="checkbox"
        label="show answered questions"
        checked={showAnswered}
        onChange={handleShowAnswered}
        inputClass="w-auto"
        wrapperClass="flex justify-end"
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
    </>
  );
}

export default Dashboard;
