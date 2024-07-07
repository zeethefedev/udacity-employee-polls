import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../store/user.thunk";
import LeaderCard from "../components/leaderboard/LeaderCard";

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
    <>
      <table>
        <tr>
          <th>Name</th>
          <th>Answers</th>
          <th>Questions</th>
        </tr>
        {users && (
          <>
            {users.map((user) => (
              <LeaderCard user={user} />
            ))}
          </>
        )}
      </table>
    </>
  );
}

export default LeaderBoard;
