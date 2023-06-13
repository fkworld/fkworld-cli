import { AddOptions, baseCopyFile, baseWritePackageJson } from "./add-base.js";

export function addTypescript(options: AddOptions) {
  baseCopyFile(options, "tsconfig.json");
  baseWritePackageJson(options, {
    scripts: {
      "lint:tsc": "tsc",
    },
    dependencies: {
      typescript: "^5",
    },
  });
}
