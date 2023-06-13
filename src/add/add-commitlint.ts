import { AddOptions, baseCopyFile, baseWritePackageJson } from "./add-base.js";

export function addCommitlint(options: AddOptions) {
  baseCopyFile(options, ".commitlintrc.cjs");
  baseWritePackageJson(options, {
    scripts: {
      "lint:commitlint": "commitlint",
    },
    devDependencies: {
      "@commitlint/cli": "^17",
      "@commitlint/config-conventional": "^17",
    },
  });
}
