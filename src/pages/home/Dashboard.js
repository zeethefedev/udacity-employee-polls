import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import QuestionCard from "./QuestionCard";
import { questionHasVote, sortByTimestamp } from "../../utils/utils.question";
import Input from "../../components/Input";
import Loading from "../../components/Loading";

function QuestionList({ questions }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {questions.map((question) => (
        <QuestionCard key={question.id} question={question} />
      ))}
    </div>
  );
}

function Dashboard({ questions, user }) {
  const loading = useSelector((state) => state.question.loading);
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
        testId="question-checkbox"
      />
      {showAnswered ? (
        <>
          <h1 className="text-center">Answered Questions</h1>
          {loading ? (
            <Loading />
          ) : (
            <QuestionList questions={answeredQuestions} />
          )}
        </>
      ) : (
        <>
          <h1 className="text-center">Unanswered Questions</h1>
          {loading ? (
            <Loading />
          ) : (
            <QuestionList questions={unansweredQuestions} />
          )}
        </>
      )}
    </>
  );
}

export default Dashboard;
