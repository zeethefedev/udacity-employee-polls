import React, { useState } from "react";
import Form from "../generics/Form";
import { useDispatch, useSelector } from "react-redux";
import { toObject } from "../../utils/utils.login";
import { addQuestion } from "../../store/question.thunk";

function AddForm({ initialInputs }) {
  const [inputGroup, setInputGroup] = useState(toObject(initialInputs));
  const errorForm = useSelector((state) => state.question.error);
  const message = useSelector((state) => state.question.message);
  const loading = useSelector((state) => state.question.loading);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const handleSetInputGroup = (newInputs) => {
    setInputGroup(newInputs);
  };

  const validateQuestions = () => {
    const validForm = inputGroup.every((input) => input.value && input.touched);
    if (validForm) {
      const [optionOneText, optionTwoText] = inputGroup.map(
        (input) => input.value
      );
      dispatch(
        addQuestion({
          author: user.id,
          optionOneText,
          optionTwoText,
        })
      );
    }
  };

  const buttonDisabled =
    inputGroup.every((inp) => inp.touched) &&
    inputGroup.some((inp) => !inp.value);

  return (
    <Form
      heading="Would you rather..."
      inputGroup={inputGroup}
      buttonText="Add new question"
      buttonDisabled={buttonDisabled}
      handleSetInputGroup={handleSetInputGroup}
      handleValidateForm={validateQuestions}
      loading={loading}
      message={message}
      errorForm={errorForm}
    />
  );
}

export default AddForm;
