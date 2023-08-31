import React from "react";
import "./App.css";
import Calculator from "./components/Calculator";


export default (_) => {
  return (
    <React.Fragment>
      <div className="app">
          <Calculator/>
      </div>
    </React.Fragment>
  );
};
