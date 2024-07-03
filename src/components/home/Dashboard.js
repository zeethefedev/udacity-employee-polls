import React, { useState } from "react";
import QuestionCard from "./QuestionCard";

function Dashboard({ questions }) {
  const [active, setActive] = useState();
  const handleSetActive = (question) => {
    setActive(question.id);
  };
  return (
    <div>
      {questions.map((question) => (
        <QuestionCard
          question={question}
          handleSetActive={() => handleSetActive(question)}
          active={question.id === active}
        />
      ))}
    </div>
  );
}

export default Dashboard;
