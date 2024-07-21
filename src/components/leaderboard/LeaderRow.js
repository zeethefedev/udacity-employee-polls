import React from "react";
import { DEFAULT_AVATAR } from "../../utils/utils.user";

function LeaderRow({ user }) {
  const { id, name, avatarURL, answers, questions } = user;
  return (
    <tr>
      <td className="flex w-full gap-2 md:gap-16">
        <img className="w-12 h-12" src={avatarURL || DEFAULT_AVATAR} alt={id} />
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
