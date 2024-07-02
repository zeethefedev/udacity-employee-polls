import React from "react";
import SVGIcon from "./SVGIcon";

function Message({ mode, text, className }) {
  return (
    <span className={`flex items-center gap-1 ${className}`}>
      {mode === "error" && <SVGIcon icon="error" viewBox="0 0 24 24" />}
      {text}
    </span>
  );
}

export default Message;
