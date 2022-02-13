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

const initialState = {
	previousNumber: "",
	currentNumber: "",
	selectedOperation: null,
	result: "0",
	isEquals: false,
	scientificMode: false,
	selectedScientificOperation: null
}

const CalculatorContainer = () => {
	const [calculatorState, setCalculatorState] = useState(initialState);

	const {
		previousNumber,
		currentNumber,
		selectedOperation,
		result,
		scientificMode,
		selectedScientificOperation
	} = calculatorState;
	
	useEffect(() => {
		console.log("came")
		calculateScientificOperators()
	}, [selectedScientificOperation])
	
	const numbersHandler = ({ target: { value } }) => {
		setCalculatorState(({ currentNumber }) => {
			return {
				...calculatorState,
				currentNumber: (currentNumber + value),
				result: (currentNumber + value),
			}
		})
	}
	
	const operatorsHandler = ({ target: { value } }) => {
		if(!currentNumber && !previousNumber) return calculatorState;
		
		if(previousNumber && !currentNumber && selectedOperation) {
			setCalculatorState({
				...calculatorState,
				selectedOperation: value
			})
			return;
		}
		
		if(!previousNumber) {
			setCalculatorState({
				...calculatorState,
				previousNumber: currentNumber,
				currentNumber: "",
				selectedOperation: value,
			})
		} else {
			setCalculatorState({
				...calculatorState,
				previousNumber: calculate(),
				result: calculate(),
				currentNumber: "",
				selectedOperation: value
			})
		}
	}
	
	const scientificOperatorsHandler = ({ target: { value } }) => {
		setCalculatorState({ ...calculatorState, selectedScientificOperation: value });
		calculateScientificOperators();
	}
	
	const setInitialState = () => {
		setCalculatorState(initialState)
	}
	
	const clearAll = () => {
		setInitialState();
	}
	
	const equals = () => {
		// Checking if every values are available to calculate
		if(!previousNumber || !currentNumber || !selectedOperation) return;
		
		// If every values are available
		setCalculatorState({
			...calculatorState,
			selectedOperation: null,
			currentNumber: "",
			result: calculate(),
			previousNumber: "",
			isEquals: true
		})
	}
	
	const computeNumbers = (formula) => {
		const isInvert = (formula === "invert");
		const isSquare = (formula === "square");
		const isSquareRoot = (formula === "squareRoot");
		
		const getResult = () => {
			if(isInvert) {
				return (currentNumber * -1)
			}
			if(isSquare) {
				return (currentNumber * currentNumber)
			}
			if(isSquareRoot) {
				return Math.sqrt(parseInt(currentNumber))
			}
		}
		
		if(!previousNumber) {
			setCalculatorState({
				...calculatorState,
				result: getResult().toString(),
				currentNumber: getResult().toString(),
			})
		} else {
			setCalculatorState(({currentNumber}) => {
				return {
					...calculatorState,
					currentNumber: (previousNumber && currentNumber) ? getResult().toString() : currentNumber,
					result: (previousNumber && currentNumber) ? getResult().toString() : currentNumber,
				}
			})
		}
	}
	

	const calculateScientificOperators = () => {
		switch(selectedScientificOperation) {
			case "(+/-)":
				computeNumbers("invert");
				break;
			case "x²":
				computeNumbers("square")
				break;
			case "√":
				computeNumbers("squareRoot")
				break;
			default:
				return calculatorState;
		}
	}
	
	const calculate = () => {
		let output;
		const firstOperand = parseInt(previousNumber);
		const secondOperand = parseInt(currentNumber);
		
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
			<h3 style={{ display: "flex", justifyContent: "flex-end", fontSize: "44px" }}>
				{result || "0"}
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
			<button
				onClick={() => setCalculatorState({...calculatorState, scientificMode: !scientificMode})}
			>
				On Scientific Mode
			</button>
			{(
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