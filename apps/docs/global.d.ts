/// <reference types="vite/client" />

// Minerva custom elements in the docs site's JSX (React 19 passes props as
// properties to custom elements). The package ships precise typings
// (minerva-design/web-components/react) generated at build time; the docs site
// type-checks without building it, so a permissive declaration is used here.
import type { DetailedHTMLProps, HTMLAttributes } from "react";

/** Tag names of the Minerva custom elements */
type MinervaTag =
  | "minerva-alert"
  | "minerva-app-shell"
  | "minerva-autocomplete"
  | "minerva-avatar"
  | "minerva-avatar-group"
  | "minerva-badge"
  | "minerva-box"
  | "minerva-button"
  | "minerva-card"
  | "minerva-card-content"
  | "minerva-card-description"
  | "minerva-card-footer"
  | "minerva-card-header"
  | "minerva-card-title"
  | "minerva-cascader"
  | "minerva-checkbox"
  | "minerva-code-block"
  | "minerva-command-dialog"
  | "minerva-config"
  | "minerva-confirm-dialog"
  | "minerva-context-menu"
  | "minerva-data-table"
  | "minerva-description-item"
  | "minerva-description-list"
  | "minerva-divider"
  | "minerva-drawer"
  | "minerva-empty"
  | "minerva-form-control"
  | "minerva-form-layout"
  | "minerva-grid-item"
  | "minerva-hstack"
  | "minerva-html-preview"
  | "minerva-icon-button"
  | "minerva-input"
  | "minerva-json-field"
  | "minerva-key-value-editor"
  | "minerva-list"
  | "minerva-list-item"
  | "minerva-loading-state"
  | "minerva-menu"
  | "minerva-menu-checkbox-item"
  | "minerva-menu-group"
  | "minerva-menu-item"
  | "minerva-menu-label"
  | "minerva-menu-radio-item"
  | "minerva-menu-separator"
  | "minerva-modal"
  | "minerva-month-calendar"
  | "minerva-nav-tree"
  | "minerva-number-input"
  | "minerva-option"
  | "minerva-option-group"
  | "minerva-page"
  | "minerva-page-header"
  | "minerva-page-section"
  | "minerva-page-tab"
  | "minerva-page-tabs"
  | "minerva-pagination"
  | "minerva-palette-toggle"
  | "minerva-popover"
  | "minerva-progress"
  | "minerva-prose"
  | "minerva-radio"
  | "minerva-radio-group"
  | "minerva-rating"
  | "minerva-rating-scale"
  | "minerva-responsive-grid"
  | "minerva-select"
  | "minerva-select-label"
  | "minerva-select-separator"
  | "minerva-skeleton"
  | "minerva-skeleton-text"
  | "minerva-split-layout"
  | "minerva-stack"
  | "minerva-stat-card"
  | "minerva-steps"
  | "minerva-switch"
  | "minerva-tab"
  | "minerva-tab-panel"
  | "minerva-table-cell-content"
  | "minerva-tabs"
  | "minerva-tag"
  | "minerva-tag-input"
  | "minerva-text-link"
  | "minerva-textarea"
  | "minerva-theme-toggle"
  | "minerva-time-picker"
  | "minerva-toast-region"
  | "minerva-toolbar"
  | "minerva-tooltip"
  | "minerva-tooltip-provider"
  | "minerva-upload"
  | "minerva-virtual-list"
  | "minerva-vstack";

type MinervaIntrinsicElements = {
  [Tag in MinervaTag]: DetailedHTMLProps<
    HTMLAttributes<HTMLElement>,
    HTMLElement
  > &
    Record<string, unknown>;
};

declare module "react" {
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface IntrinsicElements extends MinervaIntrinsicElements {}
  }
}
