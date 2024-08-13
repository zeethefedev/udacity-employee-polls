import React from "react";
import { Link } from "react-router-dom";
import { clearStorage } from "../utils/utils.user";

function Error() {
  const handleClickHomelink = () => {
    clearStorage("CURRENT");
  };
  return (
    <div className="p-6 md:px-28 md:py-11">
      <h1>Error</h1>
      <div>
        It's not you. It's us. Would you like to go back to the home page?
      </div>
      <Link to="/" onClick={handleClickHomelink}>
        Back to home
      </Link>
    </div>
  );
}

export default Error;
