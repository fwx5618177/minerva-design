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
  | "theming"
  | "configuration"
  | "general"
  | "layout"
  | "dataEntry"
  | "dataDisplay"
  | "feedback"
  | "navigation"
  | "overlays"
  | "editors"
  | "mobile"
  | "webComponents";

export interface DocPageMeta {
  /** Route path and folder name under src/docs/pages */
  id: string;
  category: DocCategory;
  /** Runtime exports of the package documented on this page */
  exports?: string[];
  /** Package the exports come from */
  package?: "minerva-design" | "minerva-design/web-components";
  /** Interfaces from api.generated.json rendered as API tables */
  api?: string[];
  /** Demo ids, in display order; each maps to `pages/<id>/demos/<demo>.tsx` */
  demos?: string[];
  /**
   * Component folders of minerva-design whose CSS custom properties
   * (`// @css-var` comments in their SCSS) are listed in a "CSS variables"
   * section
   */
  cssVars?: string[];
  /**
   * Web Component counterpart shown in the page's "Web Components" tab:
   * the define entry (`minerva-design/web-components/<entry>`), the custom
   * elements documented on the page (API tables from custom-elements.json)
   * and the demo ids (`pages/<id>/wc/<demo>.html` + optional `<demo>.ts`)
   */
  wc?: WcMeta;
  /**
   * React Native counterpart shown in the page's "React Native" tab
   * (minerva-design/native): exports, API interfaces of
   * api.native.generated.json (without the `native:` prefix) and demo ids
   * (`pages/<id>/native/<demo>.tsx`, rendered through react-native-web in a
   * phone frame). A page with `native` only (no `exports`) is a mobile
   * component: the React Native content is the whole page.
   */
  native?: NativeMeta;
}

export interface NativeMeta {
  /** Exports of minerva-design/native documented on the page */
  exports: string[];
  /** Interfaces rendered as API tables (`ButtonProps` = `native:ButtonProps`) */
  api: string[];
  /** Demo ids, in display order */
  demos: string[];
}

export interface WcMeta {
  /** Define entry: `minerva-design/web-components/<entry>` */
  entry: string;
  /** Tag names documented on the page, in display order */
  tags: string[];
  /** Demo ids, in display order */
  demos: string[];
}

export const categories: DocCategory[] = [
  "gettingStarted",
  "theming",
  "configuration",
  "general",
  "layout",
  "dataEntry",
  "dataDisplay",
  "feedback",
  "overlays",
  "navigation",
  "editors",
  "mobile",
  "webComponents",
];

export const docPages: DocPageMeta[] = [
  // Getting started
  { id: "overview", category: "gettingStarted" },
  { id: "installation", category: "gettingStarted" },
  { id: "introduction", category: "gettingStarted" },
  { id: "architecture", category: "gettingStarted" },
  { id: "platform-support", category: "gettingStarted" },
  { id: "rsc-guide", category: "gettingStarted" },
  { id: "vue", category: "gettingStarted" },
  { id: "angular", category: "gettingStarted" },
  { id: "react-native", category: "gettingStarted" },
  { id: "theming", category: "gettingStarted", demos: ["scoped-theme"] },
  {
    id: "styling",
    category: "gettingStarted",
    demos: [
      "restyle-button",
      "restyle-modal",
      "restyle-tabs",
      "restyle-table",
      "items-menu",
      "items-select",
      "items-pagination",
      "items-table",
      "items-toast",
    ],
  },

  // Configuration: ConfigProvider, hooks and theme utilities
  {
    id: "config-provider",
    category: "configuration",
    exports: ["ConfigProvider", "useConfig", "ConfigContext"],
    api: ["ConfigContextProviderProps", "ConfigContextProps", "Locale"],
    demos: ["use-config", "custom-theme", "locale", "palette"],
    wc: {
      entry: "config",
      tags: ["minerva-config"],
      demos: ["basic", "palette-design", "locale", "nested"],
    },
    native: {
      exports: [
        "MinervaProvider",
        "ConfigProvider",
        "useTheme",
        "useTokens",
        "useI18n",
        "useInsets",
      ],
      api: [
        "MinervaProviderProps",
        "MinervaTheme",
        "MinervaI18n",
        "NativeLocale",
        "NativeFonts",
      ],
      demos: ["switching", "use-theme"],
    },
  },
  {
    id: "hooks",
    category: "configuration",
    exports: ["useAutoTheme", "useLocale", "useI18n", "useDisclosure", "cn"],
    demos: ["use-auto-theme", "use-locale", "use-disclosure"],
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
    cssVars: ["Button"],
    category: "general",
    exports: ["Button"],
    api: ["ButtonProps"],
    demos: [
      "basic",
      "colors",
      "variants",
      "sizes",
      "shapes",
      "states",
      "with-icon",
      "icons-loading",
      "form",
    ],
    wc: {
      entry: "button",
      tags: ["minerva-button"],
      demos: ["basic", "colors-variants", "sizes-shapes", "states", "form"],
    },
    native: {
      exports: ["Button"],
      api: ["ButtonProps"],
      demos: [
        "basic",
        "colors",
        "variants",
        "sizes",
        "shapes",
        "states",
        "with-icon",
        "icons-loading",
        "form",
      ],
    },
  },
  {
    id: "icon-button",
    cssVars: ["IconButton"],
    category: "general",
    exports: ["IconButton"],
    api: ["IconButtonProps"],
    demos: [
      "basic",
      "colors",
      "variants",
      "sizes-and-shapes",
      "states",
      "toggle",
      "search",
      "custom-colors",
      "tooltip",
      "label",
    ],
    wc: {
      entry: "icon-button",
      tags: ["minerva-icon-button"],
      demos: ["basic", "sizes-shapes", "toggle", "states"],
    },
    native: {
      exports: ["IconButton"],
      api: ["IconButtonProps"],
      demos: ["basic", "toggle", "variants-sizes"],
    },
  },

  // Layout
  {
    id: "divider",
    cssVars: ["Divider"],
    category: "layout",
    exports: ["Divider"],
    api: ["DividerProps"],
    demos: [
      "basic",
      "variants",
      "with-text",
      "vertical",
      "flex-item",
      "custom-style",
    ],
    wc: {
      entry: "divider",
      tags: ["minerva-divider"],
      demos: [
        "basic",
        "variants",
        "with-text",
        "vertical",
        "flex-item",
        "custom-style",
      ],
    },
    native: {
      exports: ["Divider"],
      api: ["DividerProps"],
      demos: ["basic", "vertical", "with-text"],
    },
  },
  {
    id: "card",
    cssVars: ["Card"],
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
    demos: [
      "basic",
      "variants",
      "padded",
      "interactive",
      "custom-colors",
      "animation",
    ],
    wc: {
      entry: "card",
      tags: [
        "minerva-card",
        "minerva-card-header",
        "minerva-card-content",
        "minerva-card-footer",
        "minerva-card-title",
        "minerva-card-description",
      ],
      demos: ["basic", "variants", "padded", "interactive"],
    },
    native: {
      exports: [
        "Card",
        "CardHeader",
        "CardTitle",
        "CardDescription",
        "CardContent",
        "CardFooter",
      ],
      api: ["CardProps"],
      demos: ["basic", "product", "variants"],
    },
  },
  {
    id: "virtual-list",
    cssVars: ["VirtualList"],
    category: "layout",
    exports: ["VirtualList"],
    api: ["VirtualListProps", "VirtualListItem"],
    demos: [
      "basic",
      "auto-height",
      "infinite-scroll",
      "high-performance",
      "clickable-rows",
    ],
    wc: {
      entry: "virtual-list",
      tags: ["minerva-virtual-list"],
      demos: ["basic", "clickable-rows", "infinite-scroll"],
    },
    native: {
      exports: ["VirtualList"],
      api: ["VirtualListProps"],
      demos: ["basic"],
    },
  },

  // Data entry
  {
    id: "checkbox",
    cssVars: ["Checkbox"],
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
      "colors-and-form-control",
    ],
    native: {
      exports: ["Checkbox"],
      api: ["CheckboxProps"],
      demos: ["basic", "controlled", "indeterminate"],
    },
    wc: {
      entry: "checkbox",
      tags: ["minerva-checkbox"],
      demos: ["basic", "select-all", "styles-states", "form"],
    },
  },
  {
    id: "radio",
    cssVars: ["Radio"],
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
    native: {
      exports: ["Radio", "RadioGroup"],
      api: ["RadioProps", "RadioGroupProps"],
      demos: ["basic", "controlled", "disabled"],
    },
    wc: {
      entry: "radio",
      tags: ["minerva-radio", "minerva-radio-group"],
      demos: ["basic", "styles-states", "form"],
    },
  },
  {
    id: "switch",
    cssVars: ["Switch"],
    native: {
      exports: ["Switch"],
      api: ["SwitchProps"],
      demos: [
        "basic",
        "controlled",
        "sizes",
        "colors",
        "label-placement",
        "states",
      ],
    },
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
      "bilateral-and-segmented",
    ],
    wc: {
      entry: "switch",
      tags: ["minerva-switch"],
      demos: ["basic", "styles-states", "side-labels", "form"],
    },
  },
  {
    id: "auto-complete",
    cssVars: ["AutoComplete"],
    category: "dataEntry",
    exports: ["AutoComplete"],
    api: ["AutoCompleteProps", "AutoCompleteOption"],
    demos: [
      "basic",
      "controlled",
      "rich-options",
      "custom-render",
      "grouped",
      "filter-sort",
      "async-loading",
      "appearance",
      "search-box",
    ],
    wc: {
      entry: "autocomplete",
      tags: ["minerva-autocomplete"],
      demos: ["basic", "rich-options", "custom-render", "async-loading"],
    },
    native: {
      exports: ["AutoComplete"],
      api: ["AutoCompleteProps"],
      demos: ["basic"],
    },
  },
  {
    id: "cascader",
    cssVars: ["Cascader"],
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
    wc: {
      entry: "cascader",
      tags: ["minerva-cascader"],
      demos: ["basic", "search-hover", "lazy", "form"],
    },
    native: { exports: ["Cascader"], api: ["CascaderProps"], demos: ["basic"] },
  },
  {
    id: "time-picker",
    cssVars: ["TimePicker"],
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
    wc: {
      entry: "time-picker",
      tags: ["minerva-time-picker"],
      demos: ["basic", "formats", "range-steps", "form"],
    },
    native: {
      exports: ["TimePicker"],
      api: ["TimePickerProps"],
      demos: ["basic"],
    },
  },

  // Data display
  {
    id: "avatar",
    cssVars: ["Avatar"],
    category: "dataDisplay",
    exports: ["Avatar", "AvatarGroup"],
    api: ["AvatarProps", "AvatarGroupProps"],
    demos: ["basic", "shapes", "sizes", "group", "fallback"],
    wc: {
      entry: "avatar",
      tags: ["minerva-avatar", "minerva-avatar-group"],
      demos: ["basic", "shapes-sizes", "group", "fallback"],
    },
    native: {
      exports: ["Avatar", "AvatarGroup"],
      api: ["AvatarProps", "AvatarGroupProps"],
      demos: ["basic", "group", "sizes-shapes"],
    },
  },
  {
    id: "badge",
    cssVars: ["Badge"],
    category: "dataDisplay",
    exports: ["Badge"],
    api: ["BadgeProps"],
    demos: [
      "basic",
      "colors",
      "variants",
      "positions",
      "sizes",
      "dot",
      "with-icon",
      "custom-style",
      "status",
    ],
    wc: {
      entry: "badge",
      tags: ["minerva-badge"],
      demos: ["basic", "colors-variants", "positions", "slots"],
    },
    native: {
      exports: ["Badge"],
      api: ["BadgeProps"],
      demos: ["basic", "colors-variants", "dot-max"],
    },
  },
  {
    id: "tag",
    cssVars: ["Tag"],
    category: "dataDisplay",
    exports: ["Tag"],
    api: ["TagProps"],
    demos: [
      "colors",
      "variants",
      "sizes-shapes",
      "with-icon",
      "closable",
      "clickable",
      "avatar-loading",
      "custom-colors",
      "disabled",
    ],
    wc: {
      entry: "tag",
      tags: ["minerva-tag"],
      demos: ["basic", "variants-sizes", "closable", "toggle"],
    },
    native: {
      exports: ["Tag"],
      api: ["TagProps"],
      demos: ["closable", "colors-variants", "selectable"],
    },
  },
  {
    id: "empty",
    cssVars: ["Empty"],
    category: "dataDisplay",
    exports: ["Empty"],
    api: ["EmptyProps"],
    demos: ["basic", "svg", "custom-icon", "with-action", "sizes", "styled"],
    wc: {
      entry: "empty",
      tags: ["minerva-empty"],
      demos: ["basic", "actions", "sizes-styles"],
    },
    native: { exports: ["Empty"], api: ["EmptyProps"], demos: ["basic"] },
  },
  {
    id: "tooltip",
    cssVars: ["Tooltip"],
    category: "dataDisplay",
    exports: ["Tooltip", "TooltipProvider"],
    api: ["TooltipProps", "TooltipRef", "TooltipProviderProps"],
    demos: [
      "basic",
      "placements",
      "colors",
      "variants",
      "shapes",
      "animations",
      "custom-colors",
      "delays",
      "follow-cursor",
      "controlled",
      "events",
      "as-child",
      "provider",
    ],
    wc: {
      entry: "tooltip",
      tags: ["minerva-tooltip-provider", "minerva-tooltip"],
      demos: ["basic", "styles", "provider", "controlled"],
    },
    native: {
      exports: ["Tooltip", "TooltipProvider"],
      api: ["TooltipProps", "TooltipProviderProps"],
      demos: ["basic"],
    },
  },

  // Feedback
  {
    id: "alert",
    cssVars: ["Alert"],
    category: "feedback",
    exports: ["Alert"],
    api: ["AlertProps"],
    demos: [
      "colors",
      "variants",
      "with-title",
      "sizes",
      "closable",
      "with-action",
      "collapsible",
      "banner",
      "appearance",
      "animations",
      "return-focus",
    ],
    wc: {
      entry: "alert",
      tags: ["minerva-alert"],
      demos: ["basic", "variants-sizes", "closable", "collapsible"],
    },
    native: { exports: ["Alert"], api: ["AlertProps"], demos: ["basic"] },
  },
  {
    id: "progress",
    cssVars: ["ProgressIndicator"],
    category: "feedback",
    exports: ["ProgressIndicator"],
    api: ["ProgressIndicatorProps"],
    demos: ["variants", "sizes", "colors", "label", "width", "with-icon"],
    wc: {
      entry: "progress",
      tags: ["minerva-progress"],
      demos: ["basic", "sizes-colors", "label-width"],
    },
    native: {
      exports: ["ProgressIndicator"],
      api: ["ProgressProps"],
      demos: ["basic"],
    },
  },
  {
    id: "skeleton",
    cssVars: ["Skeleton"],
    category: "feedback",
    exports: ["Skeleton", "SkeletonText"],
    api: ["SkeletonProps", "SkeletonTextProps"],
    demos: [
      "basic",
      "variants",
      "animations",
      "composition",
      "card",
      "loading",
      "decorative",
      "skeleton-text",
    ],
    wc: {
      entry: "skeleton",
      tags: ["minerva-skeleton", "minerva-skeleton-text"],
      demos: ["basic", "variants", "loading", "composition"],
    },
    native: {
      exports: ["Skeleton", "SkeletonText"],
      api: ["SkeletonProps", "SkeletonTextProps"],
      demos: ["basic"],
    },
  },

  // Navigation
  {
    id: "pagination",
    cssVars: ["Pagination"],
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
      "compact",
    ],
    wc: {
      entry: "pagination",
      tags: ["minerva-pagination"],
      demos: ["basic", "total-and-jumper", "appearance", "simple"],
    },
    native: {
      exports: ["Pagination"],
      api: ["PaginationProps"],
      demos: ["basic", "simple"],
    },
  },

  // Layout
  {
    id: "box",
    category: "layout",
    exports: ["Box"],
    api: ["BoxProps"],
    demos: ["basic", "sizing", "polymorphic"],
    wc: {
      entry: "box",
      tags: ["minerva-box"],
      demos: ["basic", "spacing-sizing", "surfaces"],
    },
    native: { exports: ["Box"], api: ["BoxProps"], demos: ["basic"] },
  },
  {
    id: "stack",
    cssVars: ["Stack"],
    category: "layout",
    exports: ["Stack", "HStack", "VStack"],
    api: ["StackProps"],
    demos: ["basic", "horizontal", "gap", "wrap", "separator", "attached"],
    wc: {
      entry: "stack",
      tags: ["minerva-stack", "minerva-hstack", "minerva-vstack"],
      demos: ["basic", "hstack-vstack", "wrap-separator", "attached"],
    },
    native: {
      exports: ["Stack", "HStack", "VStack"],
      api: ["StackProps", "HStackProps", "VStackProps"],
      demos: ["basic"],
    },
  },
  {
    id: "responsive-grid",
    cssVars: ["ResponsiveGrid"],
    category: "layout",
    exports: ["ResponsiveGrid", "GridItem"],
    api: ["ResponsiveGridProps", "GridItemProps"],
    demos: ["basic", "full-width"],
    wc: {
      entry: "responsive-grid",
      tags: ["minerva-responsive-grid", "minerva-grid-item"],
      demos: ["basic", "container", "full-width"],
    },
    native: {
      exports: ["ResponsiveGrid", "GridItem"],
      api: ["ResponsiveGridProps", "GridItemProps"],
      demos: ["basic"],
    },
  },
  {
    id: "split-layout",
    cssVars: ["SplitLayout"],
    category: "layout",
    exports: ["SplitLayout"],
    api: ["SplitLayoutProps"],
    demos: ["basic", "options"],
    wc: {
      entry: "split-layout",
      tags: ["minerva-split-layout"],
      demos: ["basic", "options"],
    },
    native: {
      exports: ["SplitLayout"],
      api: ["SplitLayoutProps"],
      demos: ["basic"],
    },
  },
  {
    id: "page",
    cssVars: ["Page"],
    category: "layout",
    exports: ["Page", "PageHeader", "PageSection", "StatCard", "Toolbar"],
    api: [
      "PageProps",
      "PageHeaderProps",
      "PageSectionProps",
      "StatCardProps",
      "ToolbarProps",
    ],
    demos: ["basic", "stat-cards", "toolbar"],
    wc: {
      entry: "page",
      tags: [
        "minerva-page",
        "minerva-page-header",
        "minerva-page-section",
        "minerva-toolbar",
        "minerva-stat-card",
      ],
      demos: ["basic", "stat-cards", "toolbar"],
    },
    native: {
      exports: ["Page", "PageHeader", "PageSection", "StatCard", "Toolbar"],
      api: [
        "PageProps",
        "PageHeaderProps",
        "PageSectionProps",
        "StatCardProps",
        "ToolbarProps",
      ],
      demos: ["basic"],
    },
  },
  {
    id: "app-shell",
    cssVars: ["AppShell"],
    category: "layout",
    exports: ["AppShell"],
    api: ["AppShellProps", "AppShellNavigationState", "AppShellLabels"],
    demos: ["basic", "controlled", "skip-link"],
    wc: {
      entry: "app-shell",
      tags: ["minerva-app-shell"],
      demos: ["basic", "sidebar-modes", "controlled"],
    },
    native: { exports: ["AppShell"], api: ["AppShellProps"], demos: ["basic"] },
  },

  // Overlays
  {
    id: "modal",
    cssVars: ["Modal"],
    category: "overlays",
    exports: [
      "Modal",
      "ModalRoot",
      "ModalTrigger",
      "ModalClose",
      "ModalContent",
      "ModalHeader",
      "ModalBody",
      "ModalFooter",
    ],
    api: [
      "ModalProps",
      "ModalRootProps",
      "ModalTriggerProps",
      "ModalContentProps",
    ],
    demos: ["basic", "uncontrolled", "sizes", "form", "compound"],
    wc: {
      entry: "modal",
      tags: ["minerva-modal"],
      demos: ["basic", "sizes", "form", "events"],
    },
    native: {
      exports: [
        "Dialog",
        "Modal",
        "ModalRoot",
        "ModalTrigger",
        "ModalClose",
        "ModalContent",
        "ModalHeader",
        "ModalBody",
        "ModalFooter",
      ],
      api: ["DialogProps", "ModalRootProps", "ModalTriggerProps"],
      demos: ["basic", "form", "confirm", "custom-footer"],
    },
  },
  {
    id: "confirm",
    category: "overlays",
    exports: ["ConfirmDialog", "ConfirmProvider", "confirm", "useConfirm"],
    api: ["ConfirmDialogProps", "ConfirmOptions", "ConfirmProviderProps"],
    demos: ["imperative", "colors", "provider", "declarative", "scoped"],
    wc: {
      entry: "confirm",
      tags: ["minerva-confirm-dialog", "minerva-confirm-provider"],
      demos: ["basic", "async", "imperative", "scoped"],
    },
    native: {
      exports: ["ConfirmDialog", "ConfirmProvider"],
      api: ["ConfirmDialogProps", "ConfirmProviderProps"],
      demos: ["basic"],
    },
  },
  {
    id: "drawer",
    cssVars: ["Drawer"],
    category: "overlays",
    exports: [
      "Drawer",
      "DrawerRoot",
      "DrawerTrigger",
      "DrawerClose",
      "DrawerContent",
      "DrawerHeader",
      "DrawerBody",
      "DrawerFooter",
    ],
    api: ["DrawerProps", "DrawerRootProps", "DrawerContentProps"],
    demos: ["basic", "sides", "compound"],
    wc: {
      entry: "drawer",
      tags: ["minerva-drawer"],
      demos: ["basic", "sides", "non-modal"],
    },
    native: {
      exports: [
        "Drawer",
        "DrawerRoot",
        "DrawerTrigger",
        "DrawerClose",
        "DrawerContent",
        "DrawerHeader",
        "DrawerBody",
        "DrawerFooter",
      ],
      api: ["PopupProps"],
      demos: ["basic"],
    },
  },
  {
    id: "command",
    cssVars: ["Command"],
    category: "overlays",
    exports: ["CommandDialog", "normalizeShortcuts", "matchesShortcut"],
    api: ["CommandDialogProps", "CommandItem"],
    demos: ["basic", "shortcut", "custom-filter", "site-search"],
    wc: {
      entry: "command",
      tags: ["minerva-command-dialog"],
      demos: ["basic", "shortcut", "custom-filter"],
    },
    native: {
      exports: ["CommandDialog"],
      api: ["CommandDialogProps"],
      demos: ["basic"],
    },
  },
  {
    id: "popover",
    cssVars: ["Popover"],
    category: "overlays",
    exports: [
      "Popover",
      "PopoverTrigger",
      "PopoverAnchor",
      "PopoverClose",
      "PopoverContent",
    ],
    api: ["PopoverProps", "PopoverContentProps", "PopoverTriggerProps"],
    demos: ["basic", "placement", "controlled"],
    wc: {
      entry: "popover",
      tags: ["minerva-popover"],
      demos: ["basic", "placement", "anchor"],
    },
    native: {
      exports: [
        "Popover",
        "PopoverTrigger",
        "PopoverAnchor",
        "PopoverClose",
        "PopoverContent",
      ],
      api: ["PopoverProps", "PopoverTriggerProps", "PopoverContentProps"],
      demos: ["basic"],
    },
  },

  {
    id: "menu",
    cssVars: ["Menu"],
    category: "overlays",
    exports: ["Menu", "ContextMenu"],
    api: [
      "MenuProps",
      "ContextMenuProps",
      "MenuAction",
      "MenuCheckboxEntry",
      "MenuRadioGroupEntry",
      "MenuRadioItem",
      "MenuSeparatorEntry",
      "MenuGroupEntry",
    ],
    demos: [
      "basic",
      "triggers",
      "groups",
      "submenus",
      "checkbox-radio",
      "placement",
      "disabled",
      "context-menu",
      "controlled",
    ],
    wc: {
      entry: "menu",
      tags: [
        "minerva-context-menu",
        "minerva-menu-item",
        "minerva-menu-checkbox-item",
        "minerva-menu-radio-item",
        "minerva-menu-group",
        "minerva-menu-separator",
        "minerva-menu-label",
        "minerva-menu",
      ],
      demos: ["basic", "checkbox-radio", "items", "context-menu"],
    },
    native: {
      exports: ["Menu", "ContextMenu"],
      api: ["MenuProps", "ContextMenuProps"],
      demos: ["basic"],
    },
  },
  {
    id: "toast",
    cssVars: ["Toast"],
    category: "feedback",
    exports: ["ToastProvider", "toast", "useToast"],
    api: [
      "ToastOptions",
      "ToastAction",
      "ToastProviderProps",
      "ToastApi",
      "ToastPromiseMessages",
    ],
    demos: [
      "basic",
      "colors",
      "options",
      "loading",
      "action",
      "dedupe",
      "scoped",
      "keyboard",
    ],
    native: {
      exports: ["ToastProvider", "toast", "useToast"],
      api: ["ToastOptions", "ToastApi", "ToastProviderProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "toast",
      tags: ["minerva-toast-region"],
      demos: ["basic", "options", "loading"],
    },
  },
  {
    id: "page-tabs",
    cssVars: ["PageTabs"],
    category: "navigation",
    exports: ["PageTabs", "PageTab"],
    api: ["PageTabsProps", "PageTabProps"],
    demos: ["basic", "context-menu", "overflow"],
    wc: {
      entry: "page-tabs",
      tags: ["minerva-page-tabs", "minerva-page-tab"],
      demos: ["basic", "actions", "overflow"],
    },
    native: {
      exports: ["PageTabs", "PageTab"],
      api: ["PageTabsProps", "PageTabProps"],
      demos: ["basic"],
    },
  },

  // Forms
  {
    id: "form-control",
    cssVars: ["FormControl"],
    category: "dataEntry",
    exports: [
      "FormControl",
      "FormLabel",
      "FormHelperText",
      "FormErrorMessage",
      "FormField",
      "useFormControlContext",
      "useFormControlProps",
    ],
    api: ["FormControlProps", "FormLabelProps", "FormFieldProps"],
    demos: ["basic", "form-field", "states", "custom-control"],
    wc: {
      entry: "form-control",
      tags: ["minerva-form-control"],
      demos: ["basic", "states", "slots", "form"],
    },
    native: {
      exports: [
        "FormControl",
        "FormLabel",
        "FormHelperText",
        "FormErrorMessage",
        "FormField",
      ],
      api: ["FormControlProps", "FormFieldProps"],
      demos: ["basic"],
    },
  },
  {
    id: "form-layout",
    cssVars: ["FormLayout"],
    category: "dataEntry",
    exports: ["FormLayout"],
    api: ["FormLayoutProps"],
    demos: ["basic", "gaps"],
    wc: {
      entry: "form-layout",
      tags: ["minerva-form-layout"],
      demos: ["basic", "gaps"],
    },
    native: {
      exports: ["FormLayout"],
      api: ["FormLayoutProps"],
      demos: ["basic"],
    },
  },
  {
    id: "input",
    cssVars: ["Input"],
    native: {
      exports: ["Input"],
      api: ["InputProps"],
      demos: ["basic", "states", "sizes-variants", "clearable-and-count"],
    },
    category: "dataEntry",
    exports: ["Input"],
    api: ["InputProps"],
    demos: [
      "basic",
      "sizes-variants",
      "addons",
      "clearable-and-count",
      "password",
      "states",
      "validation",
    ],
    wc: {
      entry: "input",
      tags: ["minerva-input"],
      demos: ["basic", "sizes-variants", "addons", "form"],
    },
  },
  {
    id: "textarea",
    cssVars: ["Textarea"],
    category: "dataEntry",
    exports: ["Textarea"],
    api: ["TextareaProps"],
    demos: ["basic", "sizes-variants", "form-control"],
    wc: {
      entry: "textarea",
      tags: ["minerva-textarea"],
      demos: ["basic", "sizes-variants", "form"],
    },
    native: { exports: ["Textarea"], api: ["TextareaProps"], demos: ["basic"] },
  },
  {
    id: "number-input",
    cssVars: ["NumberInput"],
    category: "dataEntry",
    exports: ["NumberInput"],
    api: ["NumberInputProps"],
    demos: ["basic", "stepper-precision", "form-control"],
    wc: {
      entry: "number-input",
      tags: ["minerva-number-input"],
      demos: ["basic", "precision", "form"],
    },
    native: {
      exports: ["NumberInput"],
      api: ["NumberInputProps"],
      demos: ["basic"],
    },
  },
  {
    id: "json-field",
    cssVars: ["JsonField"],
    category: "dataEntry",
    exports: ["JsonField"],
    api: ["JsonFieldProps"],
    demos: ["basic", "indent", "form-control"],
    wc: {
      entry: "json-field",
      tags: ["minerva-json-field"],
      demos: ["basic", "options", "form"],
    },
    native: {
      exports: ["JsonField"],
      api: ["JsonFieldProps"],
      demos: ["basic"],
    },
  },
  {
    id: "key-value-editor",
    cssVars: ["KeyValueEditor"],
    category: "dataEntry",
    exports: ["KeyValueEditor"],
    api: ["KeyValueEditorProps", "KeyValueEntry", "KeyValueEntryErrors"],
    demos: ["basic", "errors"],
    wc: {
      entry: "key-value-editor",
      tags: ["minerva-key-value-editor"],
      demos: ["basic", "errors", "form"],
    },
    native: {
      exports: ["KeyValueEditor"],
      api: ["KeyValueEditorProps"],
      demos: ["basic"],
    },
  },
  {
    id: "tag-input",
    cssVars: ["TagInput"],
    category: "dataEntry",
    exports: ["TagInput"],
    api: ["TagInputProps"],
    demos: ["basic", "form-control", "separators"],
    wc: {
      entry: "tag-input",
      tags: ["minerva-tag-input"],
      demos: ["basic", "separators", "states", "form"],
    },
    native: { exports: ["TagInput"], api: ["TagInputProps"], demos: ["basic"] },
  },

  {
    id: "loading-state",
    cssVars: ["LoadingState"],
    category: "feedback",
    exports: ["LoadingState"],
    api: ["LoadingStateProps"],
    demos: ["basic", "sizes"],
    wc: {
      entry: "loading-state",
      tags: ["minerva-loading-state"],
      demos: ["basic", "sizes", "section"],
    },
    native: {
      exports: ["LoadingState"],
      api: ["LoadingProps"],
      demos: ["basic"],
    },
  },
  {
    id: "text-link",
    cssVars: ["TextLink"],
    category: "dataDisplay",
    exports: ["TextLink"],
    api: ["TextLinkProps"],
    demos: ["variants", "as-child"],
    wc: {
      entry: "text-link",
      tags: ["minerva-text-link"],
      demos: ["basic", "variants", "styling"],
    },
    native: { exports: ["TextLink"], api: ["TextLinkProps"], demos: ["basic"] },
  },
  {
    id: "description-list",
    cssVars: ["DescriptionList"],
    category: "dataDisplay",
    exports: ["DescriptionList"],
    api: ["DescriptionListProps", "DescriptionListItem"],
    demos: ["basic", "variants"],
    wc: {
      entry: "description-list",
      tags: ["minerva-description-item", "minerva-description-list"],
      demos: ["basic", "items", "variants", "styling"],
    },
    native: {
      exports: ["DescriptionList"],
      api: ["DescriptionListProps"],
      demos: ["basic"],
    },
  },
  {
    id: "list",
    cssVars: ["List"],
    category: "dataDisplay",
    exports: ["List", "ListItem"],
    api: ["ListProps", "ListItemProps"],
    demos: ["basic", "compact", "bordered"],
    wc: {
      entry: "list",
      tags: ["minerva-list", "minerva-list-item"],
      demos: ["basic", "slots", "density", "bordered"],
    },
    native: {
      exports: ["Cell", "CellGroup", "List", "ListItem"],
      api: ["CellProps", "CellGroupProps", "ListProps", "ListItemProps"],
      demos: ["basic", "inset-groups", "rich-rows"],
    },
  },
  {
    id: "code-block",
    cssVars: ["CodeBlock"],
    category: "dataDisplay",
    exports: ["CodeBlock"],
    api: ["CodeBlockProps"],
    demos: ["basic", "no-wrap", "copyable"],
    wc: {
      entry: "code-block",
      tags: ["minerva-code-block"],
      demos: ["basic", "copy", "overflow"],
    },
    native: {
      exports: ["CodeBlock"],
      api: ["CodeBlockProps"],
      demos: ["basic"],
    },
  },
  {
    id: "prose",
    cssVars: ["Prose"],
    category: "dataDisplay",
    exports: ["Prose"],
    api: ["ProseProps"],
    demos: ["basic", "as-child"],
    wc: {
      entry: "prose",
      tags: ["minerva-prose"],
      demos: ["basic", "rich-content", "scopes"],
    },
    native: { exports: ["Prose"], api: ["ProseProps"], demos: ["basic"] },
  },
  {
    id: "design-presets",
    category: "theming",
    api: ["DesignOptions"],
    demos: ["presets", "axes"],
  },
  {
    id: "theme-palette",
    cssVars: ["ThemeToggle"],
    category: "theming",
    exports: [
      "ThemeProvider",
      "useTheme",
      "ThemeToggle",
      "PaletteToggle",
      "palettes",
    ],
    api: [
      "ThemeProviderProps",
      "ThemeContextValue",
      "ThemeToggleProps",
      "PaletteToggleProps",
    ],
    demos: ["toggles", "palette-swatches", "use-theme"],
    wc: {
      entry: "theme-toggle",
      tags: ["minerva-theme-toggle", "minerva-palette-toggle"],
      demos: ["basic", "palette", "events"],
    },
    native: {
      exports: [
        "ThemeToggle",
        "PaletteToggle",
        "PresetToggle",
        "ThemeProvider",
      ],
      api: [
        "ThemeToggleProps",
        "PaletteToggleProps",
        "PresetToggleProps",
        "MinervaProviderProps",
      ],
      demos: ["preset", "toggles"],
    },
  },
  {
    id: "table",
    cssVars: ["Table"],
    category: "dataDisplay",
    exports: [
      "Table",
      "TableRoot",
      "TableHead",
      "TableBody",
      "TableRow",
      "TableHeader",
      "TableCell",
      "TableCellContent",
      "DataTable",
      "computeFixedColumnLayout",
    ],
    api: [
      "TableProps",
      "TableColumn",
      "DataTableProps",
      "TableRootProps",
      "TableScrollConfig",
      "TableSortState",
      "TableRowSelection",
      "TableCellContentProps",
      "FixedColumnLayout",
    ],
    demos: [
      "basic",
      "variants",
      "fixed-columns",
      "states",
      "data-table",
      "compound",
      "cell-content",
      "sorting",
      "selection",
    ],
    wc: {
      entry: "data-table",
      tags: ["minerva-data-table", "minerva-table-cell-content"],
      demos: ["basic", "pagination", "selection", "sorting"],
    },
    native: {
      exports: [
        "Table",
        "TableRoot",
        "TableHead",
        "TableBody",
        "TableRow",
        "TableHeader",
        "TableCell",
        "TableCellContent",
        "DataTable",
      ],
      api: ["TableProps", "TableCellContentProps", "DataTableProps"],
      demos: ["basic"],
    },
  },
  {
    id: "nav-tree",
    cssVars: ["NavTree"],
    category: "navigation",
    exports: ["NavTree"],
    api: ["NavTreeProps", "NavTreeSection", "NavTreeItem", "NavTreeItemState"],
    demos: ["basic", "collapsed", "custom-link"],
    wc: {
      entry: "nav-tree",
      tags: ["minerva-nav-tree"],
      demos: ["basic", "collapsed", "expansion"],
    },
    native: { exports: ["NavTree"], api: ["NavTreeProps"], demos: ["basic"] },
  },
  {
    id: "tabs",
    cssVars: ["Tabs"],
    category: "navigation",
    exports: ["Tabs", "TabList", "Tab", "TabPanel"],
    api: ["TabsProps", "TabListProps", "TabProps", "TabPanelProps"],
    demos: ["basic", "variants", "colors", "vertical"],
    wc: {
      entry: "tabs",
      tags: ["minerva-tabs", "minerva-tab", "minerva-tab-panel"],
      demos: ["basic", "variants", "vertical", "controlled", "panels"],
    },
    native: {
      exports: ["Tabs", "TabList", "Tab", "TabPanel"],
      api: [
        "TabsProps",
        "TabListProps",
        "TabProps",
        "TabPanelProps",
        "TabsItemData",
      ],
      demos: ["basic", "compound", "scrollable", "variants"],
    },
  },
  {
    id: "html-preview",
    cssVars: ["HtmlPreview"],
    category: "dataDisplay",
    exports: ["HtmlPreview"],
    api: ["HtmlPreviewProps"],
    demos: ["basic", "viewports"],
    wc: {
      entry: "html-preview",
      tags: ["minerva-html-preview"],
      demos: ["basic", "viewport", "sanitized"],
    },
    native: {
      exports: ["HtmlPreview"],
      api: ["HtmlPreviewProps"],
      demos: ["basic"],
    },
  },
  {
    id: "monaco-code-editor",
    cssVars: ["MonacoCodeEditor"],
    category: "editors",
    api: ["MonacoCodeEditorProps"],
    demos: ["basic"],
    wc: {
      // optional entry (not in the all-in-one entry nor the CDN bundle)
      entry: "code-editor",
      tags: ["minerva-code-editor"],
      demos: ["basic", "fallback"],
    },
    native: {
      exports: ["CodeEditor"],
      api: ["CodeEditorProps"],
      demos: ["basic"],
    },
  },
  {
    id: "steps",
    cssVars: ["Steps"],
    category: "navigation",
    exports: ["Steps"],
    api: ["StepsProps", "StepsItem"],
    demos: ["basic", "read-only", "styling"],
    wc: {
      entry: "steps",
      tags: ["minerva-steps"],
      demos: ["basic", "navigable", "styling"],
    },
    native: {
      exports: ["Steps"],
      api: ["StepsProps", "StepsItem"],
      demos: ["basic", "vertical"],
    },
  },
  {
    id: "upload",
    cssVars: ["Upload"],
    category: "dataEntry",
    exports: ["Upload"],
    api: ["UploadProps", "UploadItem", "UploadLabels"],
    demos: ["basic", "multiple"],
    wc: {
      entry: "upload",
      tags: ["minerva-upload"],
      demos: ["basic", "transfer", "form"],
    },
    native: { exports: ["Upload"], api: ["UploadProps"], demos: ["basic"] },
  },
  {
    id: "select",
    cssVars: ["Select"],
    category: "dataEntry",
    exports: [
      "Select",
      "SelectItem",
      "SelectGroup",
      "SelectLabel",
      "SelectSeparator",
    ],
    api: [
      "SelectProps",
      "SelectItemProps",
      "SelectGroupProps",
      "SelectLabelProps",
      "SelectSeparatorProps",
    ],
    demos: ["basic", "groups", "sizes-and-states"],
    native: {
      exports: [
        "Select",
        "SelectItem",
        "SelectGroup",
        "SelectLabel",
        "SelectSeparator",
      ],
      api: [
        "SelectSingleProps",
        "SelectMultipleProps",
        "SelectOption",
        "SelectProps",
        "SelectItemProps",
        "SelectGroupProps",
      ],
      demos: ["basic"],
    },
    wc: {
      entry: "select",
      tags: [
        "minerva-option",
        "minerva-option-group",
        "minerva-select-label",
        "minerva-select-separator",
        "minerva-select",
      ],
      demos: ["basic", "groups", "options-property", "form"],
    },
  },
  {
    id: "rating",
    cssVars: ["Rating"],
    category: "dataEntry",
    exports: ["Rating", "RatingScale"],
    api: ["RatingProps", "RatingScaleProps", "RatingDimension"],
    demos: ["basic", "interactive", "scale"],
    wc: {
      entry: "rating",
      tags: ["minerva-rating", "minerva-rating-scale"],
      demos: ["basic", "interactive", "form", "scale"],
    },
    native: {
      exports: ["Rating", "RatingScale"],
      api: ["RatingProps", "RatingScaleProps"],
      demos: ["basic"],
    },
  },
  {
    id: "month-calendar",
    cssVars: ["MonthCalendar"],
    category: "dataDisplay",
    exports: ["MonthCalendar"],
    api: ["MonthCalendarProps", "MonthCalendarEvent"],
    demos: ["basic", "sizes", "range"],
    wc: {
      entry: "month-calendar",
      tags: ["minerva-month-calendar"],
      demos: ["basic", "events", "sizes", "range", "localized"],
    },
    native: {
      exports: ["MonthCalendar"],
      api: ["CalendarProps"],
      demos: ["basic"],
    },
  },

  // Web Components (guides; every component page has a "Web Components" tab)
  {
    id: "web-components",
    category: "webComponents",
    package: "minerva-design/web-components",
    // Utilities of the package (the elements are documented on their pages)
    exports: [
      "defineElement",
      "emit",
      "MinervaElement",
      "hostStyles",
      "FormAssociatedElement",
      "LocaleController",
      "resolveLanguage",
      "AriaController",
      "HasSlotController",
      "AnchoredPositionController",
      "DismissableLayerController",
      "FocusScopeController",
      "ModalController",
      "RovingFocusController",
      "TypeaheadController",
      "FloatingLayerController",
      "popoverResetStyles",
      // helpers re-exported next to their elements
      "matchesShortcut",
      "normalizeShortcuts",
      "computeFixedColumnLayout",
      "SUBMENU_OPEN_DELAY",
      "LONG_PRESS_DELAY",
      "MinervaContextMenu",
      // imperative confirmation (documented on the Confirm page)
      "confirm",
      "confirmFor",
      "confirmScopeOf",
    ],
    demos: ["react"],
  },
  { id: "wc-plain-html", category: "webComponents" },
  { id: "wc-vue", category: "webComponents" },
  { id: "wc-angular", category: "webComponents" },
  { id: "wc-svelte", category: "webComponents" },
  { id: "wc-forms", category: "webComponents" },
  { id: "wc-theming", category: "webComponents" },
  {
    id: "nav-bar",
    category: "mobile",
    native: {
      exports: ["NavBar"],
      api: ["NavBarProps"],
      demos: ["actions", "basic"],
    },
  },
  {
    id: "tab-bar",
    category: "mobile",
    native: {
      exports: ["TabBar", "TabBarItem"],
      api: ["TabBarProps", "TabBarItemProps"],
      demos: ["badges", "basic"],
    },
  },
  {
    id: "pull-refresh",
    category: "mobile",
    native: {
      exports: ["PullRefresh", "usePullRefresh"],
      api: [
        "PullRefreshProps",
        "UsePullRefreshOptions",
        "UsePullRefreshResult",
      ],
      demos: ["basic", "use-pull-refresh"],
    },
  },
  {
    id: "swipe-cell",
    category: "mobile",
    native: {
      exports: ["SwipeCell"],
      api: ["SwipeCellProps", "SwipeCellAction", "SwipeCellHandle"],
      demos: ["basic", "custom-actions"],
    },
  },
  {
    id: "collapse",
    category: "mobile",
    native: {
      exports: ["Collapse", "CollapseItem"],
      api: ["CollapseProps", "CollapseItemProps"],
      demos: ["accordion", "basic"],
    },
  },
  {
    id: "grid",
    category: "mobile",
    native: {
      exports: ["Grid", "GridItem"],
      api: ["GridProps", "GridItemProps"],
      demos: ["basic", "square-columns"],
    },
  },
  {
    id: "image-preview",
    category: "mobile",
    native: {
      exports: ["ImagePreview"],
      api: ["ImagePreviewProps"],
      demos: ["basic", "controlled"],
    },
  },
];

export const getDocPage = (id: string) => docPages.find((p) => p.id === id);
