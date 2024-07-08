import React from "react";
import Card from "../generics/Card";
import { useNavigate } from "react-router-dom";

function QuestionCard({ question }) {
  const { author, timestamp, optionOne, optionTwo } = question;
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`question/${question.id}`);
  };

  return (
    <Card
      className="question-card clickable w-1/2 max-w-md"
      onClick={handleNavigate}
    >
      <div>
        Would your rather <span className="option-text">{optionOne.text}</span>{" "}
        or <span className="option-text">{optionTwo.text}</span>?
      </div>
      <div>
        Create by {author} on {new Date(timestamp).toLocaleString()}
      </div>
    </Card>
  );
}

export default QuestionCard;
