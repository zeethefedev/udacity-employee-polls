import React from "react";
import Card from "../generics/Card";
import Button from "../generics/Button";

function QuestionCard({ question, active, handleSetActive }) {
  const { author, optionOne, optionTwo } = question;
  const handleSetAnswer = (option) => {};
  return (
    <Card>
      <div>Would your rather...</div>
      <div>Create by {author} </div>
      <div onClick={handleSetActive}>Start vote</div>
      {active && (
        <>
          <Button onClick={() => handleSetAnswer(optionOne)}>
            {optionOne.text}
          </Button>
          <Button onClick={() => handleSetAnswer(optionTwo)}>
            {optionTwo.text}
          </Button>
        </>
      )}
    </Card>
  );
}

export default QuestionCard;
