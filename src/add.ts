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
        { value: ModuleType.gitignore, title: "gitignore" },
        { value: ModuleType.gitattributes, title: "gitattributes" },
      ],
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
    default:
      console.log(chalk.red("添加失败！模块不存在！"));
      return;
  }
}

const enum ModuleType {
  gitignore = "gitignore",
  gitattributes = "gitattributes",
}

function addGitignore(options: AddOptions) {
  if (!options.force && fsExtra.existsSync(resolve(CWD_PATH, ".gitignore"))) {
    console.log(chalk.red("添加失败！.gitignore 文件已存在！"));
    return;
  }

  // .gitignore 文件不会被上传至 npm，所以只能上传 gitignore 文件，创建的时候重命名一下
  // See: https://github.com/npm/npm/issues/1862
  fsExtra.copyFileSync(
    resolve(TEMPLATE_FILES_PATH, "gitignore"),
    resolve(CWD_PATH, ".gitignore")
  );

  console.log(chalk.green("添加 gitignore 模块成功！"));
}

function addGitattributes(options: AddOptions) {
  if (
    !options.force &&
    fsExtra.existsSync(resolve(CWD_PATH, ".gitattributes"))
  ) {
    console.log(chalk.red("添加失败！.gitattributes 文件已存在！"));
    return;
  }

  fsExtra.copyFileSync(
    resolve(TEMPLATE_FILES_PATH, ".gitattributes"),
    resolve(CWD_PATH, ".gitattributes")
  );

  console.log(chalk.green("添加 gitattributes 模块成功！"));
}
