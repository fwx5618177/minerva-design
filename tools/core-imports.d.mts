import type { Plugin } from "vite";

export declare function coreSpecifier(
  fromFile: string,
  coreDir: string,
  stylingHooks: boolean,
  kind: "js" | "cjs" | "d.ts" | "d.cts",
): string;
export declare function rewriteCoreImports(
  code: string,
  fromFile: string,
  coreDir: string,
  kind: "js" | "cjs" | "d.ts" | "d.cts",
): string;
export declare function coreImportsPlugin(options: {
  outDir: string;
  coreDir: string;
}): Plugin;
export declare function rewriteCoreDeclarations(
  dir: string,
  coreDir: string,
): void;
