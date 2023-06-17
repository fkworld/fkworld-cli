import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import { fileURLToPath } from "node:url"

export const CWD_PATH = process.cwd()

export const ROOT_PATH = resolve(fileURLToPath(import.meta.url), "../../")

export const TEMPLATES_PATH = resolve(ROOT_PATH, "templates")

export const TEMPLATE_FILES_PATH = resolve(ROOT_PATH, "template-files")

export const VERSION = getVersion()

function getVersion() {
  const packageJsonPath = resolve(ROOT_PATH, "package.json")
  const packageJsonString = readFileSync(packageJsonPath, "utf-8")
  const packageJsonObj = JSON.parse(packageJsonString)
  return packageJsonObj.version
}
