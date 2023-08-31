import React from "react";
import "./Calculator.css";
import Button from "./Button";
import Display from "./Display";

const initialState = {
  displayValue: "0",
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
};

export default class Calculator extends React.Component {
  state = { ...initialState };
  constructor(props) {
    super(props);
    this.clearMemory = this.clearMemory.bind(this);
    this.setOperation = this.setOperation.bind(this);
    this.addDigit = this.addDigit.bind(this);
  }

  clearMemory(_) {
    this.setState({ ...initialState });
  }

  setOperation(operation) {
    if (this.state.current === 0 && operation === "%") {
      const values = [...this.state.values];
      values[0] = values[0] / 100;
      this.setState({ displayValue: values[0], values });
    } else if (this.state.current === 0 && operation !== "%") {
      this.setState({
        operation,
        current: 1,
        clearDisplay: true,
        displayValue: "0",
      });
    } else if (this.state.current === 1 && operation === "%") {
      const values = [...this.state.values];
      values[1] = values[1] / 100;
      this.setState({ displayValue: values[1], values });
    } else {
      const equals = operation === "=";
      const currentOperation = this.state.operation;
      const values = [...this.state.values];
      let value = 0;
      switch (currentOperation) {
        case "/":
          value = parseFloat(values[0]) / parseFloat(values[1]);
          break;
        case "*":
          value = parseFloat(values[0]) * parseFloat(values[1]);
          break;
        case "-":
          value = parseFloat(values[0]) - parseFloat(values[1]);
          break;
        case "+":
          value = parseFloat(values[0]) + parseFloat(values[1]);
          break;
        default:
          break;
      }

      values[0] = value;
      values[1] = 0;
      this.setState({
        displayValue: values[0].toString(),
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: !equals,
        values,
      });
    }
    console.log(this.state);
  }

  addDigit(digit) {
    if (digit === "." && this.state.displayValue.includes(".")) {
      return;
    }

    const clearDisplay =
      this.state.displayValue === "0" || this.state.clearDisplay;
    const currentValue = clearDisplay ? "" : this.state.displayValue;
    const displayValue = currentValue + digit;
    this.setState({ displayValue, clearDisplay: false });

    if (digit !== ".") {
      const i = this.state.current;
      const newValue = parseFloat(displayValue);
      const values = [...this.state.values];
      values[i] = newValue;
      this.setState({ values });
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.clearMemory}
        <div className="calculator">
          <Display
            newValue={this.state.displayValue}
            oldValue={this.state.values[0]}
            current={this.state.current}
          />
          <Button label="AC" click={this.clearMemory} double />
          <Button label="%" click={this.setOperation} />
          <Button label="/" click={this.setOperation} operation />
          <Button label="7" click={this.addDigit} />
          <Button label="8" click={this.addDigit} />
          <Button label="9" click={this.addDigit} />
          <Button label="*" click={this.setOperation} operation />
          <Button label="4" click={this.addDigit} />
          <Button label="5" click={this.addDigit} />
          <Button label="6" click={this.addDigit} />
          <Button label="-" click={this.setOperation} operation />
          <Button label="1" click={this.addDigit} />
          <Button label="2" click={this.addDigit} />
          <Button label="3" click={this.addDigit} />
          <Button label="+" click={this.setOperation} operation />
          <Button label="0" click={this.addDigit} double />
          <Button label="." click={this.addDigit} />
          <Button label="=" click={this.setOperation} operation />
        </div>
      </React.Fragment>
    );
  }
}
