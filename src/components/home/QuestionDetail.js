import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../generics/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  getQuestionById,
  updateQuestionAnswer,
} from "../../store/question.thunk";
import {
  getAnswerStatistics,
  getAnswerText,
  questionHasVote,
} from "../../utils/utils.question";
import Card from "../generics/Card";
import { getUserById } from "../../store/user.thunk";

function QuestionDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const question = useSelector((state) => state.question.currentQuestion);
  const user = useSelector((state) => state.user.currentUser);
  const isQuestionsAnswered = question && questionHasVote(question, user);

  useEffect(() => {
    dispatch(getQuestionById(id))
      .unwrap()
      .then((res) => {
        const author = res.question.author;
        dispatch(getUserById(author));
      });
  }, []);

  const handleSetAnswer = (answer) => {
    const authedUser = user.id;
    const qid = question.id;
    dispatch(updateQuestionAnswer({ authedUser, qid, answer }));
  };

  return (
    <Card className="question-card m-auto my-16 max-w-xl">
      {question && (
        <>
          <div>{question.author} asked</div>
          <img
            className="w-48 h-48"
            src={question.avatarURL}
            alt={question.author}
          />
          <h2>Would your rather...</h2>
          <div className="flex gap-2">
            <Button
              disabled={isQuestionsAnswered}
              onClick={() => handleSetAnswer("optionOne")}
            >
              {question.optionOne.text}
            </Button>
            <Button
              disabled={isQuestionsAnswered}
              onClick={() => handleSetAnswer("optionTwo")}
            >
              {question.optionTwo.text}
            </Button>
          </div>
          {isQuestionsAnswered && (
            <div>
              <div>{`You voted for ${getAnswerText(question, user)}`} </div>
              <div>{getAnswerStatistics(question)}</div>
              <Link to="/">Back to home</Link>
            </div>
          )}
        </>
      )}
    </Card>
  );
}

export default QuestionDetail;
