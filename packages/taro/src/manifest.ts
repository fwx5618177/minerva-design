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
    names: ["SegmentedControl"],
    scope:
      "Single-choice segmented switch from string/object options (icon, label, disabled, aria-label), controlled/uncontrolled value, three sizes, neutral/primary thumb, fullWidth, disabled and an equal-width sliding thumb.",
    limitations: [
      "H5 supports roving arrows (left-to-right only) and Home/End selection; native hosts use touch selection. Segments always share the width equally.",
    ],
    tests: ["packages/taro/src/segmented-control.test.tsx"],
  },
  {
    names: ["Slider"],
    scope:
      "Custom touch slider (not the host slider) with one or two non-crossing thumbs, min/max/step or marks-only snapping, step or labelled marks, controlled/uncontrolled value, onChange while dragging and onChangeEnd on release, five colors, three sizes, value label, drag tooltip, hidden named inputs and FormControl disabled/readOnly/invalid.",
    limitations: [
      "The track is measured with createSelectorQuery on touch start (cached afterwards; a layout change is picked up on the next touch). Horizontal sliders are left-to-right only; orientation vertical runs the track bottom (min) to top (max). H5 supports arrow/PageUp/PageDown/Home/End keys on the focusable thumbs; native hosts use touch only and expose no adjustable accessibility actions.",
    ],
    tests: ["packages/taro/src/slider.test.tsx"],
  },
  {
    names: ["WeekStrip"],
    scope:
      "Seven-day strip with firstDayOfWeek, controlled/uncontrolled day and week, today ring, count badge/dot markers with translated day labels, previous/next week navigation and three sizes.",
    limitations: [
      "H5 supports roving arrows and Home/End within the week (the navigation buttons change the week); native hosts use touch day selection.",
    ],
    tests: ["packages/taro/src/week-strip.test.tsx"],
  },
  {
    names: ["AnswerSheet"],
    scope:
      "Numbered question pills grouped by section with unanswered/answered/correct/wrong/skipped statuses, flag dot, controlled/uncontrolled current question (aria-current=step), wrap/scroll layouts, fixed columns, translated item labels, summary and legend, and two sizes.",
    limitations: [
      "H5 supports arrow keys and Home/End across the pills (disabled pills are skipped; no row-wise ArrowUp/ArrowDown); native hosts use tap selection.",
      "layout=scroll centres the current pill through the ScrollView scrollLeft, measured with createSelectorQuery after each change.",
    ],
    tests: ["packages/taro/src/answer-sheet.test.tsx"],
  },
  {
    names: ["KanbanBoard", "KanbanColumn", "KanbanCard"],
    scope:
      "Board of status columns in a horizontal ScrollView (scrollX): equal-width columns (columnWidth), fill when they fit, gap, height/maxHeight with vertically scrolling column bodies, translated region label; columns with an accent dot (theme color or CSS color), title, count badge announced with the title, description, actions, role=list cards wrapped in listitems, translated or custom empty content and a footer. draggable boards move KanbanCard children of keyed columns (value) with a long press and drag: columns and cards measured with createSelectorQuery (DOM rects on H5), drop line, highlighted target column, floating copy, canDrop, onCardMove.",
    limitations: [
      "Drag and drop is touch only (no keyboard or screen-reader moves): offer your own move actions (menus, buttons) for accessibility. No auto-scroll near the edges: the board stops scrolling while a card is picked up, and the page may still scroll on hosts that cannot cancel touchmove. Cards are measured once when picked up. No scroll snapping on native hosts.",
    ],
    tests: ["packages/taro/src/kanban-board.test.tsx"],
  },
  {
    names: ["MediaPlayer"],
    scope:
      "Video through the host <video> component (controls off, driven by createVideoContext: play/pause/seek/playbackRate/requestFullScreen) and audio through Taro.createInnerAudioContext, under a themed control bar: play/pause, skip back/forward (skipSeconds), touch seek bar with the buffered range and aria-valuetext, m:ss / h:mm:ss time, mute, audio volume bar, playback-rate cycle button, video fullscreen, loading spinner and translated error state; startTime (video initial-time, audio startTime), autoPlay, loop, muted/defaultMuted, title, poster, height/aspectRatio; onTimeUpdate/onEnded/onPlay/onPause/onLoadedMetadata/onError/onRateChange/onVolumeChange and a ref with play/pause/seek/context. controls={false} shows the host video's own controls. Captions: tracks (WebVTT or SRT, data: URLs inline) fetched with Taro.request, parsed by the shared minerva-design/core parser and drawn as an overlay synchronized with the time updates, a CC button with an Off / per-track choice row, the choice remembered in storage (default track otherwise) and onTrackChange.",
    limitations: [
      "Beta: needs device validation (WeChat / Alipay / H5 media behavior differs). The host video has no volume API (mute only, no volume bar); no picture-in-picture, no buffered range for audio on hosts that do not report InnerAudioContext.buffered, no keyboard shortcuts; icons are text glyphs (mini programs have no inline SVG). Captions follow the host time updates (about 4 per second), are not shown in the host's native fullscreen, ignore cue positioning / styling, and remote caption files need the app's request domain allowlist.",
    ],
    tests: ["packages/taro/src/media-player.test.tsx"],
  },
  {
    names: ["Flashcard"],
    scope:
      "Two-sided study card: front/back/footer nodes, translated front/back captions and optional hint, controlled/uncontrolled flipped with onFlippedChange, flipOnClick, disabled, y/x axis, elevated/outline/filled variants, three sizes and minHeight. Both faces share one CSS grid cell (the card fits the taller face); the hidden face is aria-hidden and the back is a polite live region.",
    limitations: [
      "Mini-program hosts flip on tap only (no keyboard) and ignore prefers-reduced-motion; the CSS 3D rotateY/rotateX flip and backface-visibility need the WebView renderer (Skyline does not support CSS grid or 3D transforms). On H5 the card is a toggle button with Enter/Space and taps on interactive face content do not flip it.",
    ],
    tests: ["packages/taro/src/flashcard.test.tsx"],
  },
  {
    names: ["DatePicker"],
    scope:
      "YYYY-MM-DD controlled strings/null/empty, defaultValue, strict typing and lenient blur normalization, real 42-day calendar with month navigation, valid-date and min/max checks, clearing, form locks, labels and open/change callbacks.",
    limitations: [
      "Native touch calendar; browser roving focus and collision-aware popup positioning are not reproduced. Device validation is outstanding.",
    ],
    tests: [
      "packages/taro/src/date-picker.test.tsx",
      "packages/taro/spike/browser/date-picker.spec.ts",
    ],
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
      "Axis-aware separators with length/spacing/text/elevation, Empty dimensions/shadow/accessible description/illustration/footer/actions, decorative or announced skeleton shapes/avatar/title/paragraph/pulse/wave, and five distinct themed progress variants/full width, plus determinate bar/circle value/max/showValue/format with clamped aria-valuenow.",
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
      "Safe native navigation, description/list composition, text wrapping and syntax-highlighted code (nested Text, opt-in line numbers / language label, character-range marks with tap) with native clipboard copying.",
    limitations: [
      "Navigator routes must be valid host routes; browser external-link behavior and HTML prose selectors are not equivalent.",
    ],
    tests: [
      "packages/taro/src/native-api.test.tsx",
      "packages/taro/src/code-block.test.tsx",
    ],
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

/**
 * Chart components (Canvas 2D engine of minerva-design/charts). Read by
 * tools/generate-contracts.mjs (`*ChartManifest`): `beta` on Taro, `n/a`
 * for the DOM / GPU widgets, which are not exported.
 */
const chartFamilies: Array<{
  names: string[];
  status?: "n/a";
  scope: string;
  limitations: string[];
  tests: string[];
}> = [
  {
    names: [
      "Chart",
      "LineChart",
      "AreaChart",
      "BarChart",
      "HorizontalBarChart",
      "ScatterChart",
      "QuadrantChart",
      "CandlestickChart",
      "HeatmapChart",
      "Sparkline",
      "RangeAreaChart",
      "MixedChart",
      "BubbleChart",
      "HistogramChart",
      "BoxPlotChart",
      "WaterfallChart",
      "GanttChart",
    ],
    scope:
      "Cartesian charts drawn on a Canvas 2D node by the DOM-free engine (minerva-design/charts presets): the web component props mapped to the same engine options, tap / scrub tooltip, legend toggles, pinch zoom, pan and double-tap reset, H5 mouse hover; ref exposes resetZoom/getView/setView/getInstance/resize.",
    limitations: [
      "No WebGPU / WebGL renderer (one Canvas 2D path), no keyboard navigation and no React tooltip content: tooltip.render may only return text.",
      "QuadrantChart accessible points: a visually hidden list of the points (role / aria-role, aria-label with name, quadrant and values; a tap is onPointClick) with 'Move to …' buttons calling onPointDrop with the center of the neighbouring quadrant. Mini-program views take no keyboard focus, so there is no focus ring nor Shift + arrow moves, and no live region: the move is announced (role=status) on H5 only.",
    ],
    tests: [
      "packages/taro/src/charts.test.tsx",
      "packages/taro/src/named-charts.test.tsx",
    ],
  },
  {
    names: [
      "PieChart",
      "DonutChart",
      "RadarChart",
      "GaugeChart",
      "FunnelChart",
      "TreemapChart",
      "SankeyChart",
      "SunburstChart",
      "RadialBarChart",
      "CalendarHeatmap",
      "BulletChart",
      "ChordChart",
      "ShapeChart",
    ],
    scope:
      "Shape charts drawn on a Canvas 2D node by the DOM-free shape engine: legend toggles (controlled hidden), tap to highlight with the canvas tooltip, entry / update animations, sunburst drill-down with onDrill, and a generic ShapeChart taking any shape type's options.",
    limitations: [
      "No keyboard navigation and no React tooltip content: tooltip.render may only return text.",
    ],
    tests: ["packages/taro/src/shape-charts.test.tsx"],
  },
  {
    names: [
      "TradingChart",
      "DepthChart",
      "OrderBook",
      "OrderBookHeatmap",
      "TimeAndSales",
      "Scatter3DChart",
      "Surface3DChart",
      "Bar3DChart",
      "Line3DChart",
    ],
    status: "n/a",
    scope:
      "Not exported: these components need a DOM and WebGPU / WebGL (virtualized DOM panels, GPU rendering), which mini-program views do not provide.",
    limitations: [
      "Use a web-view page that renders the web component (minerva-design/charts) on mini-programs.",
    ],
    tests: ["packages/taro/src/named-charts.test.tsx"],
  },
];
export const taroChartManifest: TaroComponentManifestEntry[] =
  chartFamilies.flatMap((family) =>
    family.names.map((name) => ({
      name,
      scope: family.scope,
      ...(family.status ? { status: family.status } : {}),
      limitations: family.limitations,
      tests: family.tests,
    })),
  );
