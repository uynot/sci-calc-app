export const buttonLayout = [
	// Row 0 - Control buttons
	[
		{ label: "SHIFT", type: "shift", shifted: "", action: "SHIFT" },
		{ label: "ALPHA", type: "alpha", shifted: "", action: "ALPHA" },
		{ label: "MODE", type: "function", shifted: "SETUP", action: "MODE" },
	],

	// Row 1 - Top function row
	[
		{ label: "Prog", type: "orange", shifted: "EXIT", action: "PROG" },
		{ label: "FMLA", type: "orange", shifted: "", action: "FMLA" },
		{ label: "x⁻¹", type: "function", shifted: "LOGIC", action: "INV" },
		{ label: "x³", type: "function", shifted: "∛", action: "CUBE" },
		{ label: "log", type: "function", shifted: "BIN", action: "LOG" },
		{ label: "ln", type: "function", shifted: "OCT", action: "LN" },
	],

	// Row 2 - Second function row
	[
		{ label: "a b/c", type: "function", shifted: "d/c", action: "FRAC" },
		{ label: "√", type: "function", shifted: "∛", action: "SQRT" },
		{ label: "x²", type: "function", shifted: "HEX", action: "SQR" },
		{ label: "^", type: "function", shifted: "10ˣ", action: "POW" },
		{ label: "sin", type: "function", shifted: "sin⁻¹", action: "SIN" },
		{ label: "cos", type: "function", shifted: "cos⁻¹", action: "COS" },
	],

	// Row 3 - Third function row
	[
		{ label: "(", type: "function", shifted: "STO", action: "LPAR" },
		{ label: ")", type: "function", shifted: "RCL", action: "RPAR" },
		{ label: "hyp", type: "function", shifted: "ENG", action: "HYP" },
		{ label: "tan", type: "function", shifted: "tan⁻¹", action: "TAN" },
		{ label: ",", type: "function", shifted: "π", action: "COMMA" },
		{ label: "M+", type: "function", shifted: "M-", action: "MPLUS" },
	],

	// Row 4 - Numbers start
	[
		{ label: "7", type: "number", shifted: "S-SUM", action: "7" },
		{ label: "8", type: "number", shifted: "S-VAR", action: "8" },
		{ label: "9", type: "number", shifted: "P-CMD", action: "9" },
		{ label: "DEL", type: "delete", shifted: "", action: "DEL" },
		{ label: "AC", type: "clear", shifted: "", action: "AC" },
	],

	// Row 5
	[
		{ label: "4", type: "number", shifted: "nPr", action: "4" },
		{ label: "5", type: "number", shifted: "nCr", action: "5" },
		{ label: "6", type: "number", shifted: "Pol", action: "6" },
		{ label: "×", type: "operator", shifted: "", action: "MULT" },
		{ label: "÷", type: "operator", shifted: "", action: "DIV" },
	],

	// Row 6
	[
		{ label: "1", type: "number", shifted: "DRG►", action: "1" },
		{ label: "2", type: "number", shifted: "Rec", action: "2" },
		{ label: "3", type: "number", shifted: "π", action: "3" },
		{ label: "+", type: "operator", shifted: "", action: "PLUS" },
		{ label: "-", type: "operator", shifted: "", action: "MINUS" },
	],

	// Row 7 - Bottom row
	[
		{ label: "0", type: "number", shifted: "Rnd", action: "0" },
		{ label: ".", type: "number", shifted: "Ran#", action: "DOT" },
		{ label: "EXP", type: "function", shifted: "", action: "EXP" },
		{ label: "Ans", type: "function", shifted: "", action: "ANS" },
		{ label: "EXE", type: "execute", shifted: "", action: "EXE" },
	],
];
