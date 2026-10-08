// Type-checked with moduleResolution NodeNext (tsconfig.node.json): every
// typed entry resolves from an ESM Node project.
import type { ButtonProps } from "minerva-design";
import { cn } from "minerva-design/utils";
import { parseThemeCookies } from "minerva-design/theme-utils";
import { createFocusScope } from "minerva-design/core";
import { stylingHooks } from "minerva-design/styling-hooks";
import type { MinervaButton } from "minerva-design/web-components/button";
import type { MinervaModal } from "minerva-design/web-components";

export const checks: [
  ButtonProps["variant"],
  string,
  ReturnType<typeof parseThemeCookies>,
  typeof createFocusScope,
  keyof typeof stylingHooks,
  MinervaButton["variant"] | undefined,
  MinervaModal | undefined,
] = [
  "solid",
  cn("a", "b"),
  parseThemeCookies(""),
  createFocusScope,
  "button",
  undefined,
  undefined,
];
