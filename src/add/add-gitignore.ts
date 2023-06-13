import { AddOptions, baseCopyFile } from "./add-base.js";

export function addGitignore(options: AddOptions) {
  baseCopyFile(options, "gitignore", ".gitignore");
}
