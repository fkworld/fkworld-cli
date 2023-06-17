import { copyFileSync, existsSync, readdirSync } from "node:fs"
import { resolve } from "node:path"

import chalk from "chalk"
import prompts from "prompts"

import { CWD_PATH, TEMPLATE_FILES_PATH, TEMPLATES_PATH } from "./config.js"
import { copySync } from "./utils.js"

export async function create() {
  const templates = readdirSync(TEMPLATES_PATH)
  const templatesChoices = templates.map((template) => {
    return { value: template, title: template }
  })

  const { templateName = "" } = await prompts([
    {
      name: "templateName",
      type: "select",
      message: "选择模版",
      choices: templatesChoices,
      initial: 0,
    },
  ])

  const sourcePath = resolve(TEMPLATES_PATH, templateName)
  const distPath = resolve(CWD_PATH, templateName)

  if (!templateName || !existsSync(sourcePath)) {
    console.log(chalk.red("模版创建失败！模版不存在"))
    return
  }

  if (existsSync(distPath)) {
    console.log(chalk.red("模版创建失败！目标目录已存在"))
    return
  }

  copySync(sourcePath, distPath)

  // .gitignore 文件不会被上传至 npm，所以需要重新上传一次
  // See: https://github.com/npm/npm/issues/1862
  copyFileSync(
    resolve(TEMPLATE_FILES_PATH, "template_.gitignore"),
    resolve(distPath, ".gitignore"),
  )

  console.log(chalk.green("模版创建成功"))
}
