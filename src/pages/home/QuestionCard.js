import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/Card";

function QuestionCard({ question }) {
  const { author, timestamp, optionOne, optionTwo } = question;
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`question/${question.id}`);
  };

  return (
    <Card
      id={question.id}
      className="question-card clickable max-w-md m-auto h-full"
      onClick={handleNavigate}
      testId="question-card"
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
