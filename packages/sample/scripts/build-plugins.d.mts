import type { Plugin } from "vite";

export declare const LOCALES_DIR: string;
export declare const META_KEYS: string[];
export declare const readDocsMeta: (
  lng: string,
  dir?: string,
) => {
  meta: Record<string, { title?: string; description?: string }>;
  files: string[];
};
export declare const docsMetaPlugin: (dir?: string) => Plugin;
export declare const KB: number;
export declare const LOCALE_BUDGET: number;
export declare const DEFAULT_BUDGET: number;
export declare const overBudget: (
  chunks: { fileName: string; code: string; moduleIds: string[] }[],
) => string[];
export declare const bundleBudgetPlugin: () => Plugin;
