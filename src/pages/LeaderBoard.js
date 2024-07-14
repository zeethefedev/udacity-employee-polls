import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../store/user.thunk";
import LeaderRow from "../components/leaderboard/LeaderRow";
import { sortByQuestionAnswer } from "../utils/utils.question";
import Loading from "../components/generics/Loading";

function LeaderBoard() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const loading = useSelector((state) => state.user.loading);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const sortedUsers = sortByQuestionAnswer(users);

  return (
    <div className="p-6 md:px-28 md:py-11">
      {loading ? (
        <Loading />
      ) : (
        <table className="w-full my-16">
          <tr>
            <th>Name</th>
            <th>Answers</th>
            <th>Questions</th>
          </tr>
          {users && sortedUsers.map((user) => <LeaderRow user={user} />)}
        </table>
      )}
    </div>
  );
}

export default LeaderBoard;
