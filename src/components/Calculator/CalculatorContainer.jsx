import React, { useState } from "react";
import styles from "./calculatorButtons.module.css";
import NumberButtons from "./NumberButtons";
import OperatorButtons from "./OperatorButtons";
import ScientificOperatorButtons from "./ScientificOperatorButtons";

const numbers = [
	"1", "2", "3",
	"4", "5", "6",
	"7", "8", "9",
	"Clear", "0", "=",
];

const operators = ["+", "-", "*", "/"];

const scientificModeOperators = ["(+/-)", "x²", "√"];

const initialState = {
	previousNumber: "",
	currentNumber: "",
	selectedOperation: null,
	result: "0",
	isEquals: false,
	scientificMode: false,
	selectedScientificOperation: null,
};

const CalculatorContainer = () => {
	const [calculatorState, setCalculatorState] = useState(initialState);

	const {
		previousNumber,
		currentNumber,
		selectedOperation,
		result,
		scientificMode,
	} = calculatorState;

	const numbersHandler = ({ target: { value } }) => {
		if(!currentNumber && !previousNumber && value === "0") return;
		
		if(
			(previousNumber && value === "0") ||
			(!currentNumber && value !== 0) ||
			(currentNumber)
		) {
			setCalculatorState(({ currentNumber }) => {
				return {
					...calculatorState,
					currentNumber: currentNumber + value,
					result: currentNumber + value,
				};
			});
		}
	};

	const operatorsHandler = ({ target: { value } }) => {
		if (!currentNumber && !previousNumber) return calculatorState;

		if (previousNumber && !currentNumber && selectedOperation) {
			setCalculatorState({
				...calculatorState,
				selectedOperation: value,
			});
			return;
		}

		if (!previousNumber) {
			setCalculatorState({
				...calculatorState,
				previousNumber: currentNumber,
				currentNumber: "",
				selectedOperation: value,
			});
		} else {
			setCalculatorState({
				...calculatorState,
				previousNumber: computeNumbersForBasicOperations(),
				result: computeNumbersForBasicOperations(),
				currentNumber: "",
				selectedOperation: value,
			});
		}
	};
	
	const scientificOperatorsHandler = ({ target: { value } }) => {
		switchScientificOperators(value);
	};
	
	const toggleScientificMode = () => {
		setCalculatorState({
			...calculatorState,
			scientificMode: !scientificMode,
		})
	}
	
	const clearAll = () => {
		setCalculatorState(initialState);
	};

	const equals = () => {
		if (!previousNumber || !currentNumber || !selectedOperation) return;

		setCalculatorState({
			...calculatorState,
			selectedOperation: null,
			currentNumber: computeNumbersForBasicOperations(),
			result: computeNumbersForBasicOperations(),
			previousNumber: "",
		});
	};
	
	const computeNumbersForBasicOperations = () => {
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
	};

	const computeNumbersForScientificOperators = (formula) => {
		const isInvert = (formula === "invert");
		const isSquare = (formula === "square");
		const isSquareRoot = (formula === "squareRoot");

		const getResult = () => {
			if (isInvert) {
				return result ? (result * -1) : (currentNumber * -1);
			}
			if (isSquare) {
				return result ? (result * result) : (currentNumber * currentNumber);
			}
			if (isSquareRoot) {
				return result ? Math.sqrt(Number(result)) : Math.sqrt(Number(currentNumber));
			}
		};
		
		let computedResult = isNaN(getResult()) ? "Math Error" : getResult().toString();

		if (!previousNumber) {
			setCalculatorState({
				...calculatorState,
				result: computedResult,
				currentNumber: getResult().toString(),
			});
		} else if (currentNumber) {
			setCalculatorState(() => {
				return {
					...calculatorState,
					result: computedResult,
					currentNumber: getResult().toString()
				};
			});
		}
	};
	
	const switchScientificOperators = (operation) => {
		switch (operation) {
			case "(+/-)":
				computeNumbersForScientificOperators("invert");
				break;
			case "x²":
				computeNumbersForScientificOperators("square");
				break;
			case "√":
				computeNumbersForScientificOperators("squareRoot");
				break;
			default:
				return calculatorState;
		}
	};

	return (
		<div>
			<h3 className={styles.result}>
				{result || "0"}
			</h3>
			<div className={styles.calculatorLayout}>
				<div className={styles.numberButtonsLayout}>
					<NumberButtons numbers={numbers} onClickHandlers={[equals, clearAll, numbersHandler]} />
				</div>
				<div className={styles.scientificNumbersLayout}>
					<OperatorButtons operators={operators} operatorsHandler={operatorsHandler} />
				</div>
			</div>
			<div className={styles.scientificOperatorsAndToggleButton}>
				{scientificMode && (
					<ScientificOperatorButtons
						operators={scientificModeOperators}
						onClickHandler={scientificOperatorsHandler}
					/>
				)}
				<button onClick={toggleScientificMode} className={styles.scientificToggleButton}>
					{`${scientificMode ? "Off" : "On"} Scientific Mode`}
				</button>
			</div>
		</div>
	);
};

export default CalculatorContainer;