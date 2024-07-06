import React, { useState } from "react";
import Card from "../generics/Card";
import Button from "../generics/Button";

function QuestionCard({ question, active, handleSetActive }) {
  const { author, timestamp, optionOne, optionTwo } = question;
  const handleSetAnswer = () => {
    // setShowOption(!showOption)
  };

  return (
    <Card>
      <div>Would your rather...</div>
      <div>
        Create by {author} on {new Date(timestamp).toLocaleString()}
      </div>
      <Button onClick={handleSetActive}>Start vote</Button>
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
