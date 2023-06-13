import { AddOptions, baseCopyFile } from "./add-base.js";

export function addEditorconfig(options: AddOptions) {
  baseCopyFile(options, ".editorconfig", ".editorconfig");
}
