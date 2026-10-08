import {
  css,
  html,
  nothing,
  type PropertyValues,
  type TemplateResult,
} from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { repeat } from "lit/directives/repeat.js";
import styles from "@lib-core-styles/components/NavTree/navTree.module.scss?inline";
import { TypeaheadController } from "../../controllers/typeahead";
import { AriaController } from "../../internal/aria";
import { DEV, devWarn } from "../../internal/dev";
import { getDirection } from "../../internal/dom";
import { IconChevronDown } from "../../internal/icons";
import { LocaleController } from "../../internal/locale";
import { MinervaElement, hostStyles } from "../../internal/minerva-element";
import { itemParts } from "../../internal/styling-hooks";
import { sharedStyles } from "../../internal/styles";
import { safeHref } from "../../internal/url";

/** Content accepted for icons, trailing content and custom links */
export type NavTreeContent = string | Node | TemplateResult;

/** An entry of a nav tree: a link, an action, or a branch when it has children */
export interface NavTreeItem {
  /** Unique id (matched against `activeId` / `expandedIds`) */
  id: string;
  /** Visible label */
  label: string;
  /** Secondary line under the label (hidden for nested items) */
  description?: string;
  /** Link target of a leaf item (without it the leaf is an action button) */
  href?: string;
  /** Leading icon */
  icon?: NavTreeContent;
  /** Trailing content, e.g. a badge or a count */
  endContent?: NavTreeContent;
  /** Disables the item */
  disabled?: boolean;
  /** Child items; the item becomes an expandable branch */
  children?: NavTreeItem[];
}

/** A titled group of nav tree items */
export interface NavTreeSection {
  id: string;
  title?: string;
  items: NavTreeItem[];
}

/** State of an item, passed to `renderLink` */
export interface NavTreeItemState {
  active: boolean;
  ancestorActive: boolean;
  expanded: boolean;
  depth: number;
  collapsed: boolean;
  hasChildren: boolean;
  disabled: boolean;
  /** Class names to put on the rendered link (styles of the shadow root) */
  className: string;
}

/** Detail of `minerva-select` */
export interface NavTreeSelectDetail {
  /** Id of the activated item */
  value: string;
  item: NavTreeItem;
}

/** Detail of `minerva-expanded-change` */
export interface NavTreeExpandedChangeDetail {
  /** Expanded branch ids after the change */
  expandedIds: string[];
  /** The toggled branch */
  item: NavTreeItem;
  expanded: boolean;
}

function collectActiveAncestors(
  items: NavTreeItem[],
  activeId: string | undefined,
  ids: Set<string>,
): boolean {
  for (const item of items) {
    if (item.id === activeId) return true;
    if (item.children && collectActiveAncestors(item.children, activeId, ids)) {
      ids.add(item.id);
      return true;
    }
  }
  return false;
}

const ITEM_SELECTOR = ".item";
const CHILDREN_SELECTOR = ".children";

/**
 * Sidebar navigation (`<NavTree>` of lib-core) with sections, nested
 * expandable branches, an active item and a compact (icon-only) mode. Data
 * comes from the `sections` property.
 *
 * Disclosure navigation like lib-core: every item is a link / button in the
 * Tab sequence and branches are buttons with `aria-expanded`. ArrowDown /
 * ArrowUp / Home / End move between the visible items, ArrowRight expands a
 * branch (or enters it when expanded), ArrowLeft collapses a branch or moves
 * to its parent (swapped in RTL), and typing a character moves to the next
 * visible item starting with it (core typeahead).
 *
 * @summary Sidebar navigation tree with sections, expandable branches and a compact mode.
 * @tag minerva-nav-tree
 * @csspart root - The `<nav>` landmark
 * @csspart group - A section of items
 * @csspart group-label - The title of a section
 * @csspart item - A link / button row (aria-current=page when active, aria-expanded on branches; not rendered by renderLink)
 * @csspart item--current - Item state of `item`: current
 * @csspart item--expanded - Item state of `item`: expanded
 * @csspart item--disabled - Item state of `item`: disabled
 * @csspart icon - The icon of an item
 * @csspart label - The label of an item
 * @csspart description - The secondary text of an item
 * @fires minerva-select - A leaf link / action or a branch was activated (`detail: { value, item }`); cancelable: `preventDefault()` also prevents the link navigation (client-side routing)
 * @fires minerva-expanded-change - A branch was expanded / collapsed by the user (`detail: { expandedIds, item, expanded }`); cancelable: `preventDefault()` keeps the current state
 */
export class MinervaNavTree extends MinervaElement {
  static override tagName = "minerva-nav-tree";
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
      }
    `,
    sharedStyles(styles),
  ];

  /** Sections of items */
  @property({ attribute: false })
  sections: NavTreeSection[] = [];

  /** Id of the active (current page) item; its ancestors expand */
  @property({ attribute: "active-id", reflect: true })
  activeId?: string;

  /** Compact mode: icons only (labels, trailing content and children hidden) */
  @property({ type: Boolean, reflect: true })
  collapsed = false;

  /** Wraps long labels and descriptions instead of truncating them */
  @property({ type: Boolean, reflect: true, attribute: "wrap-labels" })
  wrapLabels = false;

  /** Expanded branch ids */
  @property({ attribute: false })
  expandedIds: string[] = [];

  /**
   * Custom rendering of leaf links (e.g. router links). Render `content`
   * inside and put `state.className` on the link
   */
  @property({ attribute: false })
  renderLink?: (
    item: NavTreeItem,
    content: TemplateResult,
    state: NavTreeItemState,
  ) => TemplateResult;

  /**
   * Branches the user explicitly collapsed: an active descendant expands its
   * ancestors by default, but the user's intent wins afterwards.
   */
  @state()
  private explicitlyCollapsed = new Set<string>();

  private readonly aria = new AriaController(this);
  private readonly locale = new LocaleController(this);
  private readonly typeahead = new TypeaheadController(this);

  private activeAncestors(): Set<string> {
    const ids = new Set<string>();
    for (const section of this.sections) {
      collectActiveAncestors(section.items, this.activeId, ids);
    }
    return ids;
  }

  private isExpanded(id: string, ancestors: Set<string>) {
    return (
      this.expandedIds.includes(id) ||
      (!this.explicitlyCollapsed.has(id) && ancestors.has(id))
    );
  }

  protected override willUpdate(changed: PropertyValues<this>): void {
    if (DEV && changed.has("sections")) {
      const seen = new Set<string>();
      const visit = (items: NavTreeItem[]) => {
        for (const item of items) {
          if (seen.has(item.id)) {
            devWarn(
              MinervaNavTree.tagName,
              `duplicate item id "${item.id}": ids must be unique.`,
            );
          }
          seen.add(item.id);
          if (item.children) visit(item.children);
        }
      };
      for (const section of this.sections ?? []) visit(section.items ?? []);
    }
  }

  private setItemExpanded(item: NavTreeItem, open: boolean) {
    const next = new Set(this.expandedIds);
    if (open) next.add(item.id);
    else next.delete(item.id);
    const expandedIds = Array.from(next);
    const detail: NavTreeExpandedChangeDetail = {
      expandedIds,
      item,
      expanded: open,
    };
    if (!this.emit("minerva-expanded-change", detail, { cancelable: true })) {
      return;
    }
    const collapsed = new Set(this.explicitlyCollapsed);
    if (open) collapsed.delete(item.id);
    else collapsed.add(item.id);
    this.explicitlyCollapsed = collapsed;
    this.expandedIds = expandedIds;
  }

  private select(item: NavTreeItem, event?: Event) {
    const detail: NavTreeSelectDetail = { value: item.id, item };
    if (!this.emit("minerva-select", detail, { cancelable: true })) {
      event?.preventDefault();
    }
  }

  private toggleItem(item: NavTreeItem) {
    this.setItemExpanded(
      item,
      !this.isExpanded(item.id, this.activeAncestors()),
    );
    this.select(item);
  }

  /** Visible, enabled items in reading order. */
  private focusableItems(): HTMLElement[] {
    return Array.from(
      this.shadowRoot?.querySelectorAll<HTMLElement>(ITEM_SELECTOR) ?? [],
    ).filter(
      (el) =>
        !(el as HTMLButtonElement).disabled &&
        el.getAttribute("aria-disabled") !== "true",
    );
  }

  private logicalKey(key: string) {
    if (key !== "ArrowLeft" && key !== "ArrowRight") return key;
    if (getDirection(this) !== "rtl") return key;
    return key === "ArrowLeft" ? "ArrowRight" : "ArrowLeft";
  }

  /** Arrow-key navigation between the visible items. */
  private handleNavKeyDown = (event: KeyboardEvent) => {
    if (event.defaultPrevented) return;
    const target = event.composedPath()[0] as HTMLElement;
    const current = target?.closest?.<HTMLElement>(ITEM_SELECTOR);
    if (!current || !this.shadowRoot?.contains(current)) return;
    const items = this.focusableItems();
    const index = items.indexOf(current);
    let next: HTMLElement | null | undefined;
    switch (this.logicalKey(event.key)) {
      case "ArrowDown":
        next = items[index + 1];
        break;
      case "ArrowUp":
        next = index > 0 ? items[index - 1] : undefined;
        break;
      case "Home":
        next = items[0];
        break;
      case "End":
        next = items[items.length - 1];
        break;
      case "ArrowLeft":
        // An expanded branch collapses itself (its own handler); any other
        // nested item moves to its parent branch.
        if (current.getAttribute("aria-expanded") === "true") return;
        next = current
          .closest(CHILDREN_SELECTOR)
          ?.parentElement?.querySelector<HTMLElement>(
            `:scope > ${ITEM_SELECTOR}`,
          );
        break;
      default: {
        if (event.altKey || event.ctrlKey || event.metaKey) return;
        const found = this.typeahead.search(
          event.key,
          items.map((el) => ({
            text: el.querySelector(".label")?.textContent ?? "",
          })),
          index,
        );
        if (found === -1) return;
        next = items[found];
      }
    }
    if (next) {
      event.preventDefault();
      next.focus();
    }
  };

  private renderSectionTitle(title: string) {
    return html`<h2 part="group-label" class="sectionTitle">${title}</h2>`;
  }

  private renderContent(item: NavTreeItem, hasChildren: boolean) {
    return html`<span part="icon" class="icon" aria-hidden="true"
        >${item.icon ?? nothing}</span
      ><span class="copy"
        ><span part="label" class="label">${item.label}</span>${
          item.description
            ? html`<small part="description" class="description"
                >${item.description}</small
              >`
            : nothing
        }</span
      >${
        !this.collapsed && (item.endContent || hasChildren)
          ? html`<span class="trailing"
              >${
                item.endContent
                  ? html`<span class="end">${item.endContent}</span>`
                  : nothing
              }${
                hasChildren
                  ? html`<span class="chevron" aria-hidden="true"
                      >${IconChevronDown}</span
                    >`
                  : nothing
              }</span
            >`
          : nothing
      }`;
  }

  private renderItem(
    item: NavTreeItem,
    depth: number,
    ancestors: Set<string>,
  ): TemplateResult {
    const hasChildren = Boolean(item.children?.length);
    const active = item.id === this.activeId;
    const ancestorActive = ancestors.has(item.id);
    const open = hasChildren && this.isExpanded(item.id, ancestors);
    const disabled = Boolean(item.disabled);
    const classes = {
      item: true,
      nested: depth > 0,
      active,
      disabled,
    };
    const className = Object.entries(classes)
      .filter(([, on]) => on)
      .map(([name]) => name)
      .join(" ");
    const title = item.description
      ? `${item.label} / ${item.description}`
      : item.label;
    const content = this.renderContent(item, hasChildren);

    if (hasChildren) {
      const handleBranchKeyDown = (event: KeyboardEvent) => {
        if (this.collapsed) return;
        const key = this.logicalKey(event.key);
        if (key === "ArrowRight") {
          event.preventDefault();
          if (!open) this.setItemExpanded(item, true);
          else
            (event.currentTarget as HTMLElement).parentElement
              ?.querySelector<HTMLElement>(
                `${CHILDREN_SELECTOR} ${ITEM_SELECTOR}`,
              )
              ?.focus();
        } else if (key === "ArrowLeft" && open) {
          event.preventDefault();
          this.setItemExpanded(item, false);
        }
      };
      return html`<div class="branch">
        <button
          part=${itemParts("item", { current: active, expanded: open, disabled })}
          class=${classMap(classes)}
          type="button"
          title=${title}
          aria-expanded=${open ? "true" : "false"}
          data-id=${item.id}
          ?data-current=${active}
          data-ancestor-active=${ancestorActive ? "true" : nothing}
          ?data-expanded=${open}
          ?disabled=${disabled}
          @click=${() => this.toggleItem(item)}
          @keydown=${handleBranchKeyDown}
        >
          ${content}
        </button>
        ${
          open && !this.collapsed
            ? html`<div class="children">
                ${repeat(
                  item.children ?? [],
                  (child) => child.id,
                  (child) => this.renderItem(child, depth + 1, ancestors),
                )}
              </div>`
            : nothing
        }
      </div>`;
    }

    if (this.renderLink) {
      return this.renderLink(item, content, {
        active,
        ancestorActive,
        expanded: false,
        depth,
        collapsed: this.collapsed,
        hasChildren,
        disabled,
        className,
      });
    }
    const part = itemParts("item", { current: active, disabled });
    // A disabled entry is not a navigable link: no href, no handler.
    if (disabled) {
      return html`<span
        part=${part}
        class=${classMap(classes)}
        title=${title}
        data-id=${item.id}
        ?data-current=${active}
        role="link"
        aria-disabled="true"
        >${content}</span
      >`;
    }
    // Without href the entry is an action (minerva-select), i.e. a button.
    if (item.href === undefined) {
      return html`<button
        part=${part}
        class=${classMap(classes)}
        type="button"
        title=${title}
        data-id=${item.id}
        ?data-current=${active}
        aria-current=${active ? "page" : nothing}
        @click=${() => this.select(item)}
      >
        ${content}
      </button>`;
    }
    return html`<a
      part=${part}
      class=${classMap(classes)}
      href=${safeHref(MinervaNavTree.tagName, item.href) ?? nothing}
      title=${title}
      data-id=${item.id}
      ?data-current=${active}
      aria-current=${active ? "page" : nothing}
      @click=${(event: MouseEvent) => this.select(item, event)}
      >${content}</a
    >`;
  }

  protected override render() {
    const ancestors = this.activeAncestors();
    const labelledBy = this.getAttribute("aria-labelledby");
    return html`<nav
      part="root"
      class=${classMap({
        navTree: true,
        collapsed: this.collapsed,
        wrapLabels: this.wrapLabels && !this.collapsed,
      })}
      aria-label=${
        this.aria.label ??
        (labelledBy ? nothing : this.locale.t("navTree.label"))
      }
      @keydown=${this.handleNavKeyDown}
    >
      ${repeat(
        this.sections ?? [],
        (section) => section.id,
        (section) =>
          html`<section part="group" class="section">
            ${section.title ? this.renderSectionTitle(section.title) : nothing}
            <div class="list">
              ${repeat(
                section.items,
                (item) => item.id,
                (item) => this.renderItem(item, 0, ancestors),
              )}
            </div>
          </section>`,
      )}
    </nav>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-nav-tree": MinervaNavTree;
  }
}
