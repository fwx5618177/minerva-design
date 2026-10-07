/**
 * Single source of truth for the documentation site.
 *
 * Plain data only (no React / JSX) so tests can import it in Node:
 * - the router builds one lazily-loaded route per page from this list
 * - the sidebar groups pages by `category`
 * - `src/docs/docs.test.ts` checks that every public export of the libraries
 *   is documented, that every `api` entry exists in `api.generated.json`,
 *   that every demo file exists and that all locales contain the page strings.
 *
 * Page content lives in `src/docs/pages/<id>/index.tsx` (+ `demos/<demo>.tsx`)
 * and its strings in `src/i18n/locales/<lng>/docs/<id>.json`.
 */

export type DocCategory =
  | "gettingStarted"
  | "configuration"
  | "general"
  | "layout"
  | "dataEntry"
  | "dataDisplay"
  | "feedback"
  | "navigation"
  | "webComponents";

export interface DocPageMeta {
  /** Route path and folder name under src/docs/pages */
  id: string;
  category: DocCategory;
  /** Runtime exports of the package documented on this page */
  exports?: string[];
  /** Package the exports come from */
  package?: "@minerva/lib-core" | "@minerva/lib-web-components";
  /** Interfaces from api.generated.json rendered as API tables */
  api?: string[];
  /** Demo ids, in display order; each maps to `pages/<id>/demos/<demo>.tsx` */
  demos?: string[];
}

export const categories: DocCategory[] = [
  "gettingStarted",
  "configuration",
  "general",
  "layout",
  "dataEntry",
  "dataDisplay",
  "feedback",
  "navigation",
  "webComponents",
];

export const docPages: DocPageMeta[] = [
  // Getting started
  { id: "overview", category: "gettingStarted" },
  { id: "installation", category: "gettingStarted" },
  { id: "introduction", category: "gettingStarted" },
  { id: "theming", category: "gettingStarted", demos: ["scoped-theme"] },

  // Configuration: ConfigProvider, hooks and theme utilities
  {
    id: "config-provider",
    category: "configuration",
    exports: ["ConfigProvider", "useConfig", "ConfigContext"],
    api: ["ConfigContextProviderProps", "ConfigContextProps", "Locale"],
    demos: ["use-config", "custom-theme", "locale"],
  },
  {
    id: "hooks",
    category: "configuration",
    exports: ["useAutoTheme", "useLocale", "useI18n"],
    demos: ["use-auto-theme", "use-locale"],
  },
  {
    id: "theme-utils",
    category: "configuration",
    exports: [
      "applyThemeStyles",
      "generateCSSVariables",
      "getSystemTheme",
      "isBilingualTheme",
      "resolveTheme",
      "themes",
      "light",
      "dark",
      "githubDark",
    ],
    api: ["ThemeProps", "SemanticThemeProps", "ComponentThemeProps"],
    demos: ["theme-swatches", "resolve-theme", "scoped-preview"],
  },

  // General
  {
    id: "button",
    category: "general",
    exports: ["Button"],
    api: ["ButtonProps"],
    demos: ["basic", "variants", "sizes", "shapes", "states", "with-icon"],
  },
  {
    id: "icon-button",
    category: "general",
    exports: ["IconButton", "InteractiveIconButton", "interactiveIconsMap"],
    api: ["IconButtonProps", "InteractiveIconProps"],
    demos: [
      "basic",
      "variants",
      "sizes-and-shapes",
      "states",
      "custom-colors",
      "tooltip",
      "interactive",
      "interactive-types",
    ],
  },
  {
    id: "search-button",
    category: "general",
    exports: ["SearchButton"],
    api: ["SearchButtonProps"],
    demos: [
      "basic",
      "variants",
      "sizes",
      "shapes",
      "animations",
      "with-text",
      "states",
      "custom-colors",
    ],
  },

  // Layout
  {
    id: "space",
    category: "layout",
    exports: ["Space"],
    api: ["SpaceProps"],
    demos: [
      "basic",
      "sizes",
      "vertical",
      "alignment",
      "wrap",
      "split",
      "compact-and-block",
    ],
  },
  {
    id: "divider",
    category: "layout",
    exports: ["Divider"],
    api: ["DividerProps"],
    demos: ["basic", "variants", "with-text", "vertical", "custom-style"],
  },
  {
    id: "card",
    category: "layout",
    exports: [
      "Card",
      "CardHeader",
      "CardTitle",
      "CardDescription",
      "CardContent",
      "CardFooter",
    ],
    api: [
      "CardProps",
      "CardHeaderProps",
      "CardTitleProps",
      "CardDescriptionProps",
      "CardContentProps",
      "CardFooterProps",
    ],
    demos: ["basic", "variants", "types", "custom-colors", "animation"],
  },
  {
    id: "virtual-list",
    category: "layout",
    exports: ["VirtualList"],
    api: ["VirtualListProps", "VirtualListItem"],
    demos: ["basic", "auto-height", "infinite-scroll", "high-performance"],
  },

  // Data entry
  {
    id: "textfield",
    category: "dataEntry",
    exports: ["TextField"],
    api: ["TextFieldProps"],
    demos: [
      "basic",
      "controlled",
      "icons",
      "password",
      "clearable-and-count",
      "appearance",
      "sizes",
      "width-and-suffix",
      "states",
      "validation",
    ],
  },
  {
    id: "checkbox",
    category: "dataEntry",
    exports: ["Checkbox"],
    api: ["CheckboxProps"],
    demos: [
      "basic",
      "controlled",
      "indeterminate",
      "sizes-and-shapes",
      "label-placement",
      "states",
      "custom-style",
      "error",
    ],
  },
  {
    id: "radio",
    category: "dataEntry",
    exports: ["Radio", "RadioGroup"],
    api: ["RadioProps", "RadioGroupProps"],
    demos: [
      "basic",
      "controlled",
      "horizontal",
      "sizes",
      "colors",
      "disabled",
      "validation",
    ],
  },
  {
    id: "switch",
    category: "dataEntry",
    exports: ["Switch"],
    api: ["SwitchProps"],
    demos: [
      "basic",
      "controlled",
      "sizes",
      "colors",
      "label-placement",
      "states",
      "icons",
      "custom-style",
    ],
  },
  {
    id: "auto-complete",
    category: "dataEntry",
    exports: ["AutoComplete"],
    api: ["AutoCompleteProps", "AutoCompleteOption"],
    demos: [
      "basic",
      "controlled",
      "rich-options",
      "custom-render",
      "grouped",
      "multiple",
      "filter-sort",
      "async-loading",
      "appearance",
    ],
  },
  {
    id: "cascader",
    category: "dataEntry",
    exports: ["Cascader"],
    api: ["CascaderProps", "CascaderOption"],
    demos: [
      "basic",
      "default-value",
      "controlled",
      "hover",
      "search",
      "display-render",
      "disabled",
      "lazy-load",
      "custom-option",
    ],
  },
  {
    id: "time-picker",
    category: "dataEntry",
    exports: ["TimePicker"],
    api: ["TimePickerProps"],
    demos: [
      "basic",
      "default-value",
      "controlled",
      "formats",
      "twelve-hour",
      "steps",
      "time-range",
      "sizes",
      "disabled",
    ],
  },

  // Data display
  {
    id: "avatar",
    category: "dataDisplay",
    exports: ["Avatar", "AvatarGroup"],
    api: ["AvatarProps", "AvatarGroupProps"],
    demos: ["basic", "shapes", "sizes", "group"],
  },
  {
    id: "badge",
    category: "dataDisplay",
    exports: ["Badge"],
    api: ["BadgeProps"],
    demos: [
      "basic",
      "variants",
      "positions",
      "sizes",
      "dot",
      "with-icon",
      "custom-style",
    ],
  },
  {
    id: "chip",
    category: "dataDisplay",
    exports: ["Chip"],
    api: ["ChipProps"],
    demos: [
      "basic",
      "variants",
      "colors",
      "sizes",
      "icon-avatar",
      "deletable",
      "clickable",
      "states",
    ],
  },
  {
    id: "tag",
    category: "dataDisplay",
    exports: ["Tag"],
    api: ["TagProps"],
    demos: [
      "basic",
      "sizes-shapes",
      "with-icon",
      "bordered-elevation",
      "closable",
      "clickable",
      "custom-colors",
      "disabled",
    ],
  },
  {
    id: "status-indicator",
    category: "dataDisplay",
    exports: ["StatusIndicator"],
    api: ["StatusIndicatorProps"],
    demos: [
      "statuses",
      "shapes",
      "sizes",
      "presence",
      "custom-color",
      "disabled",
    ],
  },
  {
    id: "empty",
    category: "dataDisplay",
    exports: ["Empty"],
    api: ["EmptyProps"],
    demos: ["basic", "svg", "custom-icon", "with-action", "styled"],
  },
  {
    id: "tooltip",
    category: "dataDisplay",
    exports: ["Tooltip"],
    api: ["TooltipProps", "TooltipRef"],
    demos: [
      "basic",
      "placements",
      "variants",
      "shapes",
      "animations",
      "custom-colors",
      "delays",
      "follow-cursor",
      "controlled",
      "events",
    ],
  },
  {
    id: "popper",
    category: "dataDisplay",
    exports: ["Popper"],
    api: [
      "PopperProps",
      "PopperOffset",
      "PopperAnimation",
      "PopperCustomStyle",
    ],
    demos: [
      "basic",
      "placements",
      "triggers",
      "variants",
      "menu",
      "anchor-width",
      "sizes",
      "custom-style",
    ],
  },

  // Feedback
  {
    id: "alert",
    category: "feedback",
    exports: ["Alert"],
    api: ["AlertProps"],
    demos: [
      "variants",
      "with-title",
      "types",
      "sizes",
      "closable",
      "with-action",
      "collapsible",
      "banner",
      "appearance",
      "animations",
    ],
  },
  {
    id: "message",
    category: "feedback",
    exports: ["message", "useMessage"],
    api: ["MessageProps"],
    demos: [
      "types",
      "options",
      "placements",
      "update",
      "use-message",
      "destroy",
    ],
  },
  {
    id: "progress",
    category: "feedback",
    exports: ["ProgressIndicator"],
    api: ["ProgressIndicatorProps"],
    demos: ["types", "sizes", "width", "with-icon"],
  },
  {
    id: "skeleton",
    category: "feedback",
    exports: ["Skeleton"],
    api: ["SkeletonProps"],
    demos: [
      "basic",
      "variants",
      "animations",
      "composition",
      "card",
      "loading",
    ],
  },

  // Navigation
  {
    id: "dropdown",
    category: "navigation",
    exports: ["Dropdown"],
    api: ["DropdownProps", "DropdownOption"],
    demos: [
      "basic",
      "controlled",
      "custom-trigger",
      "directions",
      "disabled",
      "custom-menu",
    ],
  },
  {
    id: "pagination",
    category: "navigation",
    exports: ["Pagination"],
    api: ["PaginationProps", "PaginationLabels"],
    demos: [
      "basic",
      "many-pages",
      "total-and-jumper",
      "size-changer",
      "sizes",
      "shapes-and-variants",
      "simple",
      "custom-render",
      "disabled",
      "responsive",
    ],
  },

  // Web Components
  {
    id: "web-components",
    category: "webComponents",
    package: "@minerva/lib-web-components",
    exports: ["Button"],
    api: ["wc:ButtonProps"],
    demos: ["basic", "variants", "sizes-shapes", "states"],
  },
];

export const getDocPage = (id: string) => docPages.find((p) => p.id === id);
