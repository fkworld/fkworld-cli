#!/usr/bin/env node
import chalk from "chalk";
import { program } from "commander";
import fsExtra from "fs-extra";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import prompts from "prompts";

const FILE_PATH = fileURLToPath(import.meta.url);
const CWD_PATH = process.cwd();
const TEMPLATES_PATH = resolve(FILE_PATH, "../templates");
const TEMPLATE_FILES_PATH = resolve(FILE_PATH, "../template-files");
const PACKAGE_JSON_PATH = resolve(FILE_PATH, "../package.json");

program.version(fsExtra.readJSONSync(PACKAGE_JSON_PATH).version);

program
  .command("create")
  .description("根据模版创建")
  .action(() => create());

program
  .command("add")
  .description("添加工程化模块")
  .action(() => add());

program.parse(process.argv);

export async function create() {
  const templates = fsExtra.readdirSync(TEMPLATES_PATH);

  const response = await prompts([
    {
      name: "templateName",
      type: "select",
      message: "选择模版",
      choices: templates.map((template) => {
        return { value: template, title: template };
      }),
      initial: 0,
    },
  ]);

  const { templateName = "" } = response;

  const sourcePath = resolve(TEMPLATES_PATH, templateName);
  const distPath = resolve(CWD_PATH, templateName);

  if (!templateName || !fsExtra.existsSync(sourcePath)) {
    log("failByTemplateNotExist");
    return;
  }
  if (fsExtra.existsSync(distPath)) {
    log("failByTargetExist");
    return;
  }

  fsExtra.copySync(sourcePath, distPath);

  // .gitignore 文件不会被上传至 npm，所以只能上传 gitignore 文件，创建的时候重命名一下
  // See: https://github.com/npm/npm/issues/1862
  fsExtra.copyFileSync(
    resolve(TEMPLATE_FILES_PATH, "gitignore"),
    resolve(distPath, ".gitignore")
  );

  log("success");
}

async function add() {
  console.log(chalk.blue("正在开发中..."));
}

/**
 * @param {"success"|"failByTemplateNotExist"|"failByTargetExist"|"failByOtherReason"} logType
 * @param {string|undefined} logInfo
 */
function log(logType) {
  switch (logType) {
    case "success":
      console.log(chalk.green("模版创建成功"));
      break;
    case "failByTemplateNotExist":
      console.log(chalk.red("模版创建失败！模版不存在"));
      break;
    case "failByTargetExist":
      console.log(chalk.red("模版创建失败！目标目录已存在"));
      break;
    default:
      console.log(chalk.red("模版创建失败！原因可参考后续 error"));
      break;
  }
}
