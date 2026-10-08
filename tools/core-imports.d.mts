import type { Plugin } from "vite";

type Kind = "js" | "cjs" | "d.ts" | "d.cts";

export declare const WORKSPACE_ENTRIES: Record<
  string,
  { js: string; types: string }
>;
export declare function workspaceSpecifier(
  fromFile: string,
  specifier: string,
  kind: Kind,
  distDir?: string,
): string;
export declare function rewriteCoreImports(
  code: string,
  fromFile: string,
  kind: Kind,
  distDir?: string,
): string;
export declare function coreImportsPlugin(options: {
  outDir: string;
  distDir?: string;
}): Plugin;
export declare function rewriteCoreDeclarations(
  dir: string,
  distDir?: string,
): void;
