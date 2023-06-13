import { resolve } from "node:path";

import chalk from "chalk";
import fsExtra from "fs-extra";
import { merge } from "lodash-es";
import prompts from "prompts";

import { CWD_PATH, TEMPLATE_FILES_PATH } from "./config.js";

export type AddOptions = {
  force: boolean;
};

export async function add(options: AddOptions) {
  const res = await prompts([
    {
      name: "moduleNames",
      type: "multiselect",
      message: "选择工程化模块",
      choices: Object.keys(ADD_ACTIONS).map((v) => ({ value: v, title: v })),
      initial: 0,
    },
  ]);

  res.moduleNames.forEach((moduleName: string) => {
    try {
      const action = ADD_ACTIONS[moduleName as AddType];
      if (!action) {
        throw new Error(`${moduleName} 模块不存在！`);
      }
      action.overrideFiles.forEach((filename) => baseCopy(options, filename));
      baseWritePackageJson(options, action.overridePackageJsonInfo);
      console.log(chalk.green(`添加 ${moduleName} 模块成功！`));
    } catch (error) {
      console.log(chalk.red(`添加失败！${(error as Error).message}`));
    }
  });
}

const enum AddType {
  commitlint = "commitlint",
  editorconfig = "editorconfig",
  eslintPrettier = "eslintPrettier",
  gitattributes = "gitattributes",
  gitignore = "gitignore",
  husky = "husky",
  lintstaged = "lintstaged",
  lslint = "lslint",
  npmrc = "npmrc",
  typescript = "typescript",
}

const ADD_ACTIONS: Record<
  AddType,
  {
    overrideFiles: string[];
    overridePackageJsonInfo?: unknown;
  }
> = {
  [AddType.editorconfig]: {
    overrideFiles: [".editorconfig"],
  },
  [AddType.gitignore]: {
    overrideFiles: [".gitignore"],
  },
  [AddType.gitattributes]: {
    overrideFiles: [".gitattributes"],
  },
  [AddType.npmrc]: {
    overrideFiles: [".npmrc"],
  },
  [AddType.lslint]: {
    overrideFiles: [".ls-lint.yml"],
    overridePackageJsonInfo: {
      scripts: {
        prepare: "husky install",
      },
      devDependencies: {
        husky: "^8",
      },
    },
  },
  [AddType.husky]: {
    overrideFiles: [".husky"],
  },
  [AddType.commitlint]: {
    overrideFiles: [".commitlintrc.cjs"],
    overridePackageJsonInfo: {
      scripts: {
        "lint:commitlint": "commitlint",
      },
      devDependencies: {
        "@commitlint/cli": "^17",
        "@commitlint/config-conventional": "^17",
      },
    },
  },
  [AddType.lintstaged]: {
    overrideFiles: [".lintstagedrc.cjs"],
    overridePackageJsonInfo: {
      scripts: {
        "lint:lint-staged": "lint-staged",
      },
      devDependencies: {
        "lint-staged": "^13",
      },
    },
  },
  [AddType.typescript]: {
    overrideFiles: ["tsconfig.json"],
    overridePackageJsonInfo: {
      scripts: {
        "lint:tsc": "tsc",
      },
      dependencies: {
        typescript: "^5",
      },
    },
  },
  [AddType.eslintPrettier]: {
    overrideFiles: [".eslintrc.json", ".prettierrc.json"],
    overridePackageJsonInfo: {
      scripts: {
        "lint:eslint": "eslint --fix",
        "lint:prettier": "prettier --write",
      },
      devDependencies: {
        "@typescript-eslint/eslint-plugin": "^5",
        "@typescript-eslint/parser": "^5",
        eslint: "^8",
        "eslint-config-prettier": "^8",
        "eslint-plugin-import": "^2",
        "eslint-plugin-react": "^7",
        "eslint-plugin-react-hooks": "^4",
        "eslint-plugin-simple-import-sort": "^8",
        prettier: "^2",
      },
    },
  },
};

function baseCopy(options: AddOptions, filename: string) {
  const sourceFilename = "template_" + filename;
  const targetFilename = filename;

  if (!fsExtra.existsSync(resolve(TEMPLATE_FILES_PATH, sourceFilename))) {
    throw new Error(`源文件 ${sourceFilename} 文件不存在！`);
  }
  if (!options.force && fsExtra.existsSync(resolve(CWD_PATH, targetFilename))) {
    throw new Error(`目标文件 ${targetFilename} 文件已存在！`);
  }

  fsExtra.copySync(
    resolve(TEMPLATE_FILES_PATH, sourceFilename),
    resolve(CWD_PATH, targetFilename),
  );
}

function baseWritePackageJson(
  options: AddOptions,
  overridePackageJsonInfo: unknown,
) {
  const packageJsonPath = resolve(CWD_PATH, "package.json");
  const packageJson = fsExtra.readJsonSync(packageJsonPath);
  const newPackageJson = merge(packageJson, overridePackageJsonInfo);
  fsExtra.writeJsonSync(packageJsonPath, newPackageJson, { spaces: 2 });
}
