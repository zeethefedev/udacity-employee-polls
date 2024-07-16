import React from "react";
import { Link } from "react-router-dom";

function Error() {
  return (
    <div className="p-6 md:px-28 md:py-11">
      <h1>Error</h1>
      <div>
        It's not you. It's us. Would you like to go back to the home page?
      </div>
      <Link to="/">Back to home</Link>
    </div>
  );
}

export default Error;
