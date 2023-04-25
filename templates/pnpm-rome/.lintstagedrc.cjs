module.exports = {
	"**/*.{js,jsx,ts,tsx,cjs,mjs}": [
		"rome format --write",
		"rome check --apply-unsafe",
	],
	"**/*.{md,json,html,css,yaml,yml}": ["rome format --write"],
};
