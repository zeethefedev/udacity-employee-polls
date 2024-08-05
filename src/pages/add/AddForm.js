import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addQuestion } from "../../store/question.thunk";
import Form from "../../components/Form";

function AddForm({ initialInputs, user }) {
  const errorForm = useSelector((state) => state.question.error);
  const message = useSelector((state) => state.question.message);
  const loading = useSelector((state) => state.question.loading);
  const dispatch = useDispatch();

  const handleValidateForm = (inputGroup) => {
    const validForm = inputGroup.every((input) => input.value && input.touched);
    if (validForm) {
      const [optionOneText, optionTwoText] = inputGroup.map(
        (input) => input.value
      );
      const newQuestion = { author: user.id, optionOneText, optionTwoText };
      dispatch(addQuestion(newQuestion));
    }
  };

  const buttonDisabled = (inputGroup) => {
    return (
      inputGroup.every((inp) => inp.touched) &&
      inputGroup.some((inp) => !inp.value)
    );
  };

  return (
    <Form
      heading="Would you rather..."
      initialInputs={initialInputs}
      buttonText="Add new question"
      buttonDisabled={buttonDisabled}
      handleValidateForm={handleValidateForm}
      loading={loading}
      message={message}
      errorForm={errorForm}
    />
  );
}

export default AddForm;
