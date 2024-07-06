import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "../generics/Button";
import { useDispatch, useSelector } from "react-redux";
import { getQuestionById } from "../../store/question.thunk";

function QuestionDetail() {
  const { id } = useParams();
  const question = useSelector((state) => state.question.currentQuestion);

  const dispatch = useDispatch();
  const getQuestion = () => {
    dispatch(getQuestionById(id));
  };

  useEffect(() => {
    getQuestion();
  }, []);

  const handleSetAnswer = (option) => {};

  return (
    <div>
      {question && (
        <>
          <div>{question.author} asked</div>
          <div>Would your rather...</div>
          <Button onClick={() => handleSetAnswer(question.optionOne)}>
            {question.optionOne.text}
          </Button>
          <Button onClick={() => handleSetAnswer(question.optionTwo)}>
            {question.optionTwo.text}
          </Button>
        </>
      )}
    </div>
  );
}

export default QuestionDetail;
