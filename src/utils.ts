import { copyFileSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { resolve } from "node:path";

export function copySync(src: string, dest: string) {
  if (statSync(src).isDirectory()) {
    mkdirSync(dest, { recursive: true });
    readdirSync(src).forEach((file) => {
      const srcFile = resolve(src, file);
      const destFile = resolve(dest, file);
      copySync(srcFile, destFile);
    });
  } else {
    copyFileSync(src, dest);
  }
}
