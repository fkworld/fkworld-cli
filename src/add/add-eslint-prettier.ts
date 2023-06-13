import { AddOptions, baseCopyFile, baseWritePackageJson } from "./add-base.js";

export function addEslintPrettier(options: AddOptions) {
  baseCopyFile(options, ".prettierrc.json");
  baseCopyFile(options, ".eslintrc.json");
  baseWritePackageJson(options, {
    devDependencies: {
      "@typescript-eslint/eslint-plugin": "^5",
      "@typescript-eslint/parser": "^5",
      eslint: "^8",
      "eslint-config-prettier": "^8",
      "eslint-plugin-import": "^2",
      "eslint-plugin-react": "^7",
      "eslint-plugin-react-hooks": "^4",
      "eslint-plugin-simple-import-sort": "^8",
      prettier: "^2",
    },
  });
}
