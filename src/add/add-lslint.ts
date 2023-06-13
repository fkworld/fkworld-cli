import { AddOptions, baseCopyFile, baseWritePackageJson } from "./add-base.js";

export function addLslint(options: AddOptions) {
  baseCopyFile(options, ".ls-lint.yml");
  baseWritePackageJson(options, {
    scripts: {
      "lint:ls-lint": "ls-lint",
    },
    devDependencies: {
      "@ls-lint/ls-lint": "^2",
    },
  });
}
