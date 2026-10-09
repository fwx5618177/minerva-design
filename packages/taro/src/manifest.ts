/** Auditable implementation scope. Presence is not a declaration of full React parity.
 * Host tests run Taro's real H5 React primitives; native devices require separate validation.
 */
export interface TaroComponentManifestEntry {
  name: string;
  status?: "n/a";
  scope: string;
  limitations: string[];
  tests: string[];
}
const nativeLimit =
  "Native touch/view semantics differ from browser DOM semantics. Native devices do not expose document focus, inert, browser portals or File input APIs; H5 capabilities are specified separately. Device-runtime validation is still required.";
const families: Array<{
  names: string[];
  status?: "n/a";
  scope: string;
  limitations?: string[];
  tests?: string[];
}> = [
  {
    names: ["Button"],
    scope:
      "Native button activation, disabled/loading guards, loading replacement, icons, semantic color, five sizes, variants, formType and shape.",
    tests: ["packages/taro/src/components.test.tsx"],
  },
  {
    names: ["Input", "Switch"],
    scope:
      "Controlled/uncontrolled values, native events, inherited disabled/readOnly, input clear/onClear/password/linked count, whole-adornment wrapper classes/variants/sizes, switch label/icon placement, size/color/shape/style, named checked values and segmented toggles.",
    limitations: [
      "Browser validation/autocomplete differ. Switch uses native View/Button track/thumb controls with native activation events, theme dimensions and centered touch ripple.",
    ],
    tests: [
      "packages/taro/src/components.test.tsx",
      "packages/taro/src/contracts.test.tsx",
    ],
  },
  {
    names: ["Textarea", "JsonField"],
    scope:
      "Native textarea values, input events, locking, invalid JSON draft retention and JSON formatting.",
    limitations: [
      "Native textarea does not expose the browser selection/ref API.",
    ],
    tests: ["packages/taro/src/parity.test.tsx"],
  },
  {
    names: ["Checkbox", "CheckboxGroup", "Radio", "RadioGroup"],
    scope:
      "Boolean/single/multiple and numeric Radio selection, native event callbacks and named checked-value fields, custom icons/helper errors, group size/color, disabled/readOnly, max selections and controlled owner rejection.",
    limitations: [
      "Browser indeterminate DOM property and native browser form serialization are not applicable.",
    ],
    tests: [
      "packages/taro/src/parity.test.tsx",
      "packages/taro/src/contracts.test.tsx",
    ],
  },
  {
    names: ["NumberInput"],
    scope:
      "Numeric parsing, draft validation/custom messages, decimal rounding, min/max clamping, optional steppers, allowEmpty fallback and inherited locking.",
    limitations: [
      "Intermediate drafts commit on native blur/confirm; browser arrow-key stepping is not reproduced.",
    ],
    tests: ["packages/taro/src/parity.test.tsx"],
  },
  {
    names: [
      "Select",
      "SelectItem",
      "SelectGroup",
      "SelectLabel",
      "SelectSeparator",
    ],
    scope:
      "Single-choice combobox, controlled value/open, named owner values, trigger size/style/required/invalid, disabled choices, option arrays and compound items with selected label resolution and measured viewport-fitting popup placement.",
    limitations: [
      "H5 supports keyboard opening, disabled-aware roving and typeahead. Native selector measurements position the popup; this Select popup remains inline.",
    ],
    tests: [
      "packages/taro/src/parity.test.tsx",
      "packages/taro/src/contracts.test.tsx",
    ],
  },
  {
    names: ["AutoComplete"],
    scope:
      "Filter/sort/group options including numeric values, loading/empty states, native confirm first-enabled selection, input props, label fill and original selection/click callbacks; four measured placements and offsets with viewport collision fitting.",
    limitations: [
      "H5 supports arrow-key active-option navigation and Enter commit with input focus retained. Native confirm chooses the first enabled filtered option when autoHighlight is enabled. The popup remains inline.",
    ],
    tests: [
      "packages/taro/src/advanced.test.tsx",
      "packages/taro/src/parity.test.tsx",
      "packages/taro/src/contracts.test.tsx",
    ],
  },
  {
    names: ["Cascader"],
    scope:
      "Hierarchical numeric/string paths, original option callbacks, concurrent horizontally scrolling columns, searchable enabled leaves/custom filter, max depth, clear, controlled refusal, live children, retryable asynchronous loading and measured viewport-fitting popup placement.",
    limitations: [
      "expandTrigger=hover maps to native long press; native scroll panes replace browser hover; positioned popups remain in the native view hierarchy instead of a browser portal.",
    ],
    tests: [
      "packages/taro/src/advanced.test.tsx",
      "packages/taro/src/parity.test.tsx",
    ],
  },
  {
    names: ["TagInput", "KeyValueEditor"],
    scope:
      "Tag deduplication, literal multi-character separator input with retained tail, configurable blur/confirm commits, deduplicated filtered suggestions/create/removal/clear, native checkbox-group form serialization of committed tags, stable key/value rows and id-keyed field errors.",
    limitations: [
      "Native text-input events process pasted separators; browser clipboard selection offsets and combobox keyboard navigation are not exposed.",
    ],
    tests: [
      "packages/taro/src/parity.test.tsx",
      "packages/taro/src/contracts.test.tsx",
    ],
  },
  {
    names: ["Rating", "RatingScale"],
    scope:
      "Controlled rating values on a ten-step scale, max mapping, native touch selection and read-only guards; dimension callbacks.",
    limitations: [
      "Native half-star touch targets use explicit choices; hover preview and keyboard slider interaction differ.",
    ],
    tests: [
      "packages/taro/src/parity.test.tsx",
      "packages/taro/src/contracts.test.tsx",
    ],
  },
  {
    names: [
      "FormControl",
      "FormField",
      "FormLabel",
      "FormHelperText",
      "FormErrorMessage",
    ],
    scope:
      "Context inheritance, labels, required indicator, helper/error composition and explicit disabled overrides.",
    limitations: [
      "Native label/id linkage varies by host accessibility implementation.",
    ],
    tests: ["packages/taro/src/contracts.test.tsx"],
  },
  {
    names: ["Tabs", "Tab", "TabList", "TabPanel"],
    scope:
      "Controlled/uncontrolled composition, disabled tabs, selected/force-mounted panels, shared-core first-enabled tab stop, semantic colors, variants, orientation and direction.",
    limitations: [
      "activationMode and TabList loop affect browser keyboard focus only; native activation uses taps. First-enabled tab-stop fallback is implemented without changing controlled selection.",
    ],
    tests: ["packages/taro/src/parity.test.tsx"],
  },
  {
    names: ["PageTabs", "PageTab", "Steps", "NavTree"],
    scope:
      "Page-tab onSelect/actions/close events, measured overflow arrows and active-item native scrollIntoView; step selection, active-path tree expansion with explicit collapse persistence and renderLink(item,content,state).",
    limitations: [
      "Native horizontal scrolling and touch activation replace browser keyboard navigation. Native route links require the application renderer or onItemSelect to navigate.",
      "PageTabs uses native scroll measurement and explicit dir for RTL; React has no reorder API, and child order follows the caller.",
    ],
    tests: [
      "packages/taro/src/advanced.test.tsx",
      "packages/taro/src/parity.test.tsx",
      "packages/taro/src/contracts.test.tsx",
    ],
  },
  {
    names: ["Pagination"],
    scope:
      "Shared page bounds/visible ranges/items, controlled page and size rejection, one combined size-change event, simple draft rollback, hideEdges, item/total renderers, icons and responsive page-number collapse.",
    limitations: [
      "Page-size choices use native buttons instead of a browser select; quick jump commits with the native input confirm event.",
    ],
    tests: [
      "packages/taro/src/advanced.test.tsx",
      "packages/taro/src/parity.test.tsx",
    ],
  },
  {
    names: [
      "Modal",
      "ModalRoot",
      "ModalTrigger",
      "ModalClose",
      "ModalContent",
      "ModalHeader",
      "ModalBody",
      "ModalFooter",
      "Drawer",
      "DrawerRoot",
      "DrawerTrigger",
      "DrawerContent",
      "DrawerClose",
      "DrawerHeader",
      "DrawerBody",
      "DrawerFooter",
    ],
    scope:
      "Controlled/uncontrolled disclosure, compound triggers/close/sections, accessible title/description, cancellable outside taps, modal backdrop choice, forceMount state, four drawer sides/sizes, five modal widths, reactive compound header naming and themed overlay surfaces.",
    limitations: [
      "Browser focus return/trap, scroll lock and inert background handling are not native equivalents. Non-modal drawers leave the page interactive; native page-global outside-focus/pointer listeners are unavailable, so non-modal dismissal uses the trigger/close controls.",
    ],
    tests: [
      "packages/taro/src/parity.test.tsx",
      "packages/taro/src/contracts.test.tsx",
      "packages/taro/src/styles.test.tsx",
    ],
  },
  {
    names: [
      "Popover",
      "PopoverTrigger",
      "PopoverAnchor",
      "PopoverContent",
      "PopoverClose",
      "Tooltip",
      "TooltipProvider",
    ],
    scope:
      "Native anchored composition/close, controlled opening and outside dismissal; measured side flipping/viewport shifting/width matching; tooltip offsets, alignment, visual variants/animations, composed triggers, callbacks and provider timing.",
    limitations: [
      "Browser hover/cursor following and portal positioning are not native equivalents; tooltip delay groups apply to native tap/long-press opening and closing.",
      "Geometry is measured on opening/resizing and at 100 ms intervals while visible, with cleanup on close/unmount. Native clipping ancestors and glass backdrop filtering require device validation.",
    ],
    tests: [
      "packages/taro/src/advanced.test.tsx",
      "packages/taro/src/parity.test.tsx",
    ],
  },
  {
    names: ["ConfirmDialog", "ConfirmProvider"],
    scope:
      "Declarative confirmation, semantic button colors and ReactNode labels, guarded loading/disabled submit, cancellation and scoped Promise confirmation.",
    limitations: [
      "Global confirm() uses the native host modal and requires string title/description/button labels; standalone calls use default-theme colors and host modal sizing. Use ConfirmProvider for composed content, theme/locale inheritance and custom layout.",
    ],
    tests: [
      "packages/taro/src/parity.test.tsx",
      "packages/taro/src/native-api.test.tsx",
    ],
  },
  {
    names: [
      "Menu",
      "ContextMenu",
      "MenuItem",
      "MenuCheckboxItem",
      "MenuRadioItem",
      "MenuGroup",
      "MenuLabel",
      "MenuSeparator",
    ],
    scope:
      "Action/checkbox/radio/group/submenu entries, controlled open, size, measured side/alignment with viewport collision handling, disabled or cancelled triggers and close-on-select; context long press. Recursive submenus use separately measured fixed panels, directional arrows, RTL side preference, collision flipping and measurement cleanup.",
    limitations: [
      "H5 supports menu loops, typeahead, submenu arrows and document-wide nonmodal outside dismissal. Native context-menu opening uses long press and explicit dir; browser pointer coordinates and global document listeners do not apply on devices.",
    ],
    tests: ["packages/taro/src/parity.test.tsx"],
  },
  {
    names: ["CommandDialog"],
    scope:
      "React title/keywords/description/group command data, native search, caller-preserved filter ordering, limits, reopening query reset, custom labels/hints and disabled-command exclusion in a modal.",
    limitations: [
      "H5 supports shared-core global shortcuts and active-option keyboard navigation; native touch/confirm interactions do not expose document shortcuts.",
    ],
    tests: [
      "packages/taro/src/advanced.test.tsx",
      "packages/taro/src/parity.test.tsx",
    ],
  },
  {
    names: ["ToastProvider"],
    scope:
      "Scoped callable toast API, semantic helpers, id replacement/update, promises, duration, max overflow, actions and dismissal callbacks.",
    limitations: [
      "Requires a mounted provider; native hover pause and focus hotkeys do not apply.",
    ],
    tests: ["packages/taro/src/native-api.test.tsx"],
  },
  {
    names: [
      "Table",
      "DataTable",
      "TableRoot",
      "TableHead",
      "TableHeader",
      "TableBody",
      "TableRow",
      "TableCell",
      "TableCellContent",
    ],
    scope:
      "Declarative or compound native tables, shared-core local/custom sorting, disabled-row selection, configurable loading skeleton rows, size/striping/selection colors, native touch row hover, empty/error/retry and pagination composition.",
    limitations: [
      "Fixed column offsets use shared-core layout; native View cells replace browser table elements; arbitrary HTML cell attributes are not forwarded.",
    ],
    tests: [
      "packages/taro/src/parity.test.tsx",
      "packages/taro/src/styles.test.tsx",
    ],
  },
  {
    names: ["VirtualList"],
    scope:
      "Fixed-height native ScrollView windowing with optional first-row measurement, item padding, overscan, compact short lists, native item click events, optional 16 ms scroll batching, pixel loading thresholds and Promise load-more mutual exclusion.",
    limitations: [
      "Both React and this renderer use one fixed row height. Native scheduling uses a 16 ms timer instead of browser requestAnimationFrame/requestIdleCallback; browser ref targets are not reproduced.",
    ],
    tests: ["packages/taro/src/parity.test.tsx"],
  },
  {
    names: ["MonthCalendar"],
    scope:
      "Monday-first 42-day grid, month navigation/rollover, date selection with spillover-month navigation, ordered highlighted ranges, three cell sizes, event counts/list/activation and custom event-region labels.",
    limitations: [
      "H5 supports roving arrows and Home/End day focus; native hosts use touch day selection.",
    ],
    tests: ["packages/taro/src/parity.test.tsx"],
  },
  {
    names: ["TimePicker"],
    scope:
      "React Date/null values, core strict/lenient typed parsing and format-driven seconds, native 12/24-hour option columns, steps/minmax disabling, controlled draft rollback, onOpenChange, clear and form-context locks.",
    limitations: [
      "Uses native input/view/scroll columns; browser focus navigation and native input confirm delivery depend on the host. React TimePicker has no externally controlled open prop.",
    ],
    tests: ["packages/taro/src/native-api.test.tsx"],
  },
  {
    names: ["Upload"],
    scope:
      "Native file chooser, validated native-file onFilesSelected callback, whole-batch accept/size/count enforcement with React single-only replace semantics, controlled items, preview/status/custom labels, remove/retry/loading/progress and error feedback.",
    limitations: [
      "H5 supports real File input, reset and drop with the same whole-batch validation. Native capability selection uses chooseMessageFile or a compatible media picker, reports unavailable picker errors, and depends on host MIME metadata.",
    ],
    tests: ["packages/taro/src/native-api.test.tsx"],
  },
  {
    names: ["Avatar", "AvatarGroup", "Badge"],
    scope:
      "Retryable image failure fallback, CJK/word initials, React avatar sizes/shapes, group overlap/additional overflow counts, standalone or attached badges, four corners, border geometry and semantic variants.",
    limitations: [
      "Native image decoding and device text metrics require device validation.",
    ],
    tests: ["packages/taro/src/display.test.tsx"],
  },
  {
    names: [
      "Card",
      "CardHeader",
      "CardTitle",
      "CardDescription",
      "CardContent",
      "CardFooter",
      "StatCard",
      "IconButton",
    ],
    scope:
      "Native card sections/preset padding/content animations, interactive disabled cards, safe native navigation, statistics, icon actions/uncontrolled toggles and configured native tooltip integration.",
    limitations: [
      "Browser as/asChild and download/target/rel are not native navigation equivalents; tooltips use native tap/long press.",
    ],
    tests: ["packages/taro/src/display.test.tsx"],
  },
  {
    names: ["Alert", "Tag"],
    scope:
      "Semantic roles/colors/variants/sizes, title/actions/custom icons, alert collapse/close/animations/banner/rounding/elevation and guarded tag actions/loading/shape/elevation and native measured touch-origin ripples.",
    limitations: [
      "Tag ripple coordinates use native touch/tap data and measured bounds, falling back to center for keyboard activation or hosts without coordinates. DOM focus-return behavior is not reproduced.",
    ],
    tests: ["packages/taro/src/parity.test.tsx"],
  },
  {
    names: [
      "Divider",
      "Empty",
      "Skeleton",
      "SkeletonText",
      "ProgressIndicator",
      "LoadingState",
    ],
    scope:
      "Axis-aware separators with length/spacing/text/elevation, Empty dimensions/shadow/accessible description/illustration/footer/actions, decorative or announced skeleton shapes/avatar/title/paragraph/pulse/wave, and five distinct themed progress variants/full width.",
    limitations: [
      "Illustration is a token-colored SVG native image; image decoding and decorative animations require device validation.",
    ],
    tests: ["packages/taro/src/display.test.tsx"],
  },
  {
    names: [
      "TextLink",
      "DescriptionList",
      "DescriptionItem",
      "List",
      "ListItem",
      "CodeBlock",
      "Prose",
    ],
    scope:
      "Safe native navigation, description/list composition, text wrapping and native clipboard code copying.",
    limitations: [
      "Navigator routes must be valid host routes; browser external-link behavior and HTML prose selectors are not equivalent.",
    ],
    tests: ["packages/taro/src/native-api.test.tsx"],
  },
  {
    names: ["HtmlPreview"],
    scope:
      "H5 sanitized CSP-protected opaque iframe with viewport sizing; native inert HTML source preview renders scripts as text.",
    limitations: [
      "Native alternative only: no HTML layout, iframe sandbox, viewport rendering or script execution.",
    ],
    tests: ["packages/taro/src/parity.test.tsx"],
  },
  {
    names: ["MonacoCodeEditor"],
    status: "n/a",
    scope:
      "Optional taro/monaco H5 entry creates a supplied local Monaco engine, synchronizes controlled text/language/theme/readOnly, releases the model/editor, and exposes timeout/error fallback with retry. Native Monaco remains unsupported.",
    limitations: [
      "Use the separately named Textarea or JsonField to edit source text. They do not provide Monaco loading, syntax highlighting, language services, diagnostics, minimap or editor instance APIs.",
    ],
    tests: ["packages/taro/src/parity.test.tsx"],
  },
  {
    names: [
      "Box",
      "Stack",
      "HStack",
      "VStack",
      "ResponsiveGrid",
      "GridItem",
      "FormLayout",
      "SplitLayout",
      "Page",
      "PageHeader",
      "PageSection",
      "Toolbar",
      "AppShell",
    ],
    scope:
      "Native view layouts, token-aware Box background/radius/shadow and numeric size resolution, spacing and attached controls, container-measured responsive grids/SplitLayout, sections/actions, compact/expanded/floating AppShell navigation and mobile drawer with route-change dismissal.",
    limitations: [
      "CSS as/asChild polymorphism is not native. Floating AppShell expands by touch rather than hover. Measurements initially use window width until the native selector query returns.",
    ],
    tests: [
      "packages/taro/src/advanced.test.tsx",
      "packages/taro/src/display.test.tsx",
    ],
  },
  {
    names: [
      "ConfigProvider",
      "ThemeProvider",
      "ThemeToggle",
      "PaletteToggle",
      "PresetToggle",
    ],
    scope:
      "Native theme token classes plus resolved custom objects/light-dark pairs/github-dark, system subscription, theme/palette storage, nested inheritance, design axes and localized toggles/actions from shared dictionaries.",
    limitations: [
      "Browser cookies/SSR bootstrap use native storage instead. Provider-scoped dictionaries cover controls/editors, calendar/weekdays, command defaults, page-tab actions, display actions and application navigation; global native confirm outside a provider requires explicit localized labels.",
    ],
    tests: [
      "packages/taro/src/theme.test.tsx",
      "packages/taro/src/contracts.test.tsx",
      "packages/taro/src/display.test.tsx",
    ],
  },
];
const nativeNavigationFamilies = new Set([
  "Menu",
  "ContextMenu",
  "Select",
  "AutoComplete",
  "Cascader",
  "TimePicker",
  "PageTabs",
  "PageTab",
  "Popover",
  "PopoverAnchor",
  "PopoverTrigger",
  "PopoverContent",
  "PopoverClose",
  "Tooltip",
  "TooltipProvider",
  "VirtualList",
]);
const portableAuditFamilies = new Set([
  "Box",
  "Drawer",
  "DrawerRoot",
  "DrawerTrigger",
  "DrawerContent",
  "DrawerClose",
  "DrawerHeader",
  "DrawerBody",
  "DrawerFooter",
  "Upload",
  "CommandDialog",
  "Checkbox",
  "Radio",
  "RadioGroup",
  "Select",
  "TagInput",
  "Switch",
  "Empty",
  "MonthCalendar",
  "VirtualList",
  "Alert",
  "Card",
]);
const browserFamilies = new Set([
  "Select",
  "AutoComplete",
  "Cascader",
  "Menu",
  "Table",
  "MonthCalendar",
  "Switch",
  "Modal",
  "ModalClose",
  "Box",
  "Alert",
  "Drawer",
  "DrawerClose",
  "ConfigProvider",
  "ThemeToggle",
  "Avatar",
  "Badge",
  "Button",
  "Card",
  "TimePicker",
  "PageTabs",
  "PageTab",
  "Popover",
  "PopoverContent",
  "PopoverClose",
  "VirtualList",
  "ToastProvider",
  "Input",
  "FormControl",
  "ConfirmDialog",
  "DataTable",
]);
const remainingRegressionFamilies = new Set([
  "Button",
  "Avatar",
  "AvatarGroup",
  "Badge",
  "Stack",
  "HStack",
  "VStack",
  "Tabs",
  "Tab",
  "TabList",
  "TabPanel",
  "AppShell",
  "Alert",
  "Tag",
  "ConfigProvider",
  "MonthCalendar",
  "PageTabs",
  "PageTab",
  "LoadingState",
  "CodeBlock",
  "CommandDialog",
  "NumberInput",
  "TagInput",
  "Switch",
  "IconButton",
  "Divider",
  "ProgressIndicator",
  "Cascader",
  "Skeleton",
  "SkeletonText",
  "Card",
  "CardContent",
  "Rating",
  "Steps",
  "ToastProvider",
]);
export const taroComponentManifest: TaroComponentManifestEntry[] =
  families.flatMap((family) =>
    family.names.map((name) => ({
      name,
      scope: family.scope,
      ...(family.status ? { status: family.status } : {}),
      limitations: [nativeLimit, ...(family.limitations ?? [])],
      tests: [
        ...(family.tests ?? []),
        ...([
          "Menu",
          "ContextMenu",
          "Table",
          "TableRoot",
          "TableRow",
          "MonthCalendar",
          "ConfirmDialog",
          "Input",
          "Switch",
          "Modal",
          "ModalRoot",
          "ModalTrigger",
          "ModalClose",
          "ModalContent",
          "ModalHeader",
          "Drawer",
          "DrawerClose",
          "DrawerHeader",
          "Select",
          "SelectItem",
          "TagInput",
        ].includes(name)
          ? ["packages/taro/src/final-api-audit.test.tsx"]
          : []),
        ...(portableAuditFamilies.has(name)
          ? ["packages/taro/src/portable-audit.test.tsx"]
          : []),
        ...(nativeNavigationFamilies.has(name)
          ? ["packages/taro/src/native-navigation.test.tsx"]
          : []),
        ...(browserFamilies.has(name)
          ? ["packages/taro/spike/browser/styles.spec.ts"]
          : []),
        ...(remainingRegressionFamilies.has(name)
          ? ["packages/taro/src/remaining-parity.test.tsx"]
          : []),
      ],
    })),
  );
