import React from "react";
import Card from "../generics/Card";

function LeaderCard({ user }) {
  const { id, name, avatarURL, answers, questions } = user;
  // number of questions
  // number of answers
  return (
    <Card>
      <img className="w-12 h-12" src={avatarURL} alt={id} />
      <div>{name}</div>
      <div>{id}</div>
      <div>{Object.keys(answers).length}</div>
      <div>{questions.length}</div>
    </Card>
  );
}

export default LeaderCard;
