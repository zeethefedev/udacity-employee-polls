import React from "react";
import AddForm from "./AddForm";

function Add({ user }) {
  return (
    <div className="p-6 md:px-28 md:py-11">
      <h1>Add new question</h1>
      <AddForm initialInputs={["option-one", "option-two"]} user={user} />
    </div>
  );
}

export default Add;
