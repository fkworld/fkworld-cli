import { AddOptions, baseCopyFile } from "./add-base.js";

export function addGitattributes(options: AddOptions) {
  baseCopyFile(options, ".gitattributes", ".gitattributes");
}
