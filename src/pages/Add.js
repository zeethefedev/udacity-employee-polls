import React from "react";
import AddForm from "../components/add/AddForm";

function Add() {
  return (
    <div>
      <h1>Add new question</h1>
      <AddForm initialInputs={["option-one", "option-two"]} />
    </div>
  );
}

export default Add;
