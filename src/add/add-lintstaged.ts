import { AddOptions, baseCopyFile, baseWritePackageJson } from "./add-base.js";

export function addLintstaged(options: AddOptions) {
  baseCopyFile(options, ".lintstagedrc.cjs");
  baseWritePackageJson(options, {
    scripts: {
      "lint:lint-staged": "lint-staged",
    },
    devDependencies: {
      "lint-staged": "^13",
    },
  });
}
