import React from "react";
import CalculatorButton from "./CalculatorButton";

const ScientificOperatorButtons = ({ operators, onClickHandler }) => {
  return (
    <>
      {operators.map((operator, index) => (
        <CalculatorButton
          style={{ width: "100px", height: "50px" }}
          key={index}
          value={operator}
          onClick={onClickHandler}
        >
          {operator}
        </CalculatorButton>
      ))}
    </>
  )
}

export default ScientificOperatorButtons;