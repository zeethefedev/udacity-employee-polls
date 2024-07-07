import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../store/user.thunk";
import LeaderRow from "../components/leaderboard/LeaderRow";

function LeaderBoard() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);

  const getUsers = () => {
    dispatch(getAllUsers());
  };

  useEffect(() => {
    getUsers();
  }, []);

  //sort by number of answer and questions

  return (
    <div className="page-layout">
      <table className="w-full my-16">
        <tr>
          <th>Name</th>
          <th>Answers</th>
          <th>Questions</th>
        </tr>
        {users && (
          <>
            {users.map((user) => (
              <LeaderRow user={user} />
            ))}
          </>
        )}
      </table>
    </div>
  );
}

export default LeaderBoard;
