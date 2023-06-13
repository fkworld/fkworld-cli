import { AddOptions, baseCopyFile, baseWritePackageJson } from "./add-base.js";

export function addHusky(options: AddOptions) {
  baseCopyFile(options, ".husky");
  baseWritePackageJson(options, {
    scripts: { prepare: "husky install" },
    devDependencies: { husky: "^8" },
  });
}
