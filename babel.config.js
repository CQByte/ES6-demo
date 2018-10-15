const presets = [
	["@babel/env", {
		targets: {
			chrome: "67",
			safari: "11.1"
		},
		useBuiltIns: "usage"
	}]
];

const plugins = [
		["@babel/plugin-transform-modules-umd"]
]

module.exports = { presets, plugins };