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

function QuestionDetail({ user }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const question = useSelector((state) => state.question.currentQuestion);
  const author = useSelector((state) => state.question.author);
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
            src={author.avatarURL}
            alt={question.author}
          />
          <h2>Would your rather...</h2>
          <div className="flex gap-2">
            {["optionOne", "optionTwo"].map((option) => (
              <Button onClick={() => handleSetAnswer(option)}>
                {question[option].text}
              </Button>
            ))}
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
