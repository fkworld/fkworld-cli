import fsExtra from "fs-extra";
import { resolve } from "node:path";
import prompts from "prompts";
import chalk from "chalk";

import { CWD_PATH, TEMPLATES_PATH, TEMPLATE_FILES_PATH } from "./config.js";

export async function create() {
  const templates = fsExtra.readdirSync(TEMPLATES_PATH);
  const templatesChoices = templates.map((template) => {
    return { value: template, title: template };
  });

  const { templateName = "" } = await prompts([
    {
      name: "templateName",
      type: "select",
      message: "选择模版",
      choices: templatesChoices,
      initial: 0,
    },
  ]);

  const sourcePath = resolve(TEMPLATES_PATH, templateName);
  const distPath = resolve(CWD_PATH, templateName);

  if (!templateName || !fsExtra.existsSync(sourcePath)) {
    console.log(chalk.red("模版创建失败！模版不存在"));
    return;
  }

  if (fsExtra.existsSync(distPath)) {
    console.log(chalk.red("模版创建失败！目标目录已存在"));
    return;
  }

  fsExtra.copySync(sourcePath, distPath);

  // .gitignore 文件不会被上传至 npm，所以只能上传 gitignore 文件，创建的时候重命名一下
  // See: https://github.com/npm/npm/issues/1862
  fsExtra.copyFileSync(
    resolve(TEMPLATE_FILES_PATH, "gitignore"),
    resolve(distPath, ".gitignore")
  );

  console.log(chalk.green("模版创建成功"));
}
