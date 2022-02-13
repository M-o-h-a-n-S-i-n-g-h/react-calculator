import React from "react";
import CalculatorButton from "./CalculatorButton";

const NumberButtons = ({ numbers, onClickHandlers }) => {
	const [equals, clearAll, numbersHandler] = onClickHandlers;

	return (
		<>
			{numbers.map((number, index) => {
				const isEqualsButton = (number === "=");
				const isClearButton = (number === "Clear");

				return (
					<CalculatorButton
						key={index}
						value={number}
						onClick={isEqualsButton ? equals : isClearButton ? clearAll : numbersHandler}
					>
						{number}
					</CalculatorButton>
				);
			})}
		</>
	);
};

export default NumberButtons;