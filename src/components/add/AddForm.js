import React, { useState } from "react";
import Form from "../generics/Form";
import { useDispatch, useSelector } from "react-redux";

const INPUTS = [
  { name: "question", value: "", touched: false },
  { name: "option 1", value: "", touched: false },
  { name: "option 2", value: "", touched: false },
];

function AddForm() {
  const [inputGroup, setInputGroup] = useState(INPUTS);
  const errorForm = useSelector((state) => state.question.error);
  const message = useSelector((state) => state.question.message);
  const loading = useSelector((state) => state.question.loading);
  const dispatch = useDispatch();

  const handleSetInputGroup = (newInputs) => {
    setInputGroup(newInputs);
  };

  const validateQuestions = () => {
    const validForm = inputGroup.every((input) => input.value && input.touched);
    if (validForm) {
      const question = inputGroup[0].value;
      const optionOne = inputGroup[1].value;
      const optionTwo = inputGroup[2].value;
      //   dispatch(login({ username, password }));
    }
  };

  return (
    <Form
      inputGroup={inputGroup}
      buttonText="Add new question"
      handleSetInputGroup={handleSetInputGroup}
      handleValidateForm={validateQuestions}
      loading={loading}
      message={message}
      errorForm={errorForm}
    />
  );
}

export default AddForm;
