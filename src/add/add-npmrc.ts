import { AddOptions, baseCopyFile } from "./add-base.js";

export function addNpmrc(options: AddOptions) {
  baseCopyFile(options, ".npmrc", ".npmrc");
}
