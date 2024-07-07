import React, { useEffect } from "react";
import Dashboard from "../components/home/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import { getAllQuestions } from "../store/question.thunk";

function Home() {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.question.questions);
  const currentUser = useSelector((state) => state.user.currentUser);

  const getQuestions = () => {
    dispatch(getAllQuestions());
  };

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <div className="page-layout">
      {questions && <Dashboard questions={questions} user={currentUser} />}
    </div>
  );
}

export default Home;
