import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../store/user.thunk";
import LeaderRow from "../components/leaderboard/LeaderRow";
import { sortByQuestionAnswer } from "../utils/utils.question";

function LeaderBoard() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const sortedUsers = sortByQuestionAnswer(users);

  return (
    <div className="page-layout">
      <table className="w-full my-16">
        <tr>
          <th>Name</th>
          <th>Answers</th>
          <th>Questions</th>
        </tr>
        {users && sortedUsers.map((user) => <LeaderRow user={user} />)}
      </table>
    </div>
  );
}

export default LeaderBoard;
