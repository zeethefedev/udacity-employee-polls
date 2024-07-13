import React, { useEffect } from "react";
import Dashboard from "../components/home/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import { getAllQuestions } from "../store/question.thunk";

function Home({ user }) {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.question.questions);

  useEffect(() => {
    dispatch(getAllQuestions());
  }, []);

  return (
    <div className="page-layout">
      {questions && <Dashboard questions={questions} user={user} />}
    </div>
  );
}

export default Home;
