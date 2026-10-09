// The components of minerva-design/native and the component contract each
// one implements (@minerva/core/contracts). Plain data, read by:
// - tools/generate-contracts.mjs: the `native` platform status of every
//   contract (`beta` when listed here), and the contracts of native-only
//   components (`contract: null`, toC track, props read from their types);
// - the contract parity test (same prop names and defaults as the web);
// - the native contract driver (tests/contracts/drivers/native.tsx);
// - the docs (platform support, React Native tab).
// Not exported by the package entry.

export interface NativeComponent {
  /** Export of minerva-design/native */
  name: string;
  /**
   * Contract implemented (the web component's name); `null` for a
   * native-only (mobile) component, which gets a contract of its own
   */
  contract: string | null;
  /** Other exports of the same component (aliases, parts) */
  aliases?: string[];
  /** Shown on the platform support page */
  notes?: string;
}

export const NATIVE_COMPONENTS: readonly NativeComponent[] = [
  // ---- general / providers ----
  {
    name: "MinervaProvider",
    contract: "ConfigProvider",
    aliases: ["ConfigProvider"],
    notes:
      "MinervaProvider (alias ConfigProvider): theme light / dark / system via useColorScheme, palette, design preset (touch by default), locale, safe-area insets",
  },
  { name: "Button", contract: "Button" },
  { name: "IconButton", contract: "IconButton" },
  { name: "ThemeToggle", contract: "ThemeToggle" },
  { name: "PaletteToggle", contract: "PaletteToggle" },
  { name: "PresetToggle", contract: null },
  // ---- data entry ----
  { name: "Input", contract: "Input" },
  { name: "Textarea", contract: "Textarea" },
  {
    name: "NumberInput",
    contract: "NumberInput",
    aliases: ["Stepper"],
    notes: "Stepper: the mobile stepper look (− / + buttons)",
  },
  { name: "Checkbox", contract: "Checkbox" },
  { name: "CheckboxGroup", contract: null },
  { name: "Radio", contract: "Radio" },
  { name: "RadioGroup", contract: "RadioGroup" },
  { name: "Switch", contract: "Switch" },
  {
    name: "Select",
    contract: "Select",
    notes: "Options open in a bottom sheet (single or multiple)",
  },
  { name: "Picker", contract: null, aliases: ["PickerView"] },
  { name: "DatetimePicker", contract: null },
  { name: "Rating", contract: "Rating" },
  { name: "SearchBar", contract: null },
  {
    name: "FormField",
    contract: "FormField",
    notes: "With Form / useForm: validation on the core field machine",
  },
  { name: "Form", contract: null },
  // ---- navigation ----
  { name: "Tabs", contract: "Tabs" },
  { name: "TabList", contract: "TabList" },
  { name: "Tab", contract: "Tab" },
  { name: "TabPanel", contract: "TabPanel" },
  { name: "Pagination", contract: "Pagination" },
  { name: "Steps", contract: "Steps" },
  { name: "NavBar", contract: null },
  { name: "TabBar", contract: null, aliases: ["TabBarItem"] },
  // ---- feedback ----
  {
    name: "ToastProvider",
    contract: "ToastProvider",
    aliases: ["useToast", "toast"],
    notes:
      "Full-width mobile toasts (position top / center / bottom), safe-area aware",
  },
  { name: "Alert", contract: "Alert" },
  {
    name: "Loading",
    contract: "LoadingState",
    aliases: ["Spinner"],
    notes: "Loading (alias Spinner)",
  },
  {
    name: "Progress",
    contract: "ProgressIndicator",
    notes: "Value-based line / circle progress",
  },
  { name: "Skeleton", contract: "Skeleton" },
  { name: "Empty", contract: "Empty" },
  { name: "PullRefresh", contract: null },
  // ---- overlays ----
  {
    name: "Dialog",
    contract: "Modal",
    aliases: ["Modal"],
    notes: "Dialog (alias Modal): Android back button closes it",
  },
  {
    name: "Popup",
    contract: "Drawer",
    aliases: ["BottomSheet"],
    notes: "Popup / BottomSheet: placement bottom by default on mobile",
  },
  { name: "ActionSheet", contract: null },
  { name: "ImagePreview", contract: null },
  // ---- data display ----
  { name: "Card", contract: "Card" },
  {
    name: "CellGroup",
    contract: "List",
    notes: "CellGroup: grouped settings-style rows",
  },
  { name: "Cell", contract: "ListItem", notes: "Cell: settings-style row" },
  { name: "Badge", contract: "Badge" },
  { name: "Tag", contract: "Tag" },
  { name: "Avatar", contract: "Avatar" },
  { name: "AvatarGroup", contract: "AvatarGroup" },
  { name: "Divider", contract: "Divider" },
  { name: "Calendar", contract: "MonthCalendar" },
  { name: "Collapse", contract: null, aliases: ["CollapseItem"] },
  { name: "Grid", contract: null, aliases: ["GridItem"] },
  { name: "SwipeCell", contract: null },
];

/** Native component of a contract (by contract name) */
export const nativeComponentOf = (
  contract: string,
): NativeComponent | undefined =>
  NATIVE_COMPONENTS.find((c) => c.contract === contract);
