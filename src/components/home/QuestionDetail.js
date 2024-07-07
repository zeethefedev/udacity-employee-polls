import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "../generics/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  getQuestionById,
  updateQuestionAnswer,
} from "../../store/question.thunk";
import { questionHasVote } from "../../utils/utils.question";

function QuestionDetail() {
  const { id } = useParams();
  const question = useSelector((state) => state.question.currentQuestion);
  const user = useSelector((state) => state.user.currentUser);
  const isQuestionsAnswered = question && questionHasVote(question, user);

  const dispatch = useDispatch();
  const getQuestion = () => {
    dispatch(getQuestionById(id));
  };

  useEffect(() => {
    getQuestion();
  }, []);

  const handleSetAnswer = (answer) => {
    const authedUser = user.id;
    const qid = question.id;
    dispatch(updateQuestionAnswer({ authedUser, qid, answer }));
  };

  const getAnswerStatistics = () => {
    const allAnswers =
      question.optionOne.votes.length + question.optionTwo.votes.length;
    const answerPercentOne = (
      question.optionOne.votes.length / allAnswers
    ).toFixed(2);
    const answerPercentTwo =
      question.optionTwo.votes.length / allAnswers.toFixed(2);

    return `${answerPercentOne}% employees votes One and ${answerPercentTwo}% employees votes for Two.`;
  };

  return (
    <div>
      {question && (
        <>
          <div>{question.author} asked</div>
          <div>Would your rather...</div>
          <Button onClick={() => handleSetAnswer("optionOne")}>
            {question.optionOne.text}
          </Button>
          <Button onClick={() => handleSetAnswer("optionTwo")}>
            {question.optionTwo.text}
          </Button>
        </>
      )}
      {isQuestionsAnswered && <div>{getAnswerStatistics()}</div>}
    </div>
  );
}

export default QuestionDetail;
