import React, { useState } from "react";
import { Card } from "./ui/Card";

const Calculator = () => {
	const [display, setDisplay] = useState("0");
	const [memory, setMemory] = useState(0);
	const [formula, setFormula] = useState("");
	const [isNewCalculation, setIsNewCalculation] = useState(true);
	const [programSlots, setProgramSlots] = useState(Array(6).fill(""));

	// Handle digit and operator input
	const handleInput = (value) => {
		if (isNewCalculation) {
			setDisplay(value);
			setIsNewCalculation(false);
		} else {
			setDisplay(display === "0" ? value : display + value);
		}
	};

	// Clear display
	const handleClear = () => {
		setDisplay("0");
		setFormula("");
		setIsNewCalculation(true);
	};

	// Calculate result
	const calculateResult = () => {
		try {
			// Using Function constructor for safe evaluation
			const result = new Function("return " + formula + display)();
			setDisplay(String(result));
			setFormula("");
			setIsNewCalculation(true);
		} catch (error) {
			setDisplay("Error");
			setIsNewCalculation(true);
		}
	};

	// Handle operator clicks
	const handleOperator = (operator) => {
		setFormula(formula + display + operator);
		setIsNewCalculation(true);
	};

	// Memory functions
	const handleMemory = (action) => {
		switch (action) {
			case "M+":
				setMemory(memory + parseFloat(display));
				break;
			case "M-":
				setMemory(memory - parseFloat(display));
				break;
			case "MR":
				setDisplay(String(memory));
				break;
			case "MC":
				setMemory(0);
				break;
		}
		setIsNewCalculation(true);
	};

	// Scientific functions
	const handleScientific = (func) => {
		const num = parseFloat(display);
		let result;
		switch (func) {
			case "sin":
				result = Math.sin(num);
				break;
			case "cos":
				result = Math.cos(num);
				break;
			case "tan":
				result = Math.tan(num);
				break;
			case "sqrt":
				result = Math.sqrt(num);
				break;
			case "log":
				result = Math.log10(num);
				break;
			case "ln":
				result = Math.log(num);
				break;
		}
		setDisplay(String(result));
		setIsNewCalculation(true);
	};

	// Program slots
	const handleProgram = (slot, mode) => {
		if (mode === "save") {
			setProgramSlots((slots) => {
				const newSlots = [...slots];
				newSlots[slot] = display;
				return newSlots;
			});
		} else if (mode === "recall") {
			if (programSlots[slot]) {
				setDisplay(programSlots[slot]);
			}
		}
	};

	const ButtonClass = "p-2 text-sm bg-gray-200 hover:bg-gray-300 rounded-lg m-1";
	const OperatorButtonClass = "p-2 text-sm bg-orange-200 hover:bg-orange-300 rounded-lg m-1";
	const ScientificButtonClass = "p-2 text-sm bg-blue-200 hover:bg-blue-300 rounded-lg m-1";

	return (
		<Card className="p-4 max-w-md mx-auto bg-gray-100">
			<div className="mb-4 p-2 bg-white rounded-lg">
				<div className="text-right text-xl font-mono">{display}</div>
				<div className="text-right text-sm text-gray-500">{formula}</div>
			</div>

			{/* Memory and Program Buttons */}
			<div className="grid grid-cols-6 gap-1 mb-2">
				<button onClick={() => handleMemory("MC")} className={ScientificButtonClass}>
					MC
				</button>
				<button onClick={() => handleMemory("MR")} className={ScientificButtonClass}>
					MR
				</button>
				<button onClick={() => handleMemory("M+")} className={ScientificButtonClass}>
					M+
				</button>
				<button onClick={() => handleMemory("M-")} className={ScientificButtonClass}>
					M-
				</button>
			</div>

			{/* Scientific Functions */}
			<div className="grid grid-cols-6 gap-1 mb-2">
				<button onClick={() => handleScientific("sin")} className={ScientificButtonClass}>
					sin
				</button>
				<button onClick={() => handleScientific("cos")} className={ScientificButtonClass}>
					cos
				</button>
				<button onClick={() => handleScientific("tan")} className={ScientificButtonClass}>
					tan
				</button>
				<button onClick={() => handleScientific("sqrt")} className={ScientificButtonClass}>
					√
				</button>
				<button onClick={() => handleScientific("log")} className={ScientificButtonClass}>
					log
				</button>
				<button onClick={() => handleScientific("ln")} className={ScientificButtonClass}>
					ln
				</button>
			</div>

			{/* Program Slots */}
			<div className="grid grid-cols-6 gap-1 mb-2">
				{[0, 1, 2, 3, 4, 5].map((slot) => (
					<button
						key={slot}
						onClick={() => handleProgram(slot, "recall")}
						onContextMenu={(e) => {
							e.preventDefault();
							handleProgram(slot, "save");
						}}
						className={ScientificButtonClass}>
						P{slot + 1}
					</button>
				))}
			</div>

			{/* Number Pad and Basic Operators */}
			<div className="grid grid-cols-4 gap-1">
				<button onClick={handleClear} className={OperatorButtonClass}>
					C
				</button>
				<button onClick={() => handleInput("(")} className={OperatorButtonClass}>
					(
				</button>
				<button onClick={() => handleInput(")")} className={OperatorButtonClass}>
					)
				</button>
				<button onClick={() => handleOperator("/")} className={OperatorButtonClass}>
					÷
				</button>

				<button onClick={() => handleInput("7")} className={ButtonClass}>
					7
				</button>
				<button onClick={() => handleInput("8")} className={ButtonClass}>
					8
				</button>
				<button onClick={() => handleInput("9")} className={ButtonClass}>
					9
				</button>
				<button onClick={() => handleOperator("*")} className={OperatorButtonClass}>
					×
				</button>

				<button onClick={() => handleInput("4")} className={ButtonClass}>
					4
				</button>
				<button onClick={() => handleInput("5")} className={ButtonClass}>
					5
				</button>
				<button onClick={() => handleInput("6")} className={ButtonClass}>
					6
				</button>
				<button onClick={() => handleOperator("-")} className={OperatorButtonClass}>
					-
				</button>

				<button onClick={() => handleInput("1")} className={ButtonClass}>
					1
				</button>
				<button onClick={() => handleInput("2")} className={ButtonClass}>
					2
				</button>
				<button onClick={() => handleInput("3")} className={ButtonClass}>
					3
				</button>
				<button onClick={() => handleOperator("+")} className={OperatorButtonClass}>
					+
				</button>

				<button onClick={() => handleInput("0")} className={ButtonClass}>
					0
				</button>
				<button onClick={() => handleInput(".")} className={ButtonClass}>
					.
				</button>
				<button onClick={() => handleInput("E")} className={ButtonClass}>
					EXP
				</button>
				<button onClick={calculateResult} className="p-2 text-sm bg-green-500 hover:bg-green-600 text-white rounded-lg m-1">
					=
				</button>
			</div>
		</Card>
	);
};

export default Calculator;
