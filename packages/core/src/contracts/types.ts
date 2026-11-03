/**
 * Component contracts: platform-neutral runtime metadata describing every
 * Minerva component once (props, events, slots, platform support), shared by
 * all renderers (React DOM, Web Components, Vue, Angular,
 * React Native, Taro, WeChat and uni-app), the docs and the
 * cross-platform contract tests (tests/contracts).
 */

/** Renderers of Minerva */
export type Platform =
  "react" | "wc" | "vue" | "angular" | "native" | "taro" | "weapp" | "uni";

/**
 * Support of a component on one platform:
 * - `stable`: shipped and covered by the contract tests
 * - `beta`: shipped, API may still change
 * - `planned`: on the roadmap, not implemented yet
 * - `n/a`: deliberately not a component on this platform (e.g. a React
 *   composition part such as `ModalTrigger`, or a custom element whose React
 *   counterpart is a data object such as `<minerva-menu-item>` -> `items`);
 *   `notes` says what to use instead
 */
export type SupportStatus = "planned" | "beta" | "stable" | "n/a";

export interface PlatformSupport {
  readonly status: SupportStatus;
  /** Version that shipped it (`beta` / `stable`) */
  readonly since?: string;
  readonly notes?: string;
}

export type PlatformMatrix = Readonly<Record<Platform, PlatformSupport>>;

/** Product tracks a component is designed for (B2B back-office, B2C apps) */
export type Track = "toB" | "toC";

/** Platform-neutral kind of a prop value */
export type PropKind =
  | "string"
  | "number"
  | "boolean"
  | "enum"
  | "function"
  | "node"
  | "array"
  | "object"
  | "union";

/** A JSON literal default value */
export type DefaultValue = string | number | boolean | null;

export interface PropContract {
  /** Prop / property name (camelCase, the React prop and the element property) */
  readonly name: string;
  readonly kind: PropKind;
  readonly typeText?: string;
  readonly typeRef?: string;
  /** Declared by inherited host types rather than a Minerva interface. */
  readonly inherited?: boolean;
  /** Source module or repository-relative declaration path. */
  readonly source?: string;
  /** String literal values of an `enum` prop (sorted) */
  readonly values?: readonly string[];
  /** Literal default (omitted when computed at runtime or undefined) */
  readonly default?: DefaultValue;
  readonly required: boolean;
  readonly description?: string;
  /** HTML attribute of the custom element (`wc` side), when reflected */
  readonly attribute?: string;
  /**
   * Present on one platform only (React composition, element vocabulary,
   * native-only mobile components)
   */
  readonly only?: "react" | "wc" | "native";
}

export interface EventContract {
  /**
   * Event name: the custom element event (`minerva-change`, `change`), or
   * the kebab-case React callback name when React-only (`dismiss`)
   */
  readonly name: string;
  /** React callback prop (`onCheckedChange`) */
  readonly react?: string;
  readonly inherited?: boolean;
  readonly source?: string;
  /** Custom element event (`minerva-change`) */
  readonly wc?: string;
  /**
   * React Native callback prop of minerva-design/native (`onChange`; the
   * RN idiom `onPress` for `onClick`)
   */
  readonly native?: string;
  /** React/native callback signature; distinct from CustomEvent.detail below. */
  readonly required?: boolean;
  readonly typeText?: string;
  readonly typeRef?: string;
  readonly parameters?: readonly CallbackParameter[];
  readonly returnType?: TypeReference;
  /** Fields of `event.detail` (custom element) */
  readonly detail?: readonly string[];
  readonly detailType?: TypeReference;
  readonly description?: string;
}

export interface SlotContract {
  /** `default` for the unnamed slot */
  readonly name: string;
  readonly description?: string;
}

export interface ComponentContract {
  /** Component name (the React export, else the PascalCase tag name) */
  readonly name: string;
  /** Custom element tag name, when the component exists as an element */
  readonly tag?: string;
  /** Docs page id (`/button`), when documented */
  readonly docs?: string;
  /** i18n key of the description in the docs strings (`docs.<page>.description`) */
  readonly descriptionKey?: string;
  /** English one-line description */
  readonly description?: string;
  readonly tracks: readonly Track[];
  readonly props: readonly PropContract[];
  readonly events: readonly EventContract[];
  readonly slots: readonly SlotContract[];
  /** React: accepts `children` */
  readonly children: boolean;
  readonly platforms: PlatformMatrix;
  /** Source-derived API vocabulary for each renderer. */
  readonly renderers: Readonly<Record<Platform, RendererContract>>;
}

/** An API member using its renderer's public name. */
export interface RendererMember {
  readonly name: string;
  readonly kind?: PropKind;
  readonly default?: DefaultValue;
  readonly values?: readonly string[];
  readonly inherited?: boolean;
  readonly source?: string;
  readonly typeText?: string;
  readonly typeRef?: string;
  readonly required?: boolean;
  readonly description?: string;
  readonly attribute?: string;
  readonly detailType?: TypeReference;
  readonly bubbles?: boolean;
  readonly composed?: boolean;
  readonly cancelable?: boolean;
  readonly parameters?: readonly CallbackParameter[];
  readonly returnType?: TypeReference;
}
export interface RendererContract extends PlatformSupport {
  /** Absent when no callable API exists for this renderer. */
  readonly import?: {
    readonly specifier: string;
    readonly kind?: "named" | "side-effect" | "usingComponents";
    readonly exports: readonly string[];
  };
  readonly tag?: string;
  readonly selector?: string;
  readonly registration?: string;
  readonly props?: readonly RendererMember[];
  readonly events?: readonly RendererMember[];
  readonly slots?: readonly RendererMember[];
  readonly bindings?: readonly {
    readonly prop: string;
    readonly event: string;
    readonly syntax: string;
  }[];
}

export interface TypeReference {
  readonly typeText: string;
  readonly typeRef: string;
}
export interface CallbackParameter extends TypeReference {
  readonly name: string;
  readonly position: number;
  readonly required: boolean;
  readonly rest: boolean;
}
export interface TypeField extends TypeReference {
  readonly name: string;
  readonly required: boolean;
}
export interface TypeNode {
  readonly kind:
    | "unknown"
    | "array"
    | "tuple"
    | "external"
    | "union"
    | "literal"
    | "function"
    | "parameter"
    | "object"
    | "primitive";
  readonly typeText: string;
  readonly nullable?: boolean;
  readonly optional?: boolean;
  readonly name?: string;
  readonly source?: string;
  readonly elementType?: string;
  readonly elements?: readonly string[];
  readonly members?: readonly string[];
  readonly values?: readonly string[];
  readonly value?: string | number;
  readonly constraint?: string;
  readonly fields?: readonly TypeField[];
  readonly typeArguments?: readonly string[];
  readonly signatures?: readonly {
    readonly parameters: readonly CallbackParameter[];
    readonly returnType: TypeReference;
  }[];
}
export interface ContractsMetadata {
  readonly schemaVersion: string;
  readonly packageVersion: string;
  /** Baseline commit. sourceDigest identifies the exact source snapshot, including local edits. */
  readonly sourceCommit: string;
  readonly sourceDigest: string;
}
