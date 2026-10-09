/** Auditable native scope; host tests do not certify real-device E2E. */
export const uniComponentManifest = [
  {
    name: "Button",
    scope:
      "Five sizes; solid/outline/ghost/link; semantic colors; loading text; leading/trailing icon slots; native submit/reset; disabled; active; full width; shape/radius.",
    limitations: [],
    tests: [
      "src/parity.test.ts: native host mount",
      "src/parity.test.ts: interaction/state assertions",
      "src/workflow.test.ts: cross-component native-host flow",
    ],
    status: "implemented",
    deviceE2E: false,
  },
  {
    name: "Input",
    scope:
      "Controlled/uncontrolled text input; native password visibility; clear action; character count; prefix/suffix slots; validation styling; field inheritance in uni.",
    limitations: [],
    tests: [
      "src/parity.test.ts: native host mount",
      "src/parity.test.ts: interaction/state assertions",
      "src/workflow.test.ts: cross-component native-host flow",
    ],
    status: "implemented",
    deviceE2E: false,
  },
  {
    name: "Switch",
    scope:
      "Native checked widget with controlled rejection rollback, real size/shape/semantic-color track and thumb, custom styles and icons, bilateral or segmented labels, loading/disabled/readOnly, labels and original native change event, Enter/Space interaction and a named native switch even in segmented mode.",
    limitations: [],
    tests: [
      "src/choice-parity.test.ts",
      "src/switch-native-state.test.ts",
      "src/base-contract-parity.test.ts",
      "spike/browser/advanced.spec.ts: real Chromium interaction and geometry",
    ],
    status: "implemented",
    deviceE2E: false,
  },
  {
    name: "Checkbox",
    scope:
      "Controlled/uncontrolled checked and indeterminate states, owner rejection, semantic colors, size, shape, label placement, custom icon, helper/error text and required state.",
    limitations: [
      "Browser form serialization is not provided by native view-based choices.",
    ],
    tests: [
      "src/parity.test.ts: native host mount",
      "src/checkbox-parity.test.ts: visual props and form state",
    ],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "Radio",
    scope:
      "Controlled/uncontrolled numeric/string/null selection, group-owned checked/name/size/color/error/required state, labels/helper/error slots, disabled/readOnly guards and first-enabled roving keyboard navigation.",
    limitations: [
      "Selected choices expose a native named input; browser radio constraint validation and form reset semantics are not emulated.",
    ],
    tests: [
      "src/choice-parity.test.ts",
      "spike/browser/advanced.spec.ts: real Chromium interaction and geometry",
    ],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "Textarea",
    scope:
      "Controlled/default multiline native value including rejected draft rollback, sizes/variants, maxLength/rows/autoHeight, form inheritance, id/name/ARIA and focus/blur/confirm.",
    limitations: [
      "Native row height is expressed with theme-derived minimum height; browser resize handles are not portable.",
    ],
    tests: [
      "src/primitives-parity.test.ts: behavior and styling contracts",
      "spike/browser/primitives.spec.ts: real Chromium geometry, theme and interaction",
    ],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "NumberInput",
    scope:
      "Shared core number parsing/formatting/clamping; intermediate drafts; blur/confirm-only commit; nullable empty value; precision from step; optional steppers; controlled rejection; disabled/readonly. Uni additionally H5 keyboard stepping.",
    limitations: [],
    tests: [
      "src/parity.test.ts: native host mount",
      "src/parity.test.ts: interaction/state assertions",
    ],
    status: "implemented",
    deviceE2E: false,
  },
  {
    name: "Rating",
    scope:
      "Controlled score mapped to five half/full stars, 12/16/20px sizes, optional value/count, display-only img or interactive slider, hover preview, half-star touch targets, core arrow/Page/Home/End stepping with RTL and cancelable keys.",
    limitations: [
      "Native Image renders the exact theme-resolved React SVG path and clipped half fill; real-device SVG data-URI support remains unverified.",
    ],
    tests: ["src/rating-parity.test.ts", "spike/browser/overlays.spec.ts"],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "Select",
    scope:
      "Controlled/uncontrolled single choice, registered item metadata/search, keyboard selection, field size/invalid/required/id/name/ARIA and styles on actual combobox trigger, measured collision-aware popup and focus restoration, listbox/option semantics and hidden native input value.",
    limitations: [
      "Browser hidden select validation/reset is not replicated by the native hidden input.",
    ],
    tests: ["src/base-contract-parity.test.ts", "src/compound-layout.test.ts"],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "AutoComplete",
    scope:
      "Controlled/model/default text and owner rejection; numeric option identities; selection returns the option and fills its label; fillOnSelect, filter/sort, first/adjacent groups, loading/empty/option slots, autoHighlight, native confirm, H5 keys, IME guards and dropdown visibility events. Reuses Input for field props.",
    limitations: [
      "Custom content uses native scoped slots instead of React renderOption/renderEmpty functions. Measured native fixed dropdown flips/shifts within the viewport and can animate; it does not use a DOM portal.",
    ],
    tests: [
      "src/parity.test.ts: native host mount",
      "src/advanced-fields.test.ts: actual advanced field interactions and owner rejection",
    ],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "Cascader",
    scope:
      "Shared core path resolution/search excluding disabled ancestors; controlled selection separate from intermediate expansion; defaults/model, custom filter/display, clear, lazy loadData, loading suppression, maxLevel, option slots, H5 column navigation and native confirm. Form state and numeric values are preserved.",
    limitations: [
      "Option rendering uses native scoped slots instead of ReactNode callbacks. H5 hover/keys are supported; touch hosts use activation and keep keyboard focus in the input. Inline popup is not a DOM portal.",
    ],
    tests: [
      "src/parity.test.ts: native host mount",
      "src/advanced-fields.test.ts: actual advanced field interactions and owner rejection",
    ],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "TagInput",
    scope:
      "Shared core separator parsing; typed remainder and H5 paste selection; deduplicated suggestions/create choice; blur opt-out, native confirm, H5 navigation/backspace/Escape, IME guards, clear/remove, owner rejection, defaults/model, maxTags, custom labels and inherited locking. Touch actions suppress accidental blur commit.",
    limitations: [
      "Browser hidden-input form serialization is unavailable in native hosts. Clipboard range handling applies to H5 paste events; native hosts provide their input/confirm events.",
    ],
    tests: [
      "src/parity.test.ts: native host mount",
      "src/advanced-fields.test.ts: actual advanced field interactions and owner rejection",
    ],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "JsonField",
    scope:
      "Raw string controlled/default models including invalid drafts; localized blur validation, toolbar and format action, jsonc lexeme-preserving indentation/compact formatting, inherited field props, rows and textarea appearance.",
    limitations: [],
    tests: [
      "src/json-field-parity.test.ts",
      "spike/browser/advanced.spec.ts: real Chromium interaction and geometry",
    ],
    status: "implemented",
    deviceE2E: false,
  },
  {
    name: "KeyValueEditor",
    scope:
      "entries/defaultEntries and stable id-based edits/removal/errors; duplicate keys allowed and validation remains consumer-owned; multiline whitespace-preserving textareas, labels, unique addition ids, controlled rejection including native field rollback, model updates and inherited locking. Legacy value arrays remain accepted.",
    limitations: [
      "Browser DOM refs and focus-to-remove-button behavior have no native equivalent; newly added rows focus their key textarea. Native textarea geometry and keyboard require device validation.",
    ],
    tests: [
      "src/parity.test.ts: native host mount",
      "src/advanced-fields.test.ts: actual advanced field interactions and owner rejection",
    ],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "TimePicker",
    scope:
      "Typed HH:mm or HH:mm:ss, hour/minute/second steps, normalized constraints, locale labels, clear, keyboard time columns, original string change and open-change notifications; measured collision-aware popup.",
    limitations: [],
    tests: [
      "src/time-picker-parity.test.ts",
      "src/anchored-fields-parity.test.ts",
      "spike/browser/styles.spec.ts",
    ],
    status: "implemented",
    deviceE2E: false,
  },
  {
    name: "MonthCalendar",
    scope:
      "Shared local-date core: Monday-first 42-day grid; controlled Date month and string selection/defaults; adjacent day navigation, today/year keys, localized headers and labels, event counts/clicks, display-only normalized ranges, size and day/event slots. Uni extensions: weekStartsOn, min/max and disabledDates.",
    limitations: [
      "Keyboard metadata and native touch actions are implemented; device focus/geometry still require validation.",
    ],
    tests: [
      "src/parity.test.ts: native host mount",
      "src/navigation-data.test.ts: behavioral regression",
    ],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "Pagination",
    scope:
      "Shared core page lists and visible ranges; controlled/default page and page size, quick jumper, native size picker, numbered/compact/simple/read-only layouts, labels, item/total slots, semantic variants/shapes/sizes and H5 navigation keys.",
    limitations: [
      "ReactNode rendering is expressed by item/total scoped slots. Native picker styling follows its host.",
    ],
    tests: [
      "src/parity.test.ts: native host mount",
      "src/navigation-data.test.ts: behavioral regression",
    ],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "Tabs",
    scope:
      "Registered compound tabs or array items, automatic/manual activation, orientation/direction, looping roving keyboard focus, stable tab/panel ARIA linkage, forceMount, variants and semantic color slots.",
    limitations: [],
    tests: [
      "src/tabs-parity.test.ts",
      "spike/browser/advanced.spec.ts: real Chromium interaction and geometry",
    ],
    status: "implemented",
    deviceE2E: false,
  },
  {
    name: "PageTabs",
    scope:
      "Controlled/uncontrolled selection, closable tabs, actions, dirty/icons/disabled, scrolling overflow arrows and active auto-scroll, onSelect callbacks and removal focus recovery.",
    limitations: [],
    tests: ["src/page-tabs-parity.test.ts", "spike/browser/styles.spec.ts"],
    status: "implemented",
    deviceE2E: false,
  },
  {
    name: "Menu",
    scope:
      "Nested/group/separator/checkbox/radio items and original callbacks, controlled open, measured collision-aware popup, scoped keyboard navigation/typeahead, RTL submenu open and return focus, trigger restoration.",
    limitations: [
      "Native hosts do not expose DOM modal inert or React element cloning. Hover opens submenus and preserves a pointer grace period before closing.",
    ],
    tests: [
      "src/navigation-data.test.ts",
      "src/anchored-fields-parity.test.ts",
      "spike/browser/overlays.spec.ts",
    ],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "NavTree",
    scope:
      "Section and item data, active ancestor expansion, controlled/default expandedIds, collapse intent, filtering, item/link scoped slots, disabled guards and native route navigation.",
    limitations: [
      "External navigation uses consumer link slots/platform routing configuration.",
    ],
    tests: [
      "src/parity.test.ts: native host mount",
      "src/navigation-data.test.ts: behavioral parity",
    ],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "Steps",
    scope:
      "React value/defaultValue identities, current/completed states, item disabled and readOnly defaults; label/icon slots. Uni also accepts legacy current/title plus direction, error status and string icons.",
    limitations: ["Native list/view semantics replace DOM ol/ref targets."],
    tests: [
      "src/parity.test.ts: native host mount",
      "src/navigation-data.test.ts: behavioral regression",
    ],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "Modal",
    scope:
      "Controlled/default dialog using the shared Drawer surface, title/description and authored heading linkage, all width sizes with responsive bottom sheet, forceMount, close label/hide action, role and modal/nonmodal semantics; cancelable outside/Escape/autofocus, busy guards, declarative/compound opener recovery.",
    limitations: [
      "Native hosts do not expose DOM inert, document-wide focus trapping or React asChild cloning.",
    ],
    tests: ["src/modal-parity.test.ts", "spike/browser/overlays.spec.ts"],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "Drawer",
    scope:
      "Controlled/uncontrolled open, trigger/content slots, all sides and sizes, forceMount, modal/nonmodal outside behavior, loading guards, cancelable outside/Escape/autofocus callbacks and opener focus restoration.",
    limitations: [
      "Native hosts do not expose DOM inert, document-wide focus trapping or React asChild cloning. Native nonmodal outside interactions can call the exposed dismissOutside handle.",
    ],
    tests: [
      "src/drawer-parity.test.ts",
      "spike/browser/advanced.spec.ts: real Chromium interaction and geometry",
    ],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "Confirm",
    scope:
      "Native confirm/cancel overlay and busy guards. The corresponding ConfirmProvider/ToastProvider/SkeletonText extension is now implemented.",
    limitations: [],
    tests: [
      "src/parity.test.ts: native host mount",
      "src/workflow.test.ts: cross-component native-host flow",
    ],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "Popover",
    scope:
      "Controlled/default compound state; separate trigger/anchor native measurement; side/align/offset, viewport flip/shift/size, matchAnchorWidth, arrow, forceMount; cancelable dismiss/focus callbacks; resize/native polling cleanup.",
    limitations: [
      "H5 supports body Teleport, composed asChild triggers/anchors/close actions, modal focus trap, inert background and scroll locking. Native panels use fixed host geometry; native views cannot reproduce browser child cloning or document focus semantics.",
    ],
    tests: [
      "src/parity.test.ts: native host mount",
      "src/popover-parity.test.ts: behavioral parity",
    ],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "Tooltip",
    scope:
      "Controlled/default/imperative visibility, hover/focus/native tap, shared delay and skip context, interactive content, measured collision-aware positioning, cursor following, colors/variants/shapes/arrows/animations and labels.",
    limitations: [
      "Native trigger is a wrapper rather than React child cloning. Pointer hover and keyboard behavior depend on host input capabilities.",
    ],
    tests: [
      "src/tooltip-icon-parity.test.ts",
      "spike/browser/advanced.spec.ts: real Chromium interaction and geometry",
    ],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "Toast",
    scope:
      "Dismissible timed toast with status and timer cleanup. The corresponding ConfirmProvider/ToastProvider/SkeletonText extension is now implemented.",
    limitations: [],
    tests: ["src/parity.test.ts: native host mount"],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "CommandDialog",
    scope:
      "Controlled/default open, normalized/custom filtering, disabled exclusion, grouping and result caps, original-item selection, keyboard navigation and platform shortcut normalization, query reset and opener focus return.",
    limitations: [
      "Global browser keyboard shortcuts use document listeners; native hardware callers can use exposed handleShortcut. Native hosts do not expose DOM inert/focus-trap semantics.",
    ],
    tests: [
      "src/command-parity.test.ts",
      "spike/browser/advanced.spec.ts: real Chromium interaction and geometry",
    ],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "Table",
    scope:
      "Column/row table; numeric/localized sorting; filters; page controls; select-all skipping disabled rows; controlled selection rejection; loading/empty; uni sticky columns and scoped cell/header slots.",
    limitations: [],
    tests: [
      "src/parity.test.ts: native host mount",
      "src/parity.test.ts: interaction/state assertions",
      "src/workflow.test.ts: cross-component native-host flow",
      "src/parity.test.ts: filter/page/select-all disabled row behavior",
    ],
    status: "implemented",
    deviceE2E: false,
  },
  {
    name: "DataTable",
    scope:
      "Full shared TableProps forwarding and every table scoped slot; complete sort/selection/row/filter/page event payloads; loading overrides error, retry only when handled, parent pagination and pagination slots.",
    limitations: [
      "DOM table render functions map to Table native scoped slots.",
    ],
    tests: [
      "src/parity.test.ts: native host mount",
      "src/navigation-data.test.ts: behavioral regression",
    ],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "VirtualList",
    scope:
      "Real scroll viewport, maxHeight, itemHeight or first-row measurement with itemPadding, overscan, focused-row retention, loading, near-end async loadMore locking and raf/idle/immediate scheduling with cleanup.",
    limitations: [
      "DOM scroll/focus observation uses H5 APIs; native hosts use scoped selector queries and window resize hooks. Device behavior remains unverified.",
    ],
    tests: [
      "src/virtual-list-parity.test.ts",
      "spike/browser/advanced.spec.ts: real Chromium interaction and geometry",
    ],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "Upload",
    scope:
      "Controlled file statuses, MIME/extension and max-size/count validation, original native selected-file callbacks, media/document picker capabilities, progress, retry/remove callbacks, replacement/multiple, labels and disabled/loading guards.",
    limitations: [
      "Native selected files carry platform paths and metadata, not browser File objects. Network upload/cancellation is consumer-owned as in React; document picking requires chooseFile or chooseMessageFile host capability.",
    ],
    tests: ["src/upload-parity.test.ts"],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "Avatar",
    scope:
      "All six named sizes and numeric dimensions; image failure fallback, CJK/word initials, shape, stacked and descriptive/decorative labels.",
    limitations: [],
    tests: [
      "src/parity.test.ts: native host mount",
      "src/display-theme.test.ts: behavioral parity",
    ],
    status: "implemented",
    deviceE2E: false,
  },
  {
    name: "AvatarGroup",
    scope:
      "Native Avatar slots or item data with shared size, stacking and max/count overflow.",
    limitations: [],
    tests: [
      "src/parity.test.ts: native host mount",
      "src/display-theme.test.ts: behavioral parity",
    ],
    status: "implemented",
    deviceE2E: false,
  },
  {
    name: "Badge",
    scope:
      "Inline text or attached badge; content/icon slots; size, semantic color, variant, position, radius/border and decorative dot/count extensions.",
    limitations: [],
    tests: [
      "src/parity.test.ts: native host mount",
      "src/display-theme.test.ts: behavioral parity",
    ],
    status: "implemented",
    deviceE2E: false,
  },
  {
    name: "Card",
    scope:
      "Five surface variants, four padding axes, section padding overrides, compound header/content/footer slots, guarded button/keyboard interaction and internal native routing.",
    limitations: [
      "External href and browser polymorphic element refs require platform-specific navigation/semantics.",
    ],
    tests: [
      "src/parity.test.ts: native host mount",
      "src/display-theme.test.ts: behavioral parity",
    ],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "ProgressIndicator",
    scope:
      "Spinner/bar/wave/circle/dottedBar native visuals, five sizes, semantic/current color, decorative labels, width/full, reduced-motion CSS; determinate numeric extension.",
    limitations: [
      "CSS conic-gradient and animation support on individual native renderer versions still requires device validation.",
    ],
    tests: [
      "src/parity.test.ts: native host mount",
      "src/display-theme.test.ts: behavioral parity",
    ],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "Empty",
    scope:
      "Localized title/description, primary/secondary action slots, size and explicit geometry, shadow, custom icon, exact theme-resolved SVG illustration and Inbox paths rendered through native Image.",
    limitations: [
      "Real-device SVG data-URI support has not been verified on every native host.",
    ],
    tests: [
      "src/primitives-parity.test.ts: behavior and styling contracts",
      "spike/browser/primitives.spec.ts: real Chromium geometry, theme and interaction",
    ],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "Skeleton",
    scope:
      "Variants, geometry, radius/circle, loading content replacement, decorative/status semantics, pulse/wave/no-animation; text line count, height, gap and shortened final line.",
    limitations: [],
    tests: [
      "src/primitives-parity.test.ts: behavior and styling contracts",
      "spike/browser/primitives.spec.ts: real Chromium geometry, theme and interaction",
    ],
    status: "implemented",
    deviceE2E: false,
  },
  {
    name: "Alert",
    scope:
      "Colors/variants/sizes, semantic status, icon/title/action/close slots, banner/elevation/radius, animations, controlled/uncontrolled collapse with labels and return focus.",
    limitations: [],
    tests: [
      "src/alert-parity.test.ts",
      "spike/browser/advanced.spec.ts: real Chromium interaction and geometry",
    ],
    status: "implemented",
    deviceE2E: false,
  },
  {
    name: "Divider",
    scope:
      "Horizontal/vertical, solid/dashed/dotted, thickness/length/spacing, label slot and text alignment, elevation and flex-item geometry.",
    limitations: [],
    tests: [
      "src/primitives-parity.test.ts: behavior and styling contracts",
      "spike/browser/primitives.spec.ts: real Chromium geometry, theme and interaction",
    ],
    status: "implemented",
    deviceE2E: false,
  },
  {
    name: "Tag",
    scope:
      "Color, variant, size, shape and elevation; pressed/clickable actions, loading state, independent close action, custom icon/avatar/close-icon slots and labels.",
    limitations: [],
    tests: [
      "src/parity.test.ts: native host mount",
      "src/display-theme.test.ts: behavioral parity",
    ],
    status: "implemented",
    deviceE2E: false,
  },
  {
    name: "ThemeToggle",
    scope:
      "Light/dark/system selection, showSystem, labels, controlled/default value and real ThemeProvider/storage/system-mode integration.",
    limitations: [
      "ThemeProvider uses native storage and host theme subscription; arbitrary browser persistence adapters are not exposed.",
    ],
    tests: [
      "src/parity.test.ts: native host mount",
      "src/workflow.test.ts: cross-component native-host flow",
      "src/display-theme.test.ts: behavioral parity",
    ],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "Box",
    scope:
      "Full React Box spacing, axis/side precedence, size, surface alias, border, radius and shadow props with core token resolution.",
    limitations: ["Native view replaces arbitrary DOM as-element/ref targets."],
    tests: [
      "src/parity.test.ts: native host mount",
      "src/layout-parity.test.ts: behavioral parity",
    ],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "Stack",
    scope:
      "Horizontal/vertical flex, gap, alignment, justification and wrap; uni HStack/VStack.",
    limitations: [],
    tests: ["src/parity.test.ts: native host mount"],
    status: "implemented",
    deviceE2E: false,
  },
  {
    name: "ResponsiveGrid",
    scope:
      "Validated one-to-twelve column count or inherited base/sm/md/lg map, actual container measurement, core gap/rowGap/columnGap props.",
    limitations: [
      "Native measurement requires the renderer selector-query API; arbitrary DOM as-element/ref targets map to a native view.",
    ],
    tests: [
      "src/parity.test.ts: native host mount",
      "src/layout-parity.test.ts: behavioral parity",
    ],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "SplitLayout",
    scope:
      "Main/aside slots, validated asideWidth, md/lg actual-container collapse breakpoint, core gap and no empty aside column.",
    limitations: [
      "Native views replace DOM refs; React SplitLayout has no drag-resize/persistence API.",
    ],
    tests: [
      "src/parity.test.ts: native host mount",
      "src/layout-parity.test.ts: behavioral parity",
    ],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "Page",
    scope:
      "Page title, description, actions and constrained content; uni PageHeader/PageSection/StatCard/Toolbar.",
    limitations: [],
    tests: ["src/parity.test.ts: native host mount"],
    status: "implemented",
    deviceE2E: false,
  },
  {
    name: "AppShell",
    scope:
      "Controlled/default expanded/compact/floating sidebar modes; floating overlay rail; responsive mobile drawer; one navigation slot instance; committed-route close; labels and skip action.",
    limitations: [
      "Native navigation uses scoped slots. H5 mobile drawers trap focus, mark outside content inert, lock scrolling and return focus; native devices require host validation.",
    ],
    tests: [
      "src/parity.test.ts: native host mount",
      "src/layout-parity.test.ts: behavioral parity",
    ],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "FormControl",
    scope:
      "Native field state wrapper; uni reactive inherited flags and authored label/helper/error sections. Editing controls inherit disabled/readonly with explicit false override.",
    limitations: [],
    tests: [
      "src/parity.test.ts: native host mount",
      "src/workflow.test.ts: eleven native editing controls inherit disabled",
    ],
    status: "implemented",
    deviceE2E: false,
  },
  {
    name: "FormField",
    scope:
      "Label/required/help/error layout and uni field context. Editing controls inherit disabled/readonly with explicit false override.",
    limitations: [],
    tests: [
      "src/parity.test.ts: native host mount",
      "src/workflow.test.ts: eleven native editing controls inherit disabled",
    ],
    status: "implemented",
    deviceE2E: false,
  },
  {
    name: "FormLayout",
    scope:
      "Native form submit/reset detail and all ResponsiveGrid responsive column/gap props.",
    limitations: [
      "Native form serialization/event detail replaces browser FormData and HTMLFormElement refs.",
    ],
    tests: [
      "src/parity.test.ts: native host mount",
      "src/layout-parity.test.ts: behavioral parity",
    ],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "LoadingState",
    scope: "Loading label/spinner, error/retry, loaded slot.",
    limitations: [],
    tests: ["src/parity.test.ts: native host mount"],
    status: "implemented",
    deviceE2E: false,
  },
  {
    name: "TextLink",
    scope: "Native navigator with disabled fallback and click.",
    limitations: [
      "Internal native routes only; browser external anchors require platform navigation configuration.",
    ],
    tests: ["src/parity.test.ts: native host mount"],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "DescriptionList",
    scope: "Item labels/values or slots, columns, borders and striping.",
    limitations: [],
    tests: [
      "src/primitives-parity.test.ts: behavior and styling contracts",
      "spike/browser/primitives.spec.ts: real Chromium geometry, theme and interaction",
    ],
    status: "implemented",
    deviceE2E: false,
  },
  {
    name: "List",
    scope:
      "Dividers/border/density and role; slot or array items, primary/secondary/icon/action slots, disabled activation and original item/index callbacks.",
    limitations: [],
    tests: [
      "src/primitives-parity.test.ts: behavior and styling contracts",
      "spike/browser/primitives.spec.ts: real Chromium geometry, theme and interaction",
    ],
    status: "implemented",
    deviceE2E: false,
  },
  {
    name: "CodeBlock",
    scope:
      "Language label, wrapped/unwrapped text, bounded scrolling maxHeight, native clipboard copy callbacks and localized feedback with cleanup.",
    limitations: [],
    tests: [
      "src/primitives-parity.test.ts: behavior and styling contracts",
      "spike/browser/primitives.spec.ts: real Chromium geometry, theme and interaction",
    ],
    status: "implemented",
    deviceE2E: false,
  },
  {
    name: "Prose",
    scope: "Typography container and selectable text/native child slots.",
    limitations: [
      "DOM descendant tag typography does not apply to native rich-text subtrees.",
    ],
    tests: ["src/parity.test.ts: native host mount"],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "HtmlPreview",
    scope:
      "H5 sanitized CSP-protected opaque iframe with viewport sizing; native rich-text node/HTML rendering.",
    limitations: [
      "Native rich-text has no iframe sandbox or arbitrary browser HTML/CSS engine. H5 previews intentionally prohibit scripts, network access, forms and embedded application execution.",
    ],
    tests: ["src/parity.test.ts: native host mount"],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "IconButton",
    scope:
      "Native labeled icon button with four sizes, semantic colors/variants/shapes, controlled/uncontrolled pressed, loading focusability and guards, icon slot and automatic/custom tooltip.",
    limitations: [],
    tests: [
      "src/tooltip-icon-parity.test.ts",
      "spike/browser/advanced.spec.ts: real Chromium interaction and geometry",
    ],
    status: "implemented",
    deviceE2E: false,
  },
  {
    name: "ConfigProvider",
    scope:
      "Reactive nested locale/dir, inherited mode/palette/design, shared core catalog across editable/navigation/overlay/display controls, system appearance, isolated CSS tokens.",
    limitations: [
      "Native view scoping replaces browser root attributes. Consumer slot content remains consumer-localized.",
    ],
    tests: [
      "src/parity.test.ts: native host mount",
      "src/parity.test.ts: interaction/state assertions",
      "src/workflow.test.ts: cross-component native-host flow",
      "src/display-theme.test.ts: behavioral parity",
    ],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "ThemeProvider",
    scope:
      "Controlled/default theme/palette, native storage, system appearance, inherited locale and ConfigProvider token scope.",
    limitations: ["Native storage replaces browser cookies."],
    tests: [
      "src/parity.test.ts: native host mount",
      "src/parity.test.ts: interaction/state assertions",
      "src/display-theme.test.ts: behavioral parity",
    ],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "CardContent",
    parent: "Card",
    scope:
      "Native compound section with inherited root padding and explicit section padding override.",
    limitations: [],
    tests: [
      "src/compound-layout.test.ts: native slot/section composition",
      "src/display-theme.test.ts: explicit section padding",
    ],
    status: "implemented",
    deviceE2E: false,
  },
  {
    name: "CardDescription",
    parent: "Card",
    scope:
      "Native Card heading/description slot with dedicated semantic styling.",
    limitations: [],
    tests: ["src/compound-layout.test.ts: native slot/section composition"],
    status: "implemented",
    deviceE2E: false,
  },
  {
    name: "CardFooter",
    parent: "Card",
    scope:
      "Native compound section with inherited root padding and explicit section padding override.",
    limitations: [],
    tests: [
      "src/compound-layout.test.ts: native slot/section composition",
      "src/display-theme.test.ts: explicit section padding",
    ],
    status: "implemented",
    deviceE2E: false,
  },
  {
    name: "CardHeader",
    parent: "Card",
    scope:
      "Native compound section with inherited root padding and explicit section padding override.",
    limitations: [],
    tests: [
      "src/compound-layout.test.ts: native slot/section composition",
      "src/display-theme.test.ts: explicit section padding",
    ],
    status: "implemented",
    deviceE2E: false,
  },
  {
    name: "CardTitle",
    parent: "Card",
    scope:
      "Native Card heading/description slot with dedicated semantic styling.",
    limitations: [],
    tests: ["src/compound-layout.test.ts: native slot/section composition"],
    status: "implemented",
    deviceE2E: false,
  },
  {
    name: "DrawerBody",
    parent: "Drawer",
    scope:
      "Drawer compound body with injected reactive root state and native slot content.",
    limitations: [
      "React side/size/hideCloseButton/forceMount, cancelable dismissal/focus callbacks and nonmodal behavior are not fully mapped yet; browser portals and document focus trapping need platform-specific handling. React Drawer has no drag-resize API.",
    ],
    tests: ["src/compound-layout.test.ts: native slot/section composition"],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "DrawerClose",
    scope:
      "Disabled-aware native close button; consumer click runs before close and can preventDefault.",
    limitations: [
      "React asChild element cloning maps to native button content slots.",
    ],
    tests: ["src/base-contract-parity.test.ts"],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "DrawerContent",
    scope:
      "Controlled/uncontrolled open, trigger/content slots, all sides and sizes, forceMount, modal/nonmodal outside behavior, loading guards, cancelable outside/Escape/autofocus callbacks and opener focus restoration.",
    limitations: [
      "Native hosts do not expose DOM inert, document-wide focus trapping or React asChild cloning. Native nonmodal outside interactions can call the exposed dismissOutside handle.",
    ],
    tests: [
      "src/drawer-parity.test.ts",
      "spike/browser/advanced.spec.ts: real Chromium interaction and geometry",
    ],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "DrawerFooter",
    parent: "Drawer",
    scope:
      "Drawer compound footer with injected reactive root state and native slot content.",
    limitations: [
      "React side/size/hideCloseButton/forceMount, cancelable dismissal/focus callbacks and nonmodal behavior are not fully mapped yet; browser portals and document focus trapping need platform-specific handling. React Drawer has no drag-resize API.",
    ],
    tests: ["src/compound-layout.test.ts: native slot/section composition"],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "DrawerHeader",
    scope:
      "Authored accessible heading registered as the enclosing shared surface dialog name.",
    limitations: [],
    tests: ["src/modal-parity.test.ts"],
    status: "implemented",
    deviceE2E: false,
  },
  {
    name: "DrawerRoot",
    scope:
      "Shared controlled/uncontrolled open and modal context; native trigger registration for focus recovery.",
    limitations: [],
    tests: ["src/drawer-parity.test.ts"],
    status: "implemented",
    deviceE2E: false,
  },
  {
    name: "DrawerTrigger",
    scope:
      "Shared controlled/uncontrolled open and modal context; native trigger registration for focus recovery.",
    limitations: [],
    tests: ["src/drawer-parity.test.ts"],
    status: "implemented",
    deviceE2E: false,
  },
  {
    name: "FormErrorMessage",
    parent: "FormControl",
    scope:
      "Native FormControl semantic section with dedicated class, props and slots.",
    limitations: [],
    tests: ["src/compound-layout.test.ts: native slot/section composition"],
    status: "implemented",
    deviceE2E: false,
  },
  {
    name: "FormHelperText",
    parent: "FormControl",
    scope:
      "Native FormControl semantic section with dedicated class, props and slots.",
    limitations: [],
    tests: ["src/compound-layout.test.ts: native slot/section composition"],
    status: "implemented",
    deviceE2E: false,
  },
  {
    name: "FormLabel",
    parent: "FormControl",
    scope:
      "Native FormControl semantic section with dedicated class, props and slots.",
    limitations: [],
    tests: ["src/compound-layout.test.ts: native slot/section composition"],
    status: "implemented",
    deviceE2E: false,
  },
  {
    name: "HStack",
    parent: "Stack",
    scope:
      "Native Stack semantic section with dedicated class, props and slots.",
    limitations: [],
    tests: ["src/compound-layout.test.ts: native slot/section composition"],
    status: "implemented",
    deviceE2E: false,
  },
  {
    name: "ListItem",
    scope:
      "Dividers/border/density and role; slot or array items, primary/secondary/icon/action slots, disabled activation and original item/index callbacks.",
    limitations: [],
    tests: [
      "src/primitives-parity.test.ts: behavior and styling contracts",
      "spike/browser/primitives.spec.ts: real Chromium geometry, theme and interaction",
    ],
    status: "implemented",
    deviceE2E: false,
  },
  {
    name: "ModalBody",
    parent: "Modal",
    scope:
      "Modal compound body with injected reactive root state and native slot content.",
    limitations: [
      "DOM portals and document focus trapping do not apply to native views.",
    ],
    tests: ["src/workflow.test.ts: compound context workflows"],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "ModalClose",
    scope:
      "Disabled-aware native close button; consumer click runs before close and can preventDefault.",
    limitations: [
      "React asChild element cloning maps to native button content slots.",
    ],
    tests: ["src/base-contract-parity.test.ts"],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "ModalContent",
    scope:
      "Complete Modal content props and slots forwarded into shared surface; compound root owns open/modal state and registered trigger recovery.",
    limitations: [
      "Native fixed surface replaces React DOM portal and asChild behavior.",
    ],
    tests: ["src/modal-parity.test.ts"],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "ModalFooter",
    parent: "Modal",
    scope:
      "Modal compound footer with injected reactive root state and native slot content.",
    limitations: [
      "DOM portals and document focus trapping do not apply to native views.",
    ],
    tests: ["src/workflow.test.ts: compound context workflows"],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "ModalHeader",
    scope:
      "Authored accessible heading registered as the enclosing surface dialog name.",
    limitations: [],
    tests: ["src/modal-parity.test.ts"],
    status: "implemented",
    deviceE2E: false,
  },
  {
    name: "ModalRoot",
    scope: "Controlled/default open and modal context with registered opener.",
    limitations: [],
    tests: ["src/modal-parity.test.ts"],
    status: "implemented",
    deviceE2E: false,
  },
  {
    name: "ModalTrigger",
    scope:
      "Disabled-aware native trigger that registers the focus return target.",
    limitations: ["React asChild maps to native button content slots."],
    tests: ["src/modal-parity.test.ts"],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "PageHeader",
    parent: "Page",
    scope:
      "Native Page semantic section with dedicated class, props and slots.",
    limitations: [],
    tests: ["src/compound-layout.test.ts: native slot/section composition"],
    status: "implemented",
    deviceE2E: false,
  },
  {
    name: "PageSection",
    parent: "Page",
    scope:
      "Native Page semantic section with dedicated class, props and slots.",
    limitations: [],
    tests: ["src/compound-layout.test.ts: native slot/section composition"],
    status: "implemented",
    deviceE2E: false,
  },
  {
    name: "PageTab",
    parent: "PageTabs",
    scope:
      "Route label/icon/action slots, onSelect, active current-page state; disabled label leaves independent action enabled.",
    limitations: [
      "Truncated labels use a native title attribute; hover tooltip availability depends on host.",
    ],
    tests: [
      "src/compound-layout.test.ts: native slot/section composition",
      "src/page-tabs-parity.test.ts: behavioral parity",
    ],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "RadioGroup",
    scope:
      "Controlled/uncontrolled numeric/string/null selection, group-owned checked/name/size/color/error/required state, labels/helper/error slots, disabled/readOnly guards and first-enabled roving keyboard navigation.",
    limitations: [
      "Selected choices expose a native named input; browser radio constraint validation and form reset semantics are not emulated.",
    ],
    tests: [
      "src/choice-parity.test.ts",
      "spike/browser/advanced.spec.ts: real Chromium interaction and geometry",
    ],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "RatingScale",
    scope:
      "Named dimensions, score scale/size/readOnly/showValue and original dimension-key callbacks; without a change consumer renders display-only ratings.",
    limitations: [],
    tests: ["src/rating-parity.test.ts", "src/compound-layout.test.ts"],
    status: "implemented",
    deviceE2E: false,
  },
  {
    name: "SelectGroup",
    parent: "Select",
    scope:
      "Native Select semantic section with dedicated class, props and slots.",
    limitations: [],
    tests: ["src/workflow.test.ts: compound context workflows"],
    status: "implemented",
    deviceE2E: false,
  },
  {
    name: "SelectItem",
    parent: "Select",
    scope:
      "Registers value/label/disabled option in Select context, supports native tap and H5 keyboard selection.",
    limitations: [],
    tests: ["src/workflow.test.ts: compound context workflows"],
    status: "implemented",
    deviceE2E: false,
  },
  {
    name: "SelectLabel",
    parent: "Select",
    scope:
      "Native Select semantic section with dedicated class, props and slots.",
    limitations: [],
    tests: ["src/workflow.test.ts: compound context workflows"],
    status: "implemented",
    deviceE2E: false,
  },
  {
    name: "SelectSeparator",
    parent: "Select",
    scope:
      "Native Select semantic section with dedicated class, props and slots.",
    limitations: [],
    tests: ["src/compound-layout.test.ts: native slot/section composition"],
    status: "implemented",
    deviceE2E: false,
  },
  {
    name: "StatCard",
    scope: "Labeled metric with value, trend, description and content slot.",
    limitations: [],
    tests: [
      "src/extended.test.ts: composed controls and real provider workflows",
    ],
    status: "implemented",
    deviceE2E: false,
  },
  {
    name: "Tab",
    scope:
      "Registered compound tabs or array items, automatic/manual activation, orientation/direction, looping roving keyboard focus, stable tab/panel ARIA linkage, forceMount, variants and semantic color slots.",
    limitations: [],
    tests: [
      "src/tabs-parity.test.ts",
      "spike/browser/advanced.spec.ts: real Chromium interaction and geometry",
    ],
    status: "implemented",
    deviceE2E: false,
  },
  {
    name: "TabList",
    scope:
      "Registered compound tabs or array items, automatic/manual activation, orientation/direction, looping roving keyboard focus, stable tab/panel ARIA linkage, forceMount, variants and semantic color slots.",
    limitations: [],
    tests: [
      "src/tabs-parity.test.ts",
      "spike/browser/advanced.spec.ts: real Chromium interaction and geometry",
    ],
    status: "implemented",
    deviceE2E: false,
  },
  {
    name: "TabPanel",
    scope:
      "Registered compound tabs or array items, automatic/manual activation, orientation/direction, looping roving keyboard focus, stable tab/panel ARIA linkage, forceMount, variants and semantic color slots.",
    limitations: [],
    tests: [
      "src/tabs-parity.test.ts",
      "spike/browser/advanced.spec.ts: real Chromium interaction and geometry",
    ],
    status: "implemented",
    deviceE2E: false,
  },
  {
    name: "TableBody",
    parent: "Table",
    scope:
      "Native Table semantic section with dedicated class, props and slots.",
    limitations: [],
    tests: ["src/compound-layout.test.ts: native slot/section composition"],
    status: "implemented",
    deviceE2E: false,
  },
  {
    name: "TableCell",
    parent: "Table",
    scope:
      "Native Table semantic section with dedicated class, props and slots.",
    limitations: [],
    tests: ["src/compound-layout.test.ts: native slot/section composition"],
    status: "implemented",
    deviceE2E: false,
  },
  {
    name: "TableCellContent",
    parent: "Table",
    scope:
      "Native Table semantic section with dedicated class, props and slots.",
    limitations: [],
    tests: ["src/compound-layout.test.ts: native slot/section composition"],
    status: "implemented",
    deviceE2E: false,
  },
  {
    name: "TableHead",
    parent: "Table",
    scope:
      "Native Table semantic section with dedicated class, props and slots.",
    limitations: [],
    tests: ["src/compound-layout.test.ts: native slot/section composition"],
    status: "implemented",
    deviceE2E: false,
  },
  {
    name: "TableHeader",
    parent: "Table",
    scope:
      "Native Table semantic section with dedicated class, props and slots.",
    limitations: [],
    tests: ["src/compound-layout.test.ts: native slot/section composition"],
    status: "implemented",
    deviceE2E: false,
  },
  {
    name: "TableRoot",
    parent: "Table",
    scope:
      "Native Table semantic section with dedicated class, props and slots.",
    limitations: [],
    tests: ["src/compound-layout.test.ts: native slot/section composition"],
    status: "implemented",
    deviceE2E: false,
  },
  {
    name: "TableRow",
    parent: "Table",
    scope:
      "Native Table semantic section with dedicated class, props and slots.",
    limitations: [],
    tests: ["src/compound-layout.test.ts: native slot/section composition"],
    status: "implemented",
    deviceE2E: false,
  },
  {
    name: "Toolbar",
    parent: "Page",
    scope:
      "Native Page semantic section with dedicated class, props and slots.",
    limitations: [],
    tests: ["src/compound-layout.test.ts: native slot/section composition"],
    status: "implemented",
    deviceE2E: false,
  },
  {
    name: "VStack",
    parent: "Stack",
    scope:
      "Native Stack semantic section with dedicated class, props and slots.",
    limitations: [],
    tests: ["src/compound-layout.test.ts: native slot/section composition"],
    status: "implemented",
    deviceE2E: false,
  },
  {
    name: "ConfirmDialog",
    scope:
      "Shared Modal alertdialog with small geometry/title/description/closeLabel, real Button actions, async pending repeat lock/error, controlled cancel requests and focus recovery.",
    limitations: [],
    tests: [
      "src/context-confirm-parity.test.ts",
      "spike/browser/dialogs.spec.ts",
    ],
    status: "implemented",
    deviceE2E: false,
  },
  {
    name: "ConfirmProvider",
    scope:
      "Real FIFO confirmation host: Promise<boolean> requests, confirm/cancel settlement, pending-request cancellation on unmount.",
    limitations: [],
    tests: [
      "src/extended.test.ts: composed controls and real provider workflows",
      "src/feedback-store.test.ts: queue/timer/action/promise lifecycle",
    ],
    status: "implemented",
    deviceE2E: false,
  },
  {
    name: "ToastProvider",
    scope:
      "Real toast host/store: upsert by id, update/dismiss, callbacks/actions, max overflow, timers, loading and promise transitions. Uni supports hover/focus pause.",
    limitations: [],
    tests: [
      "src/extended.test.ts: composed controls and real provider workflows",
      "src/feedback-store.test.ts: queue/timer/action/promise lifecycle",
    ],
    status: "implemented",
    deviceE2E: false,
  },
  {
    name: "ContextMenu",
    scope:
      "Pointer, Shift+F10/Menu-key and cancelable 700ms touch opening; size/loop/dir/labels, disabled preserves native menu, measured flip/shift, original menu items, focus return and keyboard Tab containment.",
    limitations: ["Native fixed positioning replaces DOM portals."],
    tests: [
      "src/context-confirm-parity.test.ts",
      "spike/browser/dialogs.spec.ts",
    ],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "PaletteToggle",
    scope:
      "Palette buttons with active state/default choice/labels/disabled; connects to ThemeProvider via context or native event.",
    limitations: [],
    tests: [
      "src/extended.test.ts: composed controls and real provider workflows",
    ],
    status: "implemented",
    deviceE2E: false,
  },
  {
    name: "GridItem",
    scope: "Native grid child with full row and optional column/row spans.",
    limitations: ["Native wrapper replaces DOM asChild cloning."],
    tests: [
      "src/extended.test.ts: composed controls and real provider workflows",
    ],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "SkeletonText",
    scope:
      "Variants, geometry, radius/circle, loading content replacement, decorative/status semantics, pulse/wave/no-animation; text line count, height, gap and shortened final line.",
    limitations: [],
    tests: [
      "src/primitives-parity.test.ts: behavior and styling contracts",
      "spike/browser/primitives.spec.ts: real Chromium geometry, theme and interaction",
    ],
    status: "implemented",
    deviceE2E: false,
  },
  {
    name: "PopoverAnchor",
    scope:
      "Separate measurement anchor used by PopoverContent, registered and cleared with the compound lifecycle.",
    limitations: ["Native wrapper replaces React asChild cloning."],
    tests: [
      "src/extended.test.ts: composed controls and real provider workflows",
      "src/popover-parity.test.ts: behavioral parity",
    ],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "PopoverTrigger",
    scope:
      "Native button toggles root state, registers its measurement/focus target and respects disabled.",
    limitations: ["Native wrapper replaces React asChild cloning."],
    tests: [
      "src/extended.test.ts: composed controls and real provider workflows",
      "src/popover-parity.test.ts: behavioral parity",
    ],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "PopoverContent",
    scope:
      "Native measured collision-aware panel with side/align/offset/padding/width/arrow/forceMount and cancelable interaction callbacks.",
    limitations: [
      "H5 supports body Teleport and modal focus trap/inert/scroll lock; native fixed coordinates require device validation.",
    ],
    tests: [
      "src/extended.test.ts: composed controls and real provider workflows",
      "src/popover-parity.test.ts: behavioral parity",
    ],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "PopoverClose",
    scope: "Close button updates shared Popover root state.",
    limitations: [],
    tests: [
      "src/extended.test.ts: composed controls and real provider workflows",
    ],
    status: "implemented",
    deviceE2E: false,
  },
  {
    name: "TooltipProvider",
    scope:
      "Real shared enter/leave/skip-delay context consumed by Tooltip on H5; native taps open immediately.",
    limitations: [],
    tests: [
      "src/extended.test.ts: composed controls and real provider workflows",
    ],
    status: "implemented",
    deviceE2E: false,
  },
  {
    name: "MonacoCodeEditor",
    scope:
      "Optional uni/monaco H5 entry creates an injected local Monaco editor with controlled v-model, language/theme/readOnly updates, timeout/error fallback/retry and model/editor disposal. No native substitute is exported as equivalent.",
    limitations: [
      "Monaco requires browser DOM/editor workers unavailable in native mini views. JsonField and CodeBlock are separate narrower components.",
    ],
    tests: [
      "src/monaco.test.ts",
      "spike/browser/h5.spec.ts",
      "src/extended.test.ts: Monaco remains absent from native entry",
    ],
    status: "n/a",
    deviceE2E: false,
  },
] as const;
