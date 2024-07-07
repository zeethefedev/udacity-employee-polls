import React from "react";

function LeaderCard({ user }) {
  const { id, name, avatarURL, answers, questions } = user;
  return (
    <tr>
      <td>
        <img className="w-12 h-12" src={avatarURL} alt={id} />
        <div>{name}</div>
        <div>{id}</div>
      </td>
      <td>{Object.keys(answers).length}</td>
      <td>{questions.length}</td>
    </tr>
  );
}

export default LeaderCard;
