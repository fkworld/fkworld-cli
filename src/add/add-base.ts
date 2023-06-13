import fsExtra from "fs-extra";
import { resolve } from "node:path";

import { CWD_PATH, TEMPLATE_FILES_PATH } from "../config.js";
import { addEditorconfig } from "./add-editorconfig.js";
import { addGitattributes } from "./add-gitattributes.js";
import { addGitignore } from "./add-gitignore.js";
import { addNpmrc } from "./add-npmrc.js";

export type AddOptions = {
  force: boolean;
};

export const enum AddType {
  gitignore = "gitignore",
  gitattributes = "gitattributes",
  editorconfig = "editorconfig",
  npmrc = "npmrc",
}

export const ADD_TYPES = [
  AddType.gitignore,
  AddType.gitattributes,
  AddType.editorconfig,
  AddType.npmrc,
];

export const ADD_ACTIONS: Record<AddType, (options: AddOptions) => void> = {
  [AddType.gitignore]: addGitignore,
  [AddType.gitattributes]: addGitattributes,
  [AddType.editorconfig]: addEditorconfig,
  [AddType.npmrc]: addNpmrc,
};

export function baseCopyFile(
  options: AddOptions,
  sourceFilename: string,
  targetFilename: string = sourceFilename
) {
  if (!fsExtra.existsSync(resolve(TEMPLATE_FILES_PATH, sourceFilename))) {
    throw new Error(`源文件 ${sourceFilename} 文件不存在！`);
  }
  if (!options.force && fsExtra.existsSync(resolve(CWD_PATH, targetFilename))) {
    throw new Error(`目标文件 ${targetFilename} 文件已存在！`);
  }

  fsExtra.copyFileSync(
    resolve(TEMPLATE_FILES_PATH, sourceFilename),
    resolve(CWD_PATH, targetFilename)
  );
}
