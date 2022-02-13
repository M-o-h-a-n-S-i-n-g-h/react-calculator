import React from "react";

const CalculatorButton = ({ value, onClick, children, ...rest }) => {
	return (
		<button value={value} onClick={onClick} {...rest}>
			{children}
		</button>
	);
};

export default CalculatorButton;
