module.exports = {
  "**/*.{js,jsx,ts,tsx,cjs,mjs}": [
    "rome format --write",
    "rome check --apply-unsafe",
  ],
  "**/*.{json}": ["rome format --write"],
};
