import React from "react";
import Card from "../generics/Card";
import { useNavigate } from "react-router-dom";

function QuestionCard({ question, handleSetActive }) {
  const { author, timestamp } = question;
  const navigate = useNavigate();
  const handleNavigate = () => {
    handleSetActive(question);
    navigate(`question/${question.id}`);
  };

  return (
    <Card className="clickable" onClick={handleNavigate}>
      <div>Would your rather...</div>
      <div>
        Create by {author} on {new Date(timestamp).toLocaleString()}
      </div>
    </Card>
  );
}

export default QuestionCard;
