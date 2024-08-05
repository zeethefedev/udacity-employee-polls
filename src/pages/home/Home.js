import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dashboard from "./Dashboard";
import { getAllQuestions } from "../../store/question.thunk";

function Home({ user }) {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.question.questions);

  useEffect(() => {
    dispatch(getAllQuestions());
  }, []);

  return (
    <div className="p-6 md:px-28 md:py-11">
      {questions && <Dashboard questions={questions} user={user} />}
    </div>
  );
}

export default Home;
