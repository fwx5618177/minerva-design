import type {
  ComponentContract,
  DefaultValue,
  PropKind,
} from "../packages/core/src/contracts/types";

export declare const CONTRACTS_OUTPUT: string;
export declare const SUPPORT_OUTPUT: string;
export type ComponentSupport = Pick<
  ComponentContract,
  "name" | "tag" | "docs" | "tracks" | "platforms"
>;
export declare function projectSupport(
  contracts: readonly ComponentContract[],
): ComponentSupport[];
export declare const PLATFORMS: readonly string[];
/** Element tag -> React component (`null`: data object in React) */
export declare const TAG_TO_REACT: Record<string, string | null>;

export declare function literal(text?: string): DefaultValue | undefined;
export declare function detailFields(
  description?: string,
): string[] | undefined;

export interface ReactProp {
  name: string;
  kind: PropKind;
  values?: string[];
  default?: DefaultValue;
  required: boolean;
  description?: string;
}
export interface ReactComponent {
  props: ReactProp[];
  children: boolean;
  description?: string;
}
export declare function readReact(): Map<string, ReactComponent>;
export declare function readNative(): Map<string, ReactComponent>;
export declare function nativeSupport(
  name: string,
): ComponentContract["platforms"]["native"];
export declare function miniSupport(
  platform: string,
  name: string,
): { status: "n/a" | "beta" | "planned"; notes?: string };

export interface ElementApi {
  summary?: string;
  properties?: {
    name: string;
    attribute?: string;
    type?: string;
    default?: string;
    readonly?: boolean;
    description?: string;
  }[];
  events?: { name: string; description?: string }[];
  slots?: { name: string; description?: string }[];
}
export declare function readElements(): Map<string, ElementApi>;

export declare function generateContracts(): ComponentContract[];
export declare function serializeContracts(
  contracts?: ComponentContract[] | ComponentSupport[],
): Promise<string>;

/** Vue components covered by the shared contract suites (`stable`) */
export declare const VUE_CONTRACT_SUITE_COMPONENTS: Set<string>;
/** Value exports of the Vue renderer (static read of its barrels) */
export declare function readVue(): Set<string>;
/** Value exports read from TypeScript entry barrels, without loading a framework. */
export declare function readValueExports(
  entries: readonly string[],
): Set<string>;
/** Native Angular exports, including the optional Monaco entry. */
export declare function readAngular(): Set<string>;
export declare function angularSupport(
  name: string,
  exports?: ReadonlySet<string>,
): ComponentContract["platforms"]["angular"];
