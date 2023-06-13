import chalk from "chalk";
import prompts from "prompts";

import { AddOptions, ADD_ACTIONS, ADD_TYPES, AddType } from "./add-base.js";

export async function add(options: AddOptions) {
  const { moduleName = "" } = await prompts([
    {
      name: "moduleName",
      type: "select",
      message: "选择工程化模块",
      choices: ADD_TYPES.map((v) => ({ value: v, title: v })),
      initial: 0,
    },
  ]);

  try {
    const moduleAction = ADD_ACTIONS[moduleName as AddType];
    if (!moduleAction) {
      throw new Error(`${moduleName} 模块不存在！`);
    }
    moduleAction(options);
    console.log(chalk.green(`添加 ${moduleName} 模块成功！`));
  } catch (error) {
    console.log(chalk.red(`添加失败！${(error as Error).message}`));
  }
}
