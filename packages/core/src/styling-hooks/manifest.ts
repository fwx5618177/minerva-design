// One module per component in ./components (sorted). The core tests check
// that every module is listed here.
import alertHooks from "./components/alert";
import appShellHooks from "./components/app-shell";
import autocompleteHooks from "./components/autocomplete";
import avatarHooks from "./components/avatar";
import avatarGroupHooks from "./components/avatar-group";
import badgeHooks from "./components/badge";
import boxHooks from "./components/box";
import buttonHooks from "./components/button";
import cardHooks from "./components/card";
import cardContentHooks from "./components/card-content";
import cardDescriptionHooks from "./components/card-description";
import cardFooterHooks from "./components/card-footer";
import cardHeaderHooks from "./components/card-header";
import cardTitleHooks from "./components/card-title";
import cascaderHooks from "./components/cascader";
import checkboxHooks from "./components/checkbox";
import codeBlockHooks from "./components/code-block";
import codeEditorHooks from "./components/code-editor";
import commandDialogHooks from "./components/command-dialog";
import confirmDialogHooks from "./components/confirm-dialog";
import contextMenuHooks from "./components/context-menu";
import dataTableHooks from "./components/data-table";
import descriptionListHooks from "./components/description-list";
import dividerHooks from "./components/divider";
import drawerHooks from "./components/drawer";
import emptyHooks from "./components/empty";
import formControlHooks from "./components/form-control";
import formLayoutHooks from "./components/form-layout";
import gridItemHooks from "./components/grid-item";
import hstackHooks from "./components/hstack";
import htmlPreviewHooks from "./components/html-preview";
import iconButtonHooks from "./components/icon-button";
import inputHooks from "./components/input";
import jsonFieldHooks from "./components/json-field";
import keyValueEditorHooks from "./components/key-value-editor";
import listHooks from "./components/list";
import listItemHooks from "./components/list-item";
import loadingStateHooks from "./components/loading-state";
import menuHooks from "./components/menu";
import modalHooks from "./components/modal";
import monthCalendarHooks from "./components/month-calendar";
import navTreeHooks from "./components/nav-tree";
import numberInputHooks from "./components/number-input";
import optionHooks from "./components/option";
import optionGroupHooks from "./components/option-group";
import pageHooks from "./components/page";
import pageHeaderHooks from "./components/page-header";
import pageSectionHooks from "./components/page-section";
import pageTabHooks from "./components/page-tab";
import pageTabsHooks from "./components/page-tabs";
import paginationHooks from "./components/pagination";
import paletteToggleHooks from "./components/palette-toggle";
import popoverHooks from "./components/popover";
import progressHooks from "./components/progress";
import proseHooks from "./components/prose";
import radioHooks from "./components/radio";
import radioGroupHooks from "./components/radio-group";
import ratingHooks from "./components/rating";
import ratingScaleHooks from "./components/rating-scale";
import responsiveGridHooks from "./components/responsive-grid";
import selectHooks from "./components/select";
import selectLabelHooks from "./components/select-label";
import selectSeparatorHooks from "./components/select-separator";
import skeletonHooks from "./components/skeleton";
import skeletonTextHooks from "./components/skeleton-text";
import splitLayoutHooks from "./components/split-layout";
import stackHooks from "./components/stack";
import statCardHooks from "./components/stat-card";
import stepsHooks from "./components/steps";
import switchHooks from "./components/switch";
import tabHooks from "./components/tab";
import tabPanelHooks from "./components/tab-panel";
import tableCellContentHooks from "./components/table-cell-content";
import tabsHooks from "./components/tabs";
import tagHooks from "./components/tag";
import tagInputHooks from "./components/tag-input";
import textLinkHooks from "./components/text-link";
import textareaHooks from "./components/textarea";
import themeToggleHooks from "./components/theme-toggle";
import timePickerHooks from "./components/time-picker";
import toastRegionHooks from "./components/toast-region";
import toolbarHooks from "./components/toolbar";
import tooltipHooks from "./components/tooltip";
import uploadHooks from "./components/upload";
import virtualListHooks from "./components/virtual-list";
import vstackHooks from "./components/vstack";

/**
 * The public styling hooks of every Minerva component, by component name:
 * `data-minerva="<name>"` in React, the `<minerva-<name>>` element in the
 * web components. Single source of truth of the docs ("Styling hooks"
 * sections), the contract tests and `styling-hooks.lock.json`.
 */
export const stylingHooks = {
  alert: alertHooks,
  "app-shell": appShellHooks,
  autocomplete: autocompleteHooks,
  avatar: avatarHooks,
  "avatar-group": avatarGroupHooks,
  badge: badgeHooks,
  box: boxHooks,
  button: buttonHooks,
  card: cardHooks,
  "card-content": cardContentHooks,
  "card-description": cardDescriptionHooks,
  "card-footer": cardFooterHooks,
  "card-header": cardHeaderHooks,
  "card-title": cardTitleHooks,
  cascader: cascaderHooks,
  checkbox: checkboxHooks,
  "code-block": codeBlockHooks,
  "code-editor": codeEditorHooks,
  "command-dialog": commandDialogHooks,
  "confirm-dialog": confirmDialogHooks,
  "context-menu": contextMenuHooks,
  "data-table": dataTableHooks,
  "description-list": descriptionListHooks,
  divider: dividerHooks,
  drawer: drawerHooks,
  empty: emptyHooks,
  "form-control": formControlHooks,
  "form-layout": formLayoutHooks,
  "grid-item": gridItemHooks,
  hstack: hstackHooks,
  "html-preview": htmlPreviewHooks,
  "icon-button": iconButtonHooks,
  input: inputHooks,
  "json-field": jsonFieldHooks,
  "key-value-editor": keyValueEditorHooks,
  list: listHooks,
  "list-item": listItemHooks,
  "loading-state": loadingStateHooks,
  menu: menuHooks,
  modal: modalHooks,
  "month-calendar": monthCalendarHooks,
  "nav-tree": navTreeHooks,
  "number-input": numberInputHooks,
  option: optionHooks,
  "option-group": optionGroupHooks,
  page: pageHooks,
  "page-header": pageHeaderHooks,
  "page-section": pageSectionHooks,
  "page-tab": pageTabHooks,
  "page-tabs": pageTabsHooks,
  pagination: paginationHooks,
  "palette-toggle": paletteToggleHooks,
  popover: popoverHooks,
  progress: progressHooks,
  prose: proseHooks,
  radio: radioHooks,
  "radio-group": radioGroupHooks,
  rating: ratingHooks,
  "rating-scale": ratingScaleHooks,
  "responsive-grid": responsiveGridHooks,
  select: selectHooks,
  "select-label": selectLabelHooks,
  "select-separator": selectSeparatorHooks,
  skeleton: skeletonHooks,
  "skeleton-text": skeletonTextHooks,
  "split-layout": splitLayoutHooks,
  stack: stackHooks,
  "stat-card": statCardHooks,
  steps: stepsHooks,
  switch: switchHooks,
  tab: tabHooks,
  "tab-panel": tabPanelHooks,
  "table-cell-content": tableCellContentHooks,
  tabs: tabsHooks,
  tag: tagHooks,
  "tag-input": tagInputHooks,
  "text-link": textLinkHooks,
  textarea: textareaHooks,
  "theme-toggle": themeToggleHooks,
  "time-picker": timePickerHooks,
  "toast-region": toastRegionHooks,
  toolbar: toolbarHooks,
  tooltip: tooltipHooks,
  upload: uploadHooks,
  "virtual-list": virtualListHooks,
  vstack: vstackHooks,
} as const;

/** The manifest type (component name -> spec) */
export type StylingHooksManifest = typeof stylingHooks;
/** Name of a component with styling hooks */
export type HookComponentName = keyof StylingHooksManifest;
/** Part names of a component */
export type HookPartName<C extends HookComponentName> = Extract<
  keyof StylingHooksManifest[C]["parts"],
  string
>;

/**
 * Custom elements without styling hooks: they render no box of their own
 * (configuration / providers, `display: contents` with no shadow content).
 * `<minerva-description-item>` is data for its list: style the `row`,
 * `term` and `description` parts of `description-list`. The
 * `<minerva-menu-*>` elements are declarative data for `<minerva-menu>` /
 * `<minerva-context-menu>`: style the menu's item / group / separator /
 * label parts.
 */
export const NON_VISUAL_ELEMENTS = [
  "minerva-config",
  "minerva-confirm-provider",
  "minerva-description-item",
  "minerva-menu-checkbox-item",
  "minerva-menu-group",
  "minerva-menu-item",
  "minerva-menu-label",
  "minerva-menu-radio-item",
  "minerva-menu-separator",
  "minerva-tooltip-provider",
] as const;
