import chalk from "chalk";
import fsExtra from "fs-extra";
import { resolve } from "node:path";
import prompts from "prompts";
import { CWD_PATH, TEMPLATE_FILES_PATH } from "./config.js";

export type AddOptions = {
  force: boolean;
};

export async function add(options: AddOptions) {
  const { moduleName = "" } = await prompts([
    {
      name: "moduleName",
      type: "select",
      message: "选择工程化模块",
      choices: [
        ModuleType.gitignore,
        ModuleType.gitattributes,
        ModuleType.editorconfig,
      ].map((v) => ({ value: v, title: v })),
      initial: 0,
    },
  ]);

  switch (moduleName) {
    case ModuleType.gitignore:
      addGitignore(options);
      break;
    case ModuleType.gitattributes:
      addGitattributes(options);
      break;
    case ModuleType.editorconfig:
      addEditorconfig(options);
    default:
      console.log(chalk.red("添加失败！模块不存在！"));
      return;
  }
}

const enum ModuleType {
  gitignore = "gitignore",
  gitattributes = "gitattributes",
  editorconfig = "editorconfig",
}

function addGitignore(options: AddOptions) {
  baseCopyFile(options, "gitignore", ".gitignore");
  baseSuccessLog(ModuleType.gitignore);
}

function addGitattributes(options: AddOptions) {
  baseCopyFile(options, ".gitattributes", ".gitattributes");
  baseSuccessLog(ModuleType.gitattributes);
}

function addEditorconfig(options: AddOptions) {
  baseCopyFile(options, ".editorconfig", ".editorconfig");
  baseSuccessLog(ModuleType.editorconfig);
}

function baseCopyFile(
  options: AddOptions,
  sourceFilename: string,
  targetFilename: string = sourceFilename
) {
  if (!fsExtra.existsSync(resolve(TEMPLATE_FILES_PATH, sourceFilename))) {
    console.log(chalk.red(`添加失败！源文件 ${sourceFilename} 文件不存在！`));
    return false;
  }
  if (!options.force && fsExtra.existsSync(resolve(CWD_PATH, targetFilename))) {
    console.log(chalk.red(`添加失败！目标文件 ${targetFilename} 文件已存在！`));
    return false;
  }

  fsExtra.copyFileSync(
    resolve(TEMPLATE_FILES_PATH, sourceFilename),
    resolve(CWD_PATH, targetFilename)
  );
}

function baseSuccessLog(moduleName: string) {
  console.log(chalk.green(`添加 ${moduleName} 模块成功！`));
}
