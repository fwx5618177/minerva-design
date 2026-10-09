/** Auditable native scope; host tests do not certify real-device E2E. */
export const weappComponentManifest = [
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
      "Controlled/default text with rejected native input rollback; password visibility; clear/focus; character count; prefix/suffix slots; invalid/required/size/variant and native events.",
    limitations: [
      "Native readonly prevents keyboard editing using disabled; FormControl/FormField flags now inherit through native relations.",
    ],
    tests: ["src/basic-parity.test.ts", "src/provider-parity.test.ts"],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "Switch",
    scope:
      "Controlled/default checked state with real native widget rollback, slider/segmented variants, sizes/colors/shapes, dual labels/placement, loading, icon slots and custom track/thumb styles.",
    limitations: [
      "Native switch supplies form/touch behavior beneath token-styled track/thumb; browser focus/ripple event geometry differs.",
    ],
    tests: ["src/basic-parity.test.ts"],
    status: "partial",
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
      "Controlled/default selection, semantic size/color, name, label, required/error/helper/error-icon state and readonly guards.",
    limitations: [
      "Standalone native view choices do not reproduce browser same-name radio grouping; use RadioGroup options for native exclusive selection.",
    ],
    tests: ["src/basic-parity.test.ts"],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "Textarea",
    scope:
      "Controlled/default text with rejected input rollback, size/variant/invalid, native maxlength/autoHeight/rows/name and focus/blur events.",
    limitations: [
      "Native readonly uses disabled to prevent keyboard editing; browser textarea resize is unavailable.",
    ],
    tests: ["src/basic-parity.test.ts"],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "NumberInput",
    scope:
      "Shared core number parsing/formatting/clamping; intermediate drafts; blur/confirm-only commit; nullable empty value; precision from step; optional steppers; controlled rejection; disabled/readonly.",
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
      "Five-star rendering on configurable score scale, half-star touch targets, readonly and score/count display.",
    limitations: [
      "Pointer hover previews and DOM keyboard slider contract are unavailable in native mini hosts.",
    ],
    tests: [
      "src/parity.test.ts: native host mount",
      "src/parity.test.ts: interaction/state assertions",
    ],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "Select",
    scope:
      "Controlled/default value and open state, disabled/readonly options, grouped labels/separators, search/textValue, size/invalid/required, native content slots and change/openchange.",
    limitations: [
      "Serializable nested options represent React SelectItem/Group/Label/Separator; browser keyboard/focus and hidden-select form behavior differ.",
    ],
    tests: ["src/basic-parity.test.ts"],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "AutoComplete",
    scope:
      "Controlled editable text, numeric/string option identity, label fill, disabled/loading guards, custom filtering/sorting/grouping via native instance configure(), native confirm selection, original option events.",
    limitations: [
      "Function callbacks use selectComponent(...).configure({filterOption,groupBy,sortOption}) because WXML properties are serialized; option content supports label/description and empty slot instead of React render functions.",
    ],
    tests: [
      "src/parity.test.ts: native host mount",
      "src/advanced-fields.test.ts: native host interaction regressions",
    ],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "Cascader",
    scope:
      "Controlled/default nested paths, separate browsing, configure({filter,optionRender,loadData}), lazy-load coalescing/loading/errors/retry, maxLevel, disabled branches, search and clear.",
    limitations: [
      "Function callbacks use the native instance configure() API. optionRender returns native text; ReactNode renderers and pointer-hover expansion have no native equivalent.",
    ],
    tests: [
      "src/navigation-parity.test.ts: real native host state and callback workflows",
      "src/parity.test.ts: native host mount",
      "src/advanced-fields.test.ts: native host interaction regressions",
    ],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "TagInput",
    scope:
      "Unique controlled/default tags, shared literal separator and newline parsing, native confirm/blur, filtered deduplicated suggestions, touch/blur selection arbitration, clear, max count and native instance paste(text,start,end).",
    limitations: [
      "WeChat input does not expose a DOM clipboard event/selection API. Delimited incoming input is parsed; exact clipboard insertion ranges can be supplied to the instance paste() method. Arrow-key suggestion navigation and React render callbacks are not reproduced.",
    ],
    tests: [
      "src/parity.test.ts: native host mount",
      "src/advanced-fields.test.ts: native host interaction regressions",
    ],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "JsonField",
    scope:
      "Controlled/default JSON text with every-edit change, syntax status/parser error, clamped indent formatting, toolbar/labels and Textarea visual props; legacy object mode retained.",
    limitations: [
      "Native textarea keyboard and readonly differ from DOM textarea.",
    ],
    tests: ["src/basic-parity.test.ts"],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "KeyValueEditor",
    scope:
      "Controlled entries arrays/defaultEntries, legacy value object normalization, stable ids across edits, id-keyed key/value errors, add/edit/remove, readonly and rejected owner updates.",
    limitations: [
      "Validation including duplicate keys belongs to the consumer, matching React; provide errors keyed by row id. Native events expose both detail.entries and the legacy detail.value rows.",
    ],
    tests: [
      "src/parity.test.ts: native host mount",
      "src/advanced-fields.test.ts: native host interaction regressions",
    ],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "TimePicker",
    scope:
      "Core strict/lenient typed parsing, controlled/default serialized time and null clear, seconds/format/12-hour mode, stepped hour/minute/second columns, bounds, labels/field flags, guarded opening and openchange.",
    limitations: [
      "Native values use HH:mm[:ss] strings and null instead of Date/undefined; browser focus and keyboard panel navigation have native input equivalents.",
    ],
    tests: ["src/interaction-parity.test.ts"],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "MonthCalendar",
    scope:
      "Shared core local-date arithmetic; six-week Monday-first grid with configurable week start, controlled/default month and day, disabled dates/bounds, display-only range highlight, event counts/list/actions, today navigation and configured date labels.",
    limitations: [
      "Month props are serialized YYYY-MM strings. DOM roving keyboard focus is not a native mini-program interaction.",
    ],
    tests: [
      "src/navigation-parity.test.ts: real native host state and callback workflows",
      "src/parity.test.ts: native host mount",
      "src/parity.test.ts: interaction/state assertions",
    ],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "Pagination",
    scope:
      "Shared core page windows, jump items/compact ellipses, controlled/default current and pageSize, quick jump, size changer/reset, visible range, simple/hidden-number layouts, sizes/shapes/variants, labels and total/range slots.",
    limitations: [
      "Native configure({itemRender,totalRender}) returns text; ReactNode render callbacks are represented by text and named slots.",
    ],
    tests: [
      "src/navigation-parity.test.ts: real native host state and callback workflows",
      "src/parity.test.ts: native host mount",
    ],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "Tabs",
    scope:
      "Controlled/default active value, four variants, semantic group/per-tab color, vertical/horizontal direction, disabled items, content/forceMount panels and named panel slots.",
    limitations: [
      "Native tap replaces browser roving tab index and automatic/manual focus activation.",
    ],
    tests: ["src/basic-parity.test.ts"],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "PageTabs",
    scope:
      "Selected native page items, select/change and independent action events, disabled labels/actionDisabled, icons, measured overflow controls, active scroll-into-view and global actions slot.",
    limitations: [
      "Native scroll-view replaces DOM scrolling and hover tooltips; serializable item content replaces ReactNode children.",
    ],
    tests: ["src/interaction-parity.test.ts"],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "Menu",
    scope:
      "Nested action expansion; groups/separators; controlled/default checkbox and radio-group ownership; original item select payload; disabled/danger/icon/shortcut rows; optional trigger slot and controlled/default open; configure callbacks.",
    limitations: [
      "Use triggered=true with the trigger slot for a popup, or the default inline native menu panel. Pointer-hover submenus, DOM portals and focus traps are not native mini interactions.",
    ],
    tests: [
      "src/navigation-parity.test.ts: real native host state and callback workflows",
      "src/parity.test.ts: native host mount",
    ],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "NavTree",
    scope:
      "React sections/id and legacy items/value schemas, active ancestor expansion, controlled/default expanded ids, collapsed/wrapped labels, descriptions/icons, query and configured filtering, guarded item selection and native page navigation.",
    limitations: [
      "Use native page URLs for href. React router renderLink is represented by native selection events and slots; DOM link rendering is not supported.",
    ],
    tests: [
      "src/navigation-parity.test.ts: real native host state and callback workflows",
      "src/parity.test.ts: native host mount",
    ],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "Steps",
    scope:
      "React value/defaultValue and legacy current, readOnly/default display, guarded item selection, icon/error/completion states, native string labels and descriptions.",
    limitations: [
      "ReactNode labels/icons use native strings or the shared content slot.",
    ],
    tests: [
      "src/navigation-parity.test.ts: real native host state and callback workflows",
      "src/parity.test.ts: native host mount",
    ],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "Modal",
    scope:
      "Controlled/default native modal with trigger, header/body/footer slots, five sizes, forceMount, modal/nonmodal backdrop, close labels and configured outside dismissal veto.",
    limitations: [
      "DOM portals and document focus trapping do not apply to native views.",
    ],
    tests: ["src/basic-parity.test.ts", "src/provider-parity.test.ts"],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "Drawer",
    scope:
      "Controlled/default native drawer with trigger, close, header/body/footer slots, four sides and sizes, forceMount, modal/nonmodal backdrop, configured outside-dismissal veto and localized close/description.",
    limitations: [
      "Native view layering replaces document portals, DOM focus trapping and outside focus/keyboard events.",
    ],
    tests: ["src/remaining-parity.test.ts"],
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
      "Controlled/default tap popup; trigger/anchor/content slots, native selectorQuery placement, four sides/alignment/offsets, collision flip/shift, width matching, arrows, forceMount, modal backdrop, configured outside veto and reposition().",
    limitations: [
      "Native view/backdrop replaces DOM portal, focus trap and browser focus/pointer event objects; owner-triggered content/scroll changes can call reposition().",
    ],
    tests: ["src/interaction-parity.test.ts"],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "Tooltip",
    scope:
      "Controlled/default native touch tooltip with open/close/toggle instance methods, enter/leave timers, 12 placements, offset, color/variant/shape/animation/arrow/disable and content slot.",
    limitations: [
      "Native touch replaces hover/focus; followCursor/asChild/DOM content refs are not available.",
    ],
    tests: ["src/basic-parity.test.ts"],
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
      "Controlled/default native dialog, trigger, trimmed command search, disabled exclusion, configured custom filter/ranking before cap, selection/close and localized labels.",
    limitations: [
      "Global desktop shortcut/focus trap uses application-owned native navigation; native devices have no document keyboard listener.",
    ],
    tests: ["src/remaining-parity.test.ts"],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "Table",
    scope:
      "Core sorting and fixed-column offsets, scroll extents, row selection defaults/controlled rejection/disabled callbacks, filtering and local paging, skeleton rows, variants/density; configure custom row keys/comparators/native rich cells and cell-renderer generic.",
    limitations: [
      "Native generic Component receives row/value/column/index instead of a ReactNode render function; sticky scrolling requires device verification.",
    ],
    tests: ["src/table-parity.test.ts"],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "DataTable",
    scope:
      "All Table contracts and configure callbacks, error/retry slots and label, declarative pagination options for total/range/quick jump/size/labels/visual axes; owner-paginated rows.",
    limitations: [
      "Native generic Component replaces ReactNode cells; browser focus and scrolling differ.",
    ],
    tests: ["src/table-parity.test.ts"],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "VirtualList",
    scope:
      "Core fixed-row virtualization with native first-row measurement, explicit item height/padding, overscan, maxHeight, async loadMore lock/threshold/loading, scrollToIndex, itemclick, configured text renderer and native row-renderer generic.",
    limitations: [
      "Rows have one shared measured or explicit height, matching the React fixed-row contract; DOM renderer/focus targets use native generic Components.",
    ],
    tests: ["src/remaining-parity.test.ts"],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "Upload",
    scope:
      "Native document/media picker, core accept/maxSize/count validation, controlled status list, replace/multiple, loading/disabled guards, preview, retry/removal, localized callback labels and filesselected.",
    limitations: [
      "Native paths replace browser File objects and document/media picker selection replaces drag/drop; upload transport remains consumer-owned.",
    ],
    tests: ["src/remaining-parity.test.ts"],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "Avatar",
    scope:
      "Image, named/numeric sizes, CJK/Latin initials, explicit fallback, source-change retry, shape and stacked styling.",
    limitations: ["ReactNode fallback uses named/default native slots."],
    tests: ["src/display-parity.test.ts"],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "AvatarGroup",
    scope:
      "Per-image native error fallback, named/numeric sizing, cap/extra count, item shapes and overlap.",
    limitations: ["Native items and slots replace React child introspection."],
    tests: ["src/display-parity.test.ts"],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "Badge",
    scope:
      "Content, count/dot, cap/zero visibility, semantic colors, solid/subtle/outline, sizes, corner position, border and icon slot.",
    limitations: [
      "Attached content is the default slot; ReactNode content uses native text/icon slots.",
    ],
    tests: ["src/display-parity.test.ts"],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "Card",
    scope:
      "Header/content/footer slots, five variants, root and section padding, guarded interactive navigation and content animations.",
    limitations: [
      "Native view/navigator behavior replaces polymorphic HTML tags.",
    ],
    tests: ["src/display-parity.test.ts"],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "ProgressIndicator",
    scope:
      "Spinner, circle, wave, bar and dottedBar native animations; size/color/icon/label/decorative/width/full; optional bounded determinate progress.",
    limitations: [
      "Native CSS geometry replaces DOM/SVG icons; device animation verification pending.",
    ],
    tests: ["src/display-parity.test.ts"],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "Empty",
    scope:
      "Native empty state with title/description, icon/action/secondaryAction/default slots, classic and three sized layouts, explicit geometry and shadow.",
    limitations: [
      "useSvg renders a token-styled native geometric illustration; custom SVG/ReactNode content uses the icon slot.",
    ],
    tests: ["src/basic-parity.test.ts"],
    status: "implemented",
    deviceE2E: false,
  },
  {
    name: "Skeleton",
    scope:
      "Seven placeholder variants, pulse/wave/off animation, decorative circle sizing, width/height/radius, loading replacement slot, lines/avatar/card/title/paragraph states.",
    limitations: [
      "Native view equivalents replace decorative span and DOM loading regions.",
    ],
    tests: ["src/basic-parity.test.ts"],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "Alert",
    scope:
      "Semantic colors/variants/sizes, status icons and custom icon/action/close slots, dismiss, controlled/default expansion, banner/elevation/radius and animation.",
    limitations: [
      "ReactNode icon/action values use native slots; no DOM transition event objects.",
    ],
    tests: ["src/remaining-parity.test.ts"],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "Divider",
    scope:
      "Horizontal/vertical solid/dashed/dotted separators with thickness/length/spacing/text alignment/elevation/flexItem and optional label.",
    limitations: [],
    tests: ["src/basic-parity.test.ts"],
    status: "implemented",
    deviceE2E: false,
  },
  {
    name: "Tag",
    scope:
      "All semantic colors, sizes, variants and shapes; icon/avatar/close slots; pressed/elevation; click/close loading and disabled guards.",
    limitations: ["Native tap replaces browser focus/hover ripple."],
    tests: ["src/display-parity.test.ts"],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "ThemeToggle",
    scope:
      "Localized light/dark/system buttons, custom named theme choices, explicit controlled value or nearest native provider relation, disabled guarding and owner refusal.",
    limitations: [
      "Custom token objects are supplied as customThemes[].theme; native controls replace DOM toggle buttons.",
    ],
    tests: ["src/theme-parity.test.ts"],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "Box",
    scope:
      "All React Box spacing axes with core token resolution, dimensions/min/max, semantic backgrounds, rounded/shadow/border and last-wins customStyle.",
    limitations: [
      "Native view and WXSS replace polymorphic DOM element and CSSProperties.",
    ],
    tests: ["src/remaining-parity.test.ts"],
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
      "Container-measured 1\u201312 columns with base/sm/md/lg inheritance, token/CSS gaps and row/column overrides; measure(width) for host layout updates.",
    limitations: [
      "Automatic measurement runs on ready/window resize; non-window host size changes call measure(width).",
    ],
    tests: ["src/layout-parity.test.ts"],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "SplitLayout",
    scope:
      "Main/aside slots, finite positive asideWidth capped to half container, md/lg container stacking, token/CSS gap and optional aside.",
    limitations: [
      "Native slot presence is declared with hasAside; non-window host size changes call measure(width).",
    ],
    tests: ["src/layout-parity.test.ts"],
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
      "Controlled/default expanded/compact/floating modes, mobile drawer/backdrop, navigationKey close, explicit pin/expand controls, brand/header/page navigation/footer slots and navigationstate events.",
    limitations: [
      "Floating rail expands by explicit tap instead of mouse hover; native accessibility replaces DOM skip-link focus.",
    ],
    tests: ["src/layout-parity.test.ts"],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "FormControl",
    scope:
      "Native ancestor/descendant relations propagate disabled/readOnly/required/invalid to all applicable fields, including nested providers and explicit false overrides; getFormState exposes effective flags.",
    limitations: ["WeChat explicit child flag wiring is required."],
    tests: ["src/provider-parity.test.ts"],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "FormField",
    scope:
      "Label/required/helper/error layout and nearest native field context, reactive flags, nested overrides and error-message invalid state.",
    limitations: ["WeChat explicit child flag wiring is required."],
    tests: ["src/provider-parity.test.ts"],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "FormLayout",
    scope:
      "Native submit/reset once, responsive measured column maps, spacing token/CSS gap and row/column overrides.",
    limitations: [
      "No browser form element ref; non-window host size changes call measure(width).",
    ],
    tests: ["src/layout-parity.test.ts"],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "LoadingState",
    scope:
      "Localized loading status with small/medium/large minimum heights, spinner and native error/retry extension.",
    limitations: [],
    tests: ["src/basic-parity.test.ts"],
    status: "implemented",
    deviceE2E: false,
  },
  {
    name: "TextLink",
    scope:
      "Native route navigator with default/subtle/action variants, chevron, disabled guard and native tap event.",
    limitations: [
      "External browser anchors and asChild router refs require native platform routing.",
    ],
    tests: ["src/basic-parity.test.ts"],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "DescriptionList",
    scope:
      "Ordered term/value rows with zero values, bordered/striped variants and native keyed content slots.",
    limitations: ["Native view rows replace DOM dl/dt/dd elements."],
    tests: ["src/basic-parity.test.ts"],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "List",
    scope:
      "Density, border/dividers, semantic list rows with primary/secondary/icon/actions including zero values, native per-row action slots and guarded itemclick.",
    limitations: [
      "Serializable row values and slots replace arbitrary React children.",
    ],
    tests: ["src/basic-parity.test.ts"],
    status: "implemented",
    deviceE2E: false,
  },
  {
    name: "CodeBlock",
    scope:
      "Verbatim selectable source, wrap/horizontal scrolling, maxHeight, opt-in native clipboard copy with status/copied/error events.",
    limitations: [
      "Native clipboard replaces document clipboard permissions; no DOM pre/ref/keyboard-scroll event objects.",
    ],
    tests: ["src/basic-parity.test.ts"],
    status: "partial",
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
    scope: "Native rich-text node/HTML rendering.",
    limitations: [
      "No iframe sandbox, scripts, embedded application execution or arbitrary browser HTML/CSS engine.",
    ],
    tests: ["src/parity.test.ts: native host mount"],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "IconButton",
    scope:
      "Semantic color/variant/size/shape, icon slot/loading guards, controlled/default pressed toggle, accessible label and configured long-press tooltip.",
    limitations: [
      "Native long press replaces hover/focus tooltip and browser focusable loading semantics.",
    ],
    tests: ["src/basic-parity.test.ts"],
    status: "implemented",
    deviceE2E: false,
  },
  {
    name: "ConfigProvider",
    scope:
      "Native ancestor relations inherit mode/theme/palette/design/locale/dir and react to parent updates; explicit null palette clears inheritance. Core translator/custom messages, localized Table/calendar/pagination/time/theme/sidebar texts, subscription/getConfig/translate APIs, system theme and GitHub/custom/bilingual token resolution.",
    limitations: [
      "Native scoped views replace DOM root attributes. Other component label props can be supplied with provider.translate; their remaining hard-coded convenience defaults are not all localized.",
    ],
    tests: ["src/theme-parity.test.ts"],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "ThemeProvider",
    scope:
      "Native inherited configuration, system subscriptions with cleanup, controlled/default themes and palettes, custom/bilingual/GitHub token objects, local storage persistence, theme/palette actions and descendant notifications.",
    limitations: [
      "Native storage replaces browser cookies; device OS-theme/storage validation remains pending.",
    ],
    tests: ["src/theme-parity.test.ts"],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "ConfirmDialog",
    scope:
      "Controlled native confirmation with danger labels, busy/disabled guarding, cancel/open-change; uni awaits async confirmation.",
    limitations: [],
    tests: ["src/parity.test.ts: native extension definitions and interaction"],
    status: "implemented",
    deviceE2E: false,
  },
  {
    name: "ConfirmProvider",
    scope:
      "Global or scope=local isolated FIFO confirmation host: Promise<boolean> requests, confirm/cancel settlement, localized buttons and pending-request cancellation on unmount.",
    limitations: [
      "scope=local creates an isolated instance store; the global convenience API requires one scope=global host. Scope is selected at mount.",
    ],
    tests: ["src/provider-parity.test.ts"],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "ToastProvider",
    scope:
      "Global or isolated native toast host/store: upsert by id, update/dismiss, callbacks/actions, max overflow, timers, loading and instance promise transitions; native touch and pause/resume preserve remaining duration.",
    limitations: [
      "scope=local creates an isolated instance store; the global convenience API requires one scope=global host. Scope is selected at mount.",
    ],
    tests: ["src/provider-parity.test.ts"],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "ContextMenu",
    scope:
      "Long-press native context anchor with measured viewport clamping; full Menu nested/action/checkbox/radio-group/group/separator schema and configure callbacks.",
    limitations: [
      "Native long press replaces browser right-click and keyboard context-menu event; no DOM focus trap.",
    ],
    tests: ["src/remaining-parity.test.ts"],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "PaletteToggle",
    scope:
      "Localized palette buttons with optional base palette, explicit value or native ancestor provider, controlled owner refusal and palette requests.",
    limitations: ["Native ancestor Component relations replace React context."],
    tests: ["src/theme-parity.test.ts"],
    status: "implemented",
    deviceE2E: false,
  },
  {
    name: "GridItem",
    scope: "Native grid child with full row and optional column/row spans.",
    limitations: ["Native wrapper replaces DOM asChild cloning."],
    tests: ["src/parity.test.ts: native extension definitions and interaction"],
    status: "partial",
    deviceE2E: false,
  },
  {
    name: "SkeletonText",
    scope:
      "Configurable text lines/height/token gap/last-line shrink and pulse/wave/off animation.",
    limitations: [],
    tests: ["src/basic-parity.test.ts"],
    status: "implemented",
    deviceE2E: false,
  },
  {
    name: "StatCard",
    scope:
      "Metric label/value including zero, description, icon prop/native icon slot and decorative icon semantics.",
    limitations: [],
    tests: ["src/basic-parity.test.ts"],
    status: "implemented",
    deviceE2E: false,
  },
  {
    name: "RadioGroup",
    scope:
      "Exclusive options with controlled value including null/no-selection, defaultValue, direction, group size/color override, name/label/required/error/helper and disabled/readonly guards.",
    limitations: [
      "Native options represent React Radio children; browser keyboard grouping/serialization differs.",
    ],
    tests: ["src/basic-parity.test.ts"],
    status: "implemented",
    deviceE2E: false,
  },
  {
    name: "RatingScale",
    scope:
      "Labeled dimensions with five-star/half-star score rendering and dimension-key native change.",
    limitations: [],
    tests: ["src/parity.test.ts: native extension definitions and interaction"],
    status: "implemented",
    deviceE2E: false,
  },
  {
    name: "MonacoCodeEditor",
    scope:
      "Browser-only Monaco editor; no native substitute is exported as equivalent.",
    limitations: [
      "Monaco requires browser DOM/editor workers unavailable in native mini views. JsonField and CodeBlock are separate narrower components.",
    ],
    tests: ["src/parity.test.ts: Monaco remains unsupported"],
    status: "n/a",
    deviceE2E: false,
  },
  {
    name: "HStack",
    scope:
      "Native composition uses Stack: direction=horizontal. No standalone placeholder component is exported.",
    limitations: [
      "Native serialized props, slots and parent-owned events replace DOM compound child context.",
    ],
    equivalent: "Stack",
    status: "n/a",
    tests: ["src/workflow.test.ts: native parent composition"],
    deviceE2E: false,
  },
  {
    name: "VStack",
    scope:
      "Native composition uses Stack: direction=vertical. No standalone placeholder component is exported.",
    limitations: [
      "Native serialized props, slots and parent-owned events replace DOM compound child context.",
    ],
    equivalent: "Stack",
    status: "n/a",
    tests: ["src/workflow.test.ts: native parent composition"],
    deviceE2E: false,
  },
  {
    name: "TabList",
    scope:
      "Native composition uses Tabs: items list. No standalone placeholder component is exported.",
    limitations: [
      "Native serialized props, slots and parent-owned events replace DOM compound child context.",
    ],
    equivalent: "Tabs",
    status: "n/a",
    tests: ["src/workflow.test.ts: native parent composition"],
    deviceE2E: false,
  },
  {
    name: "Tab",
    scope:
      "Native composition uses Tabs: items[].value/label/disabled. No standalone placeholder component is exported.",
    limitations: [
      "Native serialized props, slots and parent-owned events replace DOM compound child context.",
    ],
    equivalent: "Tabs",
    status: "n/a",
    tests: ["src/workflow.test.ts: native parent composition"],
    deviceE2E: false,
  },
  {
    name: "TabPanel",
    scope:
      "Native composition uses Tabs: items[].content and parent-controlled default content slot. No standalone placeholder component is exported.",
    limitations: [
      "Native serialized props, slots and parent-owned events replace DOM compound child context.",
    ],
    equivalent: "Tabs",
    status: "n/a",
    tests: ["src/workflow.test.ts: native parent composition"],
    deviceE2E: false,
  },
  {
    name: "PageTab",
    scope:
      "Native composition uses PageTabs items[].value/label/disabled/icon/closable/action/actionDisabled and select/close events.",
    limitations: [
      "Native serialized data replaces authored React compound children.",
    ],
    equivalent: "PageTabs",
    status: "n/a",
    tests: ["src/interaction-parity.test.ts"],
    deviceE2E: false,
  },
  {
    name: "FormLabel",
    scope:
      "Native composition uses FormField: label/required props. No standalone placeholder component is exported.",
    limitations: [
      "Native serialized props, slots and parent-owned events replace DOM compound child context.",
    ],
    equivalent: "FormField",
    status: "n/a",
    tests: ["src/workflow.test.ts: native parent composition"],
    deviceE2E: false,
  },
  {
    name: "FormHelperText",
    scope:
      "Native composition uses FormField: helperText prop. No standalone placeholder component is exported.",
    limitations: [
      "Native serialized props, slots and parent-owned events replace DOM compound child context.",
    ],
    equivalent: "FormField",
    status: "n/a",
    tests: ["src/workflow.test.ts: native parent composition"],
    deviceE2E: false,
  },
  {
    name: "FormErrorMessage",
    scope:
      "Native composition uses FormField: errorMessage/invalid props. No standalone placeholder component is exported.",
    limitations: [
      "Native serialized props, slots and parent-owned events replace DOM compound child context.",
    ],
    equivalent: "FormField",
    status: "n/a",
    tests: ["src/workflow.test.ts: native parent composition"],
    deviceE2E: false,
  },
  {
    name: "PageHeader",
    scope:
      "Native composition uses Page: title/description/actions slot. No standalone placeholder component is exported.",
    limitations: [
      "Native serialized props, slots and parent-owned events replace DOM compound child context.",
    ],
    equivalent: "Page",
    status: "n/a",
    tests: ["src/workflow.test.ts: native parent composition"],
    deviceE2E: false,
  },
  {
    name: "PageSection",
    scope:
      "Native composition uses Page: default slot containing native view sections. No standalone placeholder component is exported.",
    limitations: [
      "Native serialized props, slots and parent-owned events replace DOM compound child context.",
    ],
    equivalent: "Page",
    status: "n/a",
    tests: ["src/workflow.test.ts: native parent composition"],
    deviceE2E: false,
  },
  {
    name: "Toolbar",
    scope:
      "Native composition uses Stack: horizontal actions slot. No standalone placeholder component is exported.",
    limitations: [
      "Native serialized props, slots and parent-owned events replace DOM compound child context.",
    ],
    equivalent: "Stack",
    status: "n/a",
    tests: ["src/workflow.test.ts: native parent composition"],
    deviceE2E: false,
  },
  {
    name: "ListItem",
    scope:
      "Native composition uses List: items[].primary/secondary/icon/actions/disabled; title/description aliases and per-row action slots. No standalone placeholder component is exported.",
    limitations: [
      "Native serialized props, slots and parent-owned events replace DOM compound child context.",
    ],
    equivalent: "List",
    status: "n/a",
    tests: ["src/workflow.test.ts: native parent composition"],
    deviceE2E: false,
  },
  {
    name: "SelectItem",
    scope:
      "Native composition uses Select: options[].value/label/disabled. No standalone placeholder component is exported.",
    limitations: [
      "Native serialized props, slots and parent-owned events replace DOM compound child context.",
    ],
    equivalent: "Select",
    status: "n/a",
    tests: ["src/workflow.test.ts: native parent composition"],
    deviceE2E: false,
  },
  {
    name: "SelectGroup",
    scope:
      "Native composition uses Select: options type=group with label and nested items. No standalone placeholder component is exported.",
    limitations: [
      "Native serialized props, slots and parent-owned events replace DOM compound child context.",
    ],
    equivalent: "Select",
    status: "n/a",
    tests: ["src/workflow.test.ts: native parent composition"],
    deviceE2E: false,
  },
  {
    name: "SelectLabel",
    scope:
      "Native composition uses Select: options type=label with label. No standalone placeholder component is exported.",
    limitations: [
      "Native serialized props, slots and parent-owned events replace DOM compound child context.",
    ],
    equivalent: "Select",
    status: "n/a",
    tests: ["src/workflow.test.ts: native parent composition"],
    deviceE2E: false,
  },
  {
    name: "SelectSeparator",
    scope:
      "Native composition uses Select: options type=separator. No standalone placeholder component is exported.",
    limitations: [
      "Native serialized props, slots and parent-owned events replace DOM compound child context.",
    ],
    equivalent: "Select",
    status: "n/a",
    tests: ["src/workflow.test.ts: native parent composition"],
    deviceE2E: false,
  },
  {
    name: "TooltipProvider",
    scope:
      "Native composition uses Tooltip: explicit enterDelay/leaveDelay and controlled/default open; native tap and long-press timers. No standalone placeholder component is exported.",
    limitations: [
      "Native serialized props, slots and parent-owned events replace DOM compound child context.",
    ],
    equivalent: "Tooltip",
    status: "n/a",
    tests: ["src/workflow.test.ts: native parent composition"],
    deviceE2E: false,
  },
  {
    name: "CardHeader",
    scope:
      "Native composition uses Card: title/description and header slot. No standalone placeholder component is exported.",
    limitations: [
      "Native serialized props, slots and parent-owned events replace DOM compound child context.",
    ],
    equivalent: "Card",
    status: "n/a",
    tests: ["src/workflow.test.ts: native parent composition"],
    deviceE2E: false,
  },
  {
    name: "CardContent",
    scope:
      "Native composition uses Card: default content slot. No standalone placeholder component is exported.",
    limitations: [
      "Native serialized props, slots and parent-owned events replace DOM compound child context.",
    ],
    equivalent: "Card",
    status: "n/a",
    tests: ["src/workflow.test.ts: native parent composition"],
    deviceE2E: false,
  },
  {
    name: "CardFooter",
    scope:
      "Native composition uses Card: footer slot. No standalone placeholder component is exported.",
    limitations: [
      "Native serialized props, slots and parent-owned events replace DOM compound child context.",
    ],
    equivalent: "Card",
    status: "n/a",
    tests: ["src/workflow.test.ts: native parent composition"],
    deviceE2E: false,
  },
  {
    name: "CardTitle",
    scope:
      "Native composition uses Card: title prop. No standalone placeholder component is exported.",
    limitations: [
      "Native serialized props, slots and parent-owned events replace DOM compound child context.",
    ],
    equivalent: "Card",
    status: "n/a",
    tests: ["src/workflow.test.ts: native parent composition"],
    deviceE2E: false,
  },
  {
    name: "CardDescription",
    scope:
      "Native composition uses Card: description prop. No standalone placeholder component is exported.",
    limitations: [
      "Native serialized props, slots and parent-owned events replace DOM compound child context.",
    ],
    equivalent: "Card",
    status: "n/a",
    tests: ["src/workflow.test.ts: native parent composition"],
    deviceE2E: false,
  },
  {
    name: "ModalRoot",
    scope:
      "Native composition uses Modal: controlled open and openchange. No standalone placeholder component is exported.",
    limitations: [
      "Native serialized props, slots and parent-owned events replace DOM compound child context.",
    ],
    equivalent: "Modal",
    status: "n/a",
    tests: ["src/workflow.test.ts: native parent composition"],
    deviceE2E: false,
  },
  {
    name: "ModalTrigger",
    scope:
      "Native composition uses Modal: parent button updates open. No standalone placeholder component is exported.",
    limitations: [
      "Native serialized props, slots and parent-owned events replace DOM compound child context.",
    ],
    equivalent: "Modal",
    status: "n/a",
    tests: ["src/workflow.test.ts: native parent composition"],
    deviceE2E: false,
  },
  {
    name: "ModalClose",
    scope:
      "Native composition uses Modal: built-in close action emits openchange=false. No standalone placeholder component is exported.",
    limitations: [
      "Native serialized props, slots and parent-owned events replace DOM compound child context.",
    ],
    equivalent: "Modal",
    status: "n/a",
    tests: ["src/workflow.test.ts: native parent composition"],
    deviceE2E: false,
  },
  {
    name: "ModalContent",
    scope:
      "Native composition uses Modal: default slot. No standalone placeholder component is exported.",
    limitations: [
      "Native serialized props, slots and parent-owned events replace DOM compound child context.",
    ],
    equivalent: "Modal",
    status: "n/a",
    tests: ["src/workflow.test.ts: native parent composition"],
    deviceE2E: false,
  },
  {
    name: "ModalHeader",
    scope:
      "Native composition uses Modal: title/description. No standalone placeholder component is exported.",
    limitations: [
      "Native serialized props, slots and parent-owned events replace DOM compound child context.",
    ],
    equivalent: "Modal",
    status: "n/a",
    tests: ["src/workflow.test.ts: native parent composition"],
    deviceE2E: false,
  },
  {
    name: "ModalBody",
    scope:
      "Native composition uses Modal: default content slot. No standalone placeholder component is exported.",
    limitations: [
      "Native serialized props, slots and parent-owned events replace DOM compound child context.",
    ],
    equivalent: "Modal",
    status: "n/a",
    tests: ["src/workflow.test.ts: native parent composition"],
    deviceE2E: false,
  },
  {
    name: "ModalFooter",
    scope:
      "Native composition uses Modal: footer slot. No standalone placeholder component is exported.",
    limitations: [
      "Native serialized props, slots and parent-owned events replace DOM compound child context.",
    ],
    equivalent: "Modal",
    status: "n/a",
    tests: ["src/workflow.test.ts: native parent composition"],
    deviceE2E: false,
  },
  {
    name: "DrawerRoot",
    scope:
      "Native composition uses Drawer: controlled open and openchange. No standalone placeholder component is exported.",
    limitations: [
      "Native serialized props, slots and parent-owned events replace DOM compound child context.",
    ],
    equivalent: "Drawer",
    status: "n/a",
    tests: ["src/workflow.test.ts: native parent composition"],
    deviceE2E: false,
  },
  {
    name: "DrawerTrigger",
    scope:
      "Native composition uses Drawer: trigger slot requests controlled or default open. No standalone placeholder component is exported.",
    limitations: [
      "Native serialized props, slots and parent-owned events replace DOM compound child context.",
    ],
    equivalent: "Drawer",
    status: "n/a",
    tests: ["src/workflow.test.ts: native parent composition"],
    deviceE2E: false,
  },
  {
    name: "DrawerClose",
    scope:
      "Native composition uses Drawer: built-in close action emits openchange=false. No standalone placeholder component is exported.",
    limitations: [
      "Native serialized props, slots and parent-owned events replace DOM compound child context.",
    ],
    equivalent: "Drawer",
    status: "n/a",
    tests: ["src/workflow.test.ts: native parent composition"],
    deviceE2E: false,
  },
  {
    name: "DrawerContent",
    scope:
      "Native composition uses Drawer: default slot. No standalone placeholder component is exported.",
    limitations: [
      "Native serialized props, slots and parent-owned events replace DOM compound child context.",
    ],
    equivalent: "Drawer",
    status: "n/a",
    tests: ["src/workflow.test.ts: native parent composition"],
    deviceE2E: false,
  },
  {
    name: "DrawerHeader",
    scope:
      "Native composition uses Drawer: header slot and title/description. No standalone placeholder component is exported.",
    limitations: [
      "Native serialized props, slots and parent-owned events replace DOM compound child context.",
    ],
    equivalent: "Drawer",
    status: "n/a",
    tests: ["src/workflow.test.ts: native parent composition"],
    deviceE2E: false,
  },
  {
    name: "DrawerBody",
    scope:
      "Native composition uses Drawer: default content slot. No standalone placeholder component is exported.",
    limitations: [
      "Native serialized props, slots and parent-owned events replace DOM compound child context.",
    ],
    equivalent: "Drawer",
    status: "n/a",
    tests: ["src/workflow.test.ts: native parent composition"],
    deviceE2E: false,
  },
  {
    name: "DrawerFooter",
    scope:
      "Native composition uses Drawer: footer slot. No standalone placeholder component is exported.",
    limitations: [
      "Native serialized props, slots and parent-owned events replace DOM compound child context.",
    ],
    equivalent: "Drawer",
    status: "n/a",
    tests: ["src/workflow.test.ts: native parent composition"],
    deviceE2E: false,
  },
  {
    name: "PopoverAnchor",
    scope:
      "Native composition uses Popover anchor slot as a measured wrapper alongside the trigger slot.",
    limitations: ["Native wrapper rectangles replace DOM refs/asChild."],
    equivalent: "Popover",
    status: "n/a",
    tests: ["src/interaction-parity.test.ts"],
    deviceE2E: false,
  },
  {
    name: "PopoverTrigger",
    scope:
      "Native composition uses Popover trigger slot wired to controlled/default open state.",
    limitations: ["No DOM asChild/ref merging."],
    equivalent: "Popover",
    status: "n/a",
    tests: ["src/interaction-parity.test.ts"],
    deviceE2E: false,
  },
  {
    name: "PopoverContent",
    scope:
      "Native composition uses Popover default slot and side/align/collisionPadding/matchAnchorWidth/arrow/forceMount props.",
    limitations: [
      "Native overlay replaces DOM portal and browser focus hooks.",
    ],
    equivalent: "Popover",
    status: "n/a",
    tests: ["src/interaction-parity.test.ts"],
    deviceE2E: false,
  },
  {
    name: "PopoverClose",
    scope:
      "Native composition uses Popover: built-in close and openchange=false. No standalone placeholder component is exported.",
    limitations: [
      "Native serialized props, slots and parent-owned events replace DOM compound child context.",
    ],
    equivalent: "Popover",
    status: "n/a",
    tests: ["src/workflow.test.ts: native parent composition"],
    deviceE2E: false,
  },
  {
    name: "TableRoot",
    scope:
      "Native composition uses Table: columns/data. No standalone placeholder component is exported.",
    limitations: [
      "Native serialized props, slots and parent-owned events replace DOM compound child context.",
    ],
    equivalent: "Table",
    status: "n/a",
    tests: ["src/workflow.test.ts: native parent composition"],
    deviceE2E: false,
  },
  {
    name: "TableHead",
    scope:
      "Native composition uses Table: columns[].header. No standalone placeholder component is exported.",
    limitations: [
      "Native serialized props, slots and parent-owned events replace DOM compound child context.",
    ],
    equivalent: "Table",
    status: "n/a",
    tests: ["src/workflow.test.ts: native parent composition"],
    deviceE2E: false,
  },
  {
    name: "TableBody",
    scope:
      "Native composition uses Table: data records. No standalone placeholder component is exported.",
    limitations: [
      "Native serialized props, slots and parent-owned events replace DOM compound child context.",
    ],
    equivalent: "Table",
    status: "n/a",
    tests: ["src/workflow.test.ts: native parent composition"],
    deviceE2E: false,
  },
  {
    name: "TableRow",
    scope:
      "Native composition uses Table: one data record. No standalone placeholder component is exported.",
    limitations: [
      "Native serialized props, slots and parent-owned events replace DOM compound child context.",
    ],
    equivalent: "Table",
    status: "n/a",
    tests: ["src/workflow.test.ts: native parent composition"],
    deviceE2E: false,
  },
  {
    name: "TableHeader",
    scope:
      "Native composition uses Table: column header label. No standalone placeholder component is exported.",
    limitations: [
      "Native serialized props, slots and parent-owned events replace DOM compound child context.",
    ],
    equivalent: "Table",
    status: "n/a",
    tests: ["src/workflow.test.ts: native parent composition"],
    deviceE2E: false,
  },
  {
    name: "TableCell",
    scope:
      "Native composition uses Table: row field keyed by column. No standalone placeholder component is exported.",
    limitations: [
      "Native serialized props, slots and parent-owned events replace DOM compound child context.",
    ],
    equivalent: "Table",
    status: "n/a",
    tests: ["src/workflow.test.ts: native parent composition"],
    deviceE2E: false,
  },
  {
    name: "TableCellContent",
    scope:
      "Native bounded primary/secondary text and monospace content; default Table cell-renderer generic.",
    limitations: ["Arbitrary ReactNode content uses native slots."],
    tests: ["src/table-parity.test.ts"],
    status: "partial",
    deviceE2E: false,
  },
] as const;
