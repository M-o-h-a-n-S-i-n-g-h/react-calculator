import React from "react";
import CalculatorButton from "./CalculatorButton";

const getPlaceHolder = (operator) => {
  switch (operator) {
    case "+":
      return "Add (+)";
    case "-":
      return "Subtract (-)";
    case "*":
      return "Multiply (*)";
    case "/":
      return "Divide (/)";
    default:
      return operator;
  }
};

const buttonStyle = { width: "100px", height: "50px", marginBottom: "10px" }

const OperatorButtons = ({ operators, operatorsHandler }) => {
  return (
    <>
      {operators.map((operator, index) => (
        <CalculatorButton
          key={index}
          value={operator}
          onClick={operatorsHandler}
          style={buttonStyle}
        >
          {getPlaceHolder(operator)}
        </CalculatorButton>
      ))}
    </>
  )
}

export default OperatorButtons;