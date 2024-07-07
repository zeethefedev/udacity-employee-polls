import React from "react";

function LeaderRow({ user }) {
  const { id, name, avatarURL, answers, questions } = user;
  return (
    <tr>
      <td className="flex w-full gap-16">
        <img className="w-12 h-12" src={avatarURL} alt={id} />
        <div className="text-left">
          <div>{name}</div>
          <div>{id}</div>
        </div>
      </td>
      <td>{Object.keys(answers).length}</td>
      <td>{questions.length}</td>
    </tr>
  );
}

export default LeaderRow;
