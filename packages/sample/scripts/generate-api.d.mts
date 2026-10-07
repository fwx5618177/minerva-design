export declare const SAMPLE_ROOT: string;
export declare const OUTPUT: string;
export declare const WC_PREFIX: string;
export declare const generateApi: () => Record<string, unknown>;
export declare const serialize: (api: Record<string, unknown>) => string;
export declare const CSS_PREFIX: string;
export declare const generateCssVars: () => Record<
  string,
  {
    kind: "cssVars";
    source: string;
    vars: { name: string; description: string }[];
  }
>;
