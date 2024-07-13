import React from "react";
import AddForm from "../components/add/AddForm";

function Add({ user }) {
  return (
    <div>
      <h1>Add new question</h1>
      <AddForm initialInputs={["option-one", "option-two"]} user={user} />
    </div>
  );
}

export default Add;
