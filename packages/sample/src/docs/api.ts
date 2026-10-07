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
  | { kind: "alias"; source: string; description?: string; type: string };

const entries = api as Record<string, ApiEntry>;

export const getApiEntry = (name: string): ApiEntry | undefined =>
  Object.prototype.hasOwnProperty.call(entries, name)
    ? entries[name]
    : undefined;

/** i18n-safe key for an interface name (":" is i18next's namespace separator) */
export const apiKey = (name: string) => name.replace(/:/g, "_");
