export const calculateExpression = (expr) => {
	try {
		// Replace mathematical symbols with JavaScript operators
		let processedExpr = expr
			.replace(/×/g, "*")
			.replace(/÷/g, "/")
			.replace(/\^/g, "**")
			.replace(/sin\(/g, "Math.sin(")
			.replace(/cos\(/g, "Math.cos(")
			.replace(/tan\(/g, "Math.tan(")
			.replace(/log\(/g, "Math.log10(")
			.replace(/ln\(/g, "Math.log(")
			.replace(/√\(/g, "Math.sqrt(")
			.replace(/π/g, "Math.PI");

		// Safe evaluation using Function constructor
		const result = new Function("return " + processedExpr)();

		// Format the result
		if (Number.isFinite(result)) {
			if (Math.abs(result) < 1e-10) return "0";
			if (Math.abs(result) > 1e10) return result.toExponential(8);
			return result.toString().slice(0, 10);
		}
		return "Error";
	} catch (error) {
		console.error("Calculation error:", error);
		return "Error";
	}
};

export const handleSpecialFunctions = (action, currentValue) => {
	const value = parseFloat(currentValue);
	switch (action) {
		case "SQR":
			return Math.pow(value, 2).toString();
		case "CUBE":
			return Math.pow(value, 3).toString();
		case "SQRT":
			return Math.sqrt(value).toString();
		case "INV":
			return (1 / value).toString();
		case "LOG":
			return Math.log10(value).toString();
		case "LN":
			return Math.log(value).toString();
		case "SIN":
			return Math.sin(value).toString();
		case "COS":
			return Math.cos(value).toString();
		case "TAN":
			return Math.tan(value).toString();
		default:
			return currentValue;
	}
};
