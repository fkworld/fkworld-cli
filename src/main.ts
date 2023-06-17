#!/usr/bin/env node

import { program } from "commander"

import { add, AddOptions } from "./add.js"
import { VERSION } from "./config.js"
import { create } from "./create.js"

program.version(VERSION)

program
  .command("create")
  .description("根据模版创建")
  .action(() => create())

program
  .command("add")
  .description("添加工程化模块")
  .option("-f, --force", "强制创建文件")
  .action((options: AddOptions) => add(options))

program.parse(process.argv)
