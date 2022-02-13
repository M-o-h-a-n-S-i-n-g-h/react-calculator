import React, { useEffect, useState } from "react";
import styles from "./calculatorButtons.module.css";
import CalculatorButton from "./CaculatorButton";

const numbers = [
	"1", "2", "3",
	"4", "5", "6",
	"7", "8", "9",
	"Clear", "0", "="
]
const operators = ["+", "-", "*", "/"];
const scientificModeOperators = ["(+/-)", "x²", "√"];

const CalculatorContainer = () => {
	const [previousNumber, setPreviousNumber] = useState("");
	const [currentNumber, setCurrentNumber] = useState("");
	const [selectedOperation, setSelectedOperation] = useState(null);
	const [result, setResult] = useState("0");
	const [scientificModeOn, setScientificModeOn] = useState(false);
	
	useEffect(() => {
		calculate();
	}, [selectedOperation])
	
	const numbersHandler = ({ target: { value } }) => {
		setCurrentNumber(currentNumber + value)
		setResult(currentNumber + value)
	}

	const operatorsHandler = ({ target: { value } }) => {
		if(selectedOperation) setCurrentNumber("")
		
		if(!previousNumber) {
			setPreviousNumber(currentNumber)
		} else if(previousNumber && currentNumber) {
			setPreviousNumber(calculate());
			setResult(calculate());
		}
		
		setSelectedOperation(value)
		setCurrentNumber("")
	}
	
	const scientificOperatorsHandler = ({ target: { value } }) => {
		setSelectedOperation(value);
		// setCurrentNumber("")
	}
	
	const setInitialState = () => {
		setPreviousNumber("")
		setCurrentNumber("")
		setResult("0");
		setSelectedOperation("")
	}
	
	const clearAll = () => {
		setInitialState();
	}
	
	const equals = () => {
		if(previousNumber && currentNumber) {
			calculate();
		}
		
		if(selectedOperation && !currentNumber) return;
		if(!selectedOperation) return;
		
		setResult(calculate());
		setPreviousNumber(calculate());
		setCurrentNumber("");
		setSelectedOperation("");
	}
	
	const calculate = () => {
		let output;
		const firstOperand = parseFloat(previousNumber);
		const secondOperand = parseFloat(currentNumber);
		
		switch (selectedOperation) {
			case "+":
				output = firstOperand + secondOperand;
				break;
			case "-":
				output = firstOperand - secondOperand;
				break;
			case "*":
				output = firstOperand * secondOperand;
				break;
			case "/":
				output = firstOperand / secondOperand;
				break;
			case "(+/-)":
				if(!firstOperand && !secondOperand) return;
				
				if(firstOperand) setPreviousNumber((firstOperand * -1).toString())
				
				if(secondOperand) setCurrentNumber((secondOperand * -1).toString())

				if(result) {
					setResult((result * -1).toString());
					output = (result * -1).toString();
				}
				
				setSelectedOperation("");
				break;
			case "x²":
				break;
			case "√":
				break;
			default:
				output = "0";
				break;
		}
		
		return output;
	}

	const getPlaceHolder = (button) => {
		switch (button) {
			case "+":
				return "Add (+)"
			case "-":
				return "Subtract (-)"
			case "*":
				return "Multiply (*)"
			case "/":
				return "Divide (/)"
			default:
				return button
		}
	}
	
	return (
		<div>
			<h3 style={{ display: "flex", justifyContent: "flex-end" }}>
				{result}
			</h3>
			<div style={{ display: "flex" }}>
				<div className={styles.buttonsLayout}>
					{numbers.map((button, index) => (
						<CalculatorButton
							key={index}
							value={button}
							onClick={(button === "Clear") ? clearAll : (button === "=") ? equals : numbersHandler}
						>
							{button}
						</CalculatorButton>
					))}
				</div>
				<div style={{ display: "flex", flexDirection: "column" }}>
					{operators.map((operator, index) => (
						<CalculatorButton
							key={index}
							style={{ width: "100px", height: "50px"}}
							value={operator}
							onClick={operatorsHandler}
						>
							{getPlaceHolder(operator)}
						</CalculatorButton>
					))}
				</div>
			</div>
			<button onClick={() => setScientificModeOn(prevState => !prevState)}>
				On Scientific Mode
			</button>
			{scientificModeOn && (
				<div className="scientificButtons">
					{scientificModeOperators.map((operator, index) => (
						<CalculatorButton
							key={index}
							value={operator}
							onClick={scientificOperatorsHandler}
							style={{ width: "100px", height: "50px" }}
						>
							{operator}
						</CalculatorButton>
					))}
				</div>
			)}
		</div>
	)
}

export default CalculatorContainer;