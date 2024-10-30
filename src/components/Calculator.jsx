import React, { useState, useEffect } from "react";
import { Card } from "../components/ui/Card";
import { buttonLayout } from "../components/buttonConfig";
import { calculateExpression, handleSpecialFunctions } from "../components/calculatorLogic";

const Calculator = () => {
	const [display, setDisplay] = useState({
		mode: "COMP",
		input: "",
		result: "0",
	});
	const [shiftMode, setShiftMode] = useState(false);
	const [alphaMode, setAlphaMode] = useState(false);
	const [lastAnswer, setLastAnswer] = useState("0");

	// audio feedback
	useEffect(() => {
		const audio = new Audio("/src/sound/click.mp3");
		audio.preload = "auto";
		return () => audio.remove();
	}, []);

	const playClickSound = () => {
		const audio = new Audio("/src/sound/click.mp3");
		audio.play().catch((e) => {
			// Silently handle audio play failure
			console.log("Audio play failed:", e);
		});
	};

	const getButtonClass = (type) => {
		const base = `
      p-2 text-sm md:text-base rounded-lg m-0.5 
      flex flex-col items-center justify-center 
      min-w-[45px] h-[45px] md:h-[50px]
      font-bold font-mono
      transition-colors duration-100
      active:transform active:scale-95
      relative
      select-none
    `;

		const styles = {
			number: `${base} bg-gray-700 text-white hover:bg-gray-600 active:bg-gray-800`,
			operator: `${base} bg-blue-200 hover:bg-blue-300 active:bg-blue-400`,
			function: `${base} bg-gray-200 hover:bg-gray-300 active:bg-gray-400`,
			shift: `${base} ${shiftMode ? "bg-orange-300" : "bg-orange-200"} active:bg-orange-400`,
			alpha: `${base} ${alphaMode ? "bg-green-300" : "bg-green-200"} active:bg-green-400`,
			delete: `${base} bg-red-200 hover:bg-red-300 active:bg-red-400`,
			clear: `${base} bg-red-300 hover:bg-red-400 active:bg-red-500`,
			execute: `${base} bg-green-500 hover:bg-green-600 active:bg-green-700 text-white`,
			orange: `${base} bg-orange-200 hover:bg-orange-300 active:bg-orange-400`,
		};
		return styles[type] || styles.function;
	};

	// Handle button press
	const handleButtonPress = (button) => {
		playClickSound();

		const action = shiftMode ? button.shifted || button.action : button.action;

		switch (action) {
			case "SHIFT":
				setShiftMode(!shiftMode);
				setAlphaMode(false);
				break;

			case "ALPHA":
				setAlphaMode(!alphaMode);
				setShiftMode(false);
				break;

			case "AC":
				setDisplay({ mode: "COMP", input: "", result: "0" });
				break;

			case "DEL":
				setDisplay((prev) => ({
					...prev,
					input: prev.input.slice(0, -1),
				}));
				break;

			case "EXE":
				const result = calculateExpression(display.input);
				setDisplay((prev) => ({
					...prev,
					result,
					input: "",
				}));
				setLastAnswer(result);
				break;

			case "ANS":
				setDisplay((prev) => ({
					...prev,
					input: prev.input + lastAnswer,
				}));
				break;

			default:
				if (["PLUS", "MINUS", "MULT", "DIV"].includes(action)) {
					const operators = { PLUS: "+", MINUS: "-", MULT: "×", DIV: "÷" };
					setDisplay((prev) => ({
						...prev,
						input: prev.input + operators[action],
					}));
				} else if (action.match(/^[0-9.]$/)) {
					setDisplay((prev) => ({
						...prev,
						input: prev.input + action,
					}));
				} else {
					const specialResult = handleSpecialFunctions(action, display.result);
					if (specialResult !== display.result) {
						setDisplay((prev) => ({
							...prev,
							result: specialResult,
							input: "",
						}));
					} else {
						setDisplay((prev) => ({
							...prev,
							input: prev.input + button.label,
						}));
					}
				}
		}

		// Reset shift/alpha after use unless it's a mode toggle
		if (action !== "SHIFT" && action !== "ALPHA") {
			setShiftMode(false);
			setAlphaMode(false);
		}
	};

	return (
		<Card className="w-full max-w-sm mx-auto bg-gray-100 p-2">
			{/* Calculator Display */}
			<div className="bg-[#e0e9e0] p-3 mb-3 font-mono rounded-lg shadow-inner">
				<div className="text-sm h-5 font-bold">{display.mode}</div>
				<div className="text-xl h-7 overflow-hidden font-bold">{display.input}</div>
				<div className="text-2xl text-right h-9 overflow-hidden font-bold">{display.result}</div>
			</div>

			{/* Button Layout */}
			<div className="grid gap-1">
				{buttonLayout.map((row, rowIndex) => (
					<div key={rowIndex} className={`grid gap-1 ${rowIndex === 0 ? "grid-cols-3" : rowIndex <= 3 ? "grid-cols-6" : "grid-cols-5"}`}>
						{row.map((button, index) => (
							<button key={`${rowIndex}-${index}`} onClick={() => handleButtonPress(button)} className={getButtonClass(button.type)}>
								<span className="text-base font-bold">{shiftMode && button.shifted ? button.shifted : button.label}</span>
								{button.shifted && (
									<span className="absolute top-0.5 right-0.5 text-[8px] text-orange-500 font-bold">{button.shifted}</span>
								)}
							</button>
						))}
					</div>
				))}
			</div>

			{/* Footer */}
			<div className="mt-4 text-xs text-gray-500 text-center">
				<p>
					This project is for academic and non-commercial use only. All product names, trademarks, and registered trademarks are property of
					their respective owners.
				</p>
			</div>
		</Card>
	);
};

export default Calculator;
