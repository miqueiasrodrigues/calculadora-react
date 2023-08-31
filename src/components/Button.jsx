import React from "react";
import "./Button.css";

export default (props) => {
  return (
    <React.Fragment>
      <button
        className={`
        button 
        ${props.operation ? "operation" : ""}
        ${props.double ? "double" : ""}
      `}
      onClick={e => props.click && props.click(props.label)}
      >
        {props.label}
      </button>
    </React.Fragment>
  );
};
