import fsExtra from "fs-extra";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const CWD_PATH = process.cwd();

export const ROOT_PATH = resolve(fileURLToPath(import.meta.url), "../../");

export const TEMPLATES_PATH = resolve(ROOT_PATH, "templates");

export const TEMPLATE_FILES_PATH = resolve(ROOT_PATH, "template-files");

export const VERSION = fsExtra.readJSONSync(
  resolve(ROOT_PATH, "package.json")
).version;
