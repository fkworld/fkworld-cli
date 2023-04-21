import chalk from 'chalk'
import { program } from 'commander'
import fsExtra from 'fs-extra'
import prompts from 'prompts'

program
  .command('create')
  .description('根据模版创建')
  .action(() => create())

program
  .command('add')
  .description('添加工程化模块')
  .action(() => add())

program.parse(process.argv)

export async function create() {
  const templates = fsExtra.readdirSync('./templates')

  const response = await prompts([
    {
      name: 'templateName',
      type: 'select',
      message: '选择模版',
      choices: templates.map((template) => {
        return { value: template, title: template }
      }),
      initial: 0,
    },
  ])

  const { templateName } = response

  const sourcePath = `./templates/${templateName}`
  const distPath = `./${templateName}`

  if (!templateName || !fsExtra.existsSync(sourcePath)) {
    console.log(chalk.red('模版创建失败！原因：模版不存在。'))
  } else if (fsExtra.existsSync(distPath)) {
    console.log(chalk.red('模版创建失败！原因：目标目录已存在。'))
  } else {
    fsExtra.copySync(sourcePath, distPath)
    console.log(chalk.green(`模版 ${templateName} 创建成功！`))
  }
}

async function add() {
  console.log(chalk.blue('正在开发中...'))
}
