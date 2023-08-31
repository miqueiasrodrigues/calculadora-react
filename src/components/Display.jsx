import React from "react";
import "./Display.css";

export default (props) => {
  const { oldValue, newValue, current } = props;
  return (
    <React.Fragment>
      <div
        className="display"
        style={
          oldValue != 0 && current == 1
            ? { justifyContent: "flex-start" }
            : { justifyContent: "center" }
        }
      >
        {oldValue != 0 && current == 1 ? (
          <div style={{ color: "rgb(101, 101, 101)" }}>{oldValue}</div>
        ) : (
          ""
        )}
        <div>{newValue}</div>
      </div>
    </React.Fragment>
  );
};
