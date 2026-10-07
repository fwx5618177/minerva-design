import api from "./api.generated.json";

export interface ApiProp {
  name: string;
  type: string;
  required: boolean;
  default?: string;
  description?: string;
}

export type ApiEntry =
  | {
      kind: "interface";
      source: string;
      description?: string;
      extends: string[];
      props: ApiProp[];
    }
  | { kind: "alias"; source: string; description?: string; type: string }
  | { kind: "cssVars"; source: string; vars: ApiCssVar[] };

/** Public CSS custom property of a component (`// @css-var` in its SCSS) */
export interface ApiCssVar {
  name: string;
  /** English description from the SCSS comment */
  description: string;
}

const entries = api as Record<string, ApiEntry>;

export const getApiEntry = (name: string): ApiEntry | undefined =>
  Object.prototype.hasOwnProperty.call(entries, name)
    ? entries[name]
    : undefined;

/** i18n-safe key for an interface name (":" is i18next's namespace separator) */
export const apiKey = (name: string) => name.replace(/:/g, "_");

/** CSS custom properties of a lib-core component folder (e.g. "Button") */
export const getCssVars = (folder: string): ApiCssVar[] => {
  const entry = getApiEntry(`css:${folder}`);
  return entry?.kind === "cssVars" ? entry.vars : [];
};
