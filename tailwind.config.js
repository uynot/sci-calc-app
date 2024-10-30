/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				mono: ["Roboto Mono", "monospace"],
			},
			fontSize: {
				xs: "0.65rem",
				sm: "0.75rem",
				base: "0.875rem",
				lg: "1rem",
				xl: "1.125rem",
				"2xl": "1.25rem",
			},
		},
	},
	plugins: [],
};
