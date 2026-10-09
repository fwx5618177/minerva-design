import { resolveSpace } from "@minerva/core";
export const cssLength = (value: string | number | undefined) =>
  typeof value === "number"
    ? Number.isFinite(value)
      ? `${value}px`
      : undefined
    : value;
export const lineCount = (value: number) =>
  Number.isFinite(value) ? Math.max(0, Math.floor(value)) : 0;
export const spacing = (value: string | number) => resolveSpace(value);
