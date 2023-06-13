#!/usr/bin/env node

import { program } from "commander";

import { add } from "./add.js";
import { create } from "./create.js";
import { VERSION } from "./config.js";

program.version(VERSION);

program
  .command("create")
  .description("根据模版创建")
  .action(() => create());

program
  .command("add")
  .description("添加工程化模块")
  .action(() => add());

program.parse(process.argv);
