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
  { name: "ThemeProvider", contract: "ThemeProvider" },
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
    aliases: ["Spinner", "LoadingState"],
    notes: "Loading (alias Spinner)",
  },
  {
    name: "Progress",
    contract: "ProgressIndicator",
    aliases: ["ProgressIndicator"],
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
    aliases: ["BottomSheet", "Drawer"],
    notes: "Popup / BottomSheet: placement bottom by default on mobile",
  },
  { name: "ActionSheet", contract: null },
  { name: "ImagePreview", contract: null },
  // ---- data display ----
  { name: "List", contract: "List" },
  { name: "ListItem", contract: "ListItem" },
  { name: "Card", contract: "Card" },
  {
    name: "CellGroup",
    contract: null,
    notes: "CellGroup: grouped settings-style rows",
  },
  { name: "Cell", contract: null, notes: "Cell: settings-style row" },
  { name: "Badge", contract: "Badge" },
  { name: "Tag", contract: "Tag" },
  { name: "Avatar", contract: "Avatar" },
  { name: "AvatarGroup", contract: "AvatarGroup" },
  { name: "Divider", contract: "Divider" },
  { name: "Calendar", contract: "MonthCalendar", aliases: ["MonthCalendar"] },
  { name: "Collapse", contract: null, aliases: ["CollapseItem"] },
  { name: "Grid", contract: null },
  {
    name: "GridItem",
    contract: "GridItem",
    notes:
      "Native GridItem supports fullWidth rows in ResponsiveGrid, asChild layout/press composition, and icon/text shortcuts in Grid; it renders actual native content and optional press actions.",
  },
  { name: "SwipeCell", contract: null },
  // Native counterparts with touch interaction and explicit platform adapters.
  { name: "Table", contract: "Table" },
  { name: "DataTable", contract: "DataTable" },
  { name: "TableRoot", contract: "TableRoot" },
  { name: "TableHead", contract: "TableHead" },
  { name: "TableBody", contract: "TableBody" },
  { name: "TableRow", contract: "TableRow" },
  { name: "TableHeader", contract: "TableHeader" },
  { name: "TableCell", contract: "TableCell" },
  { name: "VirtualList", contract: "VirtualList" },
  { name: "Upload", contract: "Upload" },
  { name: "AutoComplete", contract: "AutoComplete" },
  { name: "Cascader", contract: "Cascader" },
  { name: "CommandDialog", contract: "CommandDialog" },
  { name: "Menu", contract: "Menu" },
  { name: "ContextMenu", contract: "ContextMenu" },
  { name: "Popover", contract: "Popover" },
  { name: "PopoverTrigger", contract: "PopoverTrigger" },
  { name: "PopoverContent", contract: "PopoverContent" },
  { name: "PopoverAnchor", contract: "PopoverAnchor" },
  { name: "PopoverClose", contract: "PopoverClose" },
  { name: "Tooltip", contract: "Tooltip" },
  { name: "TooltipProvider", contract: "TooltipProvider" },
  { name: "Box", contract: "Box" },
  { name: "Stack", contract: "Stack" },
  { name: "HStack", contract: "HStack" },
  { name: "VStack", contract: "VStack" },
  { name: "ResponsiveGrid", contract: "ResponsiveGrid" },
  { name: "SplitLayout", contract: "SplitLayout" },
  { name: "Page", contract: "Page" },
  { name: "PageHeader", contract: "PageHeader" },
  { name: "PageSection", contract: "PageSection" },
  { name: "StatCard", contract: "StatCard" },
  { name: "Toolbar", contract: "Toolbar" },
  { name: "FormLayout", contract: "FormLayout" },
  { name: "DescriptionList", contract: "DescriptionList" },
  { name: "Prose", contract: "Prose" },
  { name: "TextLink", contract: "TextLink" },
  { name: "TagInput", contract: "TagInput" },
  { name: "KeyValueEditor", contract: "KeyValueEditor" },
  { name: "JsonField", contract: "JsonField" },
  { name: "CodeBlock", contract: "CodeBlock" },
  { name: "NavTree", contract: "NavTree" },
  { name: "AppShell", contract: "AppShell" },
  { name: "PageTabs", contract: "PageTabs" },
  { name: "PageTab", contract: "PageTab" },
  { name: "FormControl", contract: "FormControl" },
  { name: "FormLabel", contract: "FormLabel" },
  { name: "FormHelperText", contract: "FormHelperText" },
  { name: "FormErrorMessage", contract: "FormErrorMessage" },
  { name: "ConfirmDialog", contract: "ConfirmDialog" },
  { name: "ConfirmProvider", contract: "ConfirmProvider" },
  { name: "TimePicker", contract: "TimePicker" },
  { name: "CardHeader", contract: "CardHeader" },
  { name: "CardTitle", contract: "CardTitle" },
  { name: "CardDescription", contract: "CardDescription" },
  { name: "CardContent", contract: "CardContent" },
  { name: "CardFooter", contract: "CardFooter" },
  { name: "SkeletonText", contract: "SkeletonText" },
  { name: "RatingScale", contract: "RatingScale" },
  { name: "ModalRoot", contract: "ModalRoot" },
  { name: "ModalTrigger", contract: "ModalTrigger" },
  { name: "ModalClose", contract: "ModalClose" },
  { name: "ModalContent", contract: "ModalContent" },
  { name: "ModalHeader", contract: "ModalHeader" },
  { name: "ModalBody", contract: "ModalBody" },
  { name: "ModalFooter", contract: "ModalFooter" },
  { name: "DrawerRoot", contract: "DrawerRoot" },
  { name: "DrawerTrigger", contract: "DrawerTrigger" },
  { name: "DrawerClose", contract: "DrawerClose" },
  { name: "DrawerContent", contract: "DrawerContent" },
  { name: "DrawerHeader", contract: "DrawerHeader" },
  { name: "DrawerBody", contract: "DrawerBody" },
  { name: "DrawerFooter", contract: "DrawerFooter" },
  { name: "TableCellContent", contract: "TableCellContent" },
  { name: "HtmlPreview", contract: "HtmlPreview" },
  {
    name: "CodeEditor",
    contract: null,
    notes:
      "Native multiline source editor with caller formatter; Monaco remains a DOM engine.",
  },

  { name: "SelectItem", contract: "SelectItem" },
  { name: "SelectGroup", contract: "SelectGroup" },
  { name: "SelectLabel", contract: "SelectLabel" },
  { name: "SelectSeparator", contract: "SelectSeparator" },
];

/** Native component of a contract (by contract name) */
export const nativeComponentOf = (
  contract: string,
): NativeComponent | undefined =>
  NATIVE_COMPONENTS.find((c) => c.contract === contract);
