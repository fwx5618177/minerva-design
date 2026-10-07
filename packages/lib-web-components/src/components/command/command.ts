import { css, html, nothing, unsafeCSS, type PropertyValues } from "lit";
import { property, query, state } from "lit/decorators.js";
import { live } from "lit/directives/live.js";
import modalStyles from "@lib-core-styles/components/Modal/modal.module.scss?inline";
import styles from "@lib-core-styles/components/Command/command.module.scss?inline";
import { DismissableLayerController } from "../../controllers/dismissable-layer";
import { popoverResetStyles } from "../../controllers/floating-layer";
import { FocusScopeController } from "../../controllers/focus-scope";
import { ModalController } from "../../controllers/modal";
import { DEV, devWarn } from "../../internal/dev";
import { hideTopLayer, showTopLayer } from "../../internal/dom";
import { LocaleController } from "../../internal/locale";
import { MinervaElement, hostStyles } from "../../internal/minerva-element";
import { PresenceController } from "../../internal/presence";
import {
  isEditableTarget,
  matchesShortcut,
  normalizeShortcuts,
} from "./shortcuts";

export {
  matchesShortcut,
  normalizeShortcuts,
  type CommandShortcutEvent,
} from "./shortcuts";

/** One entry of the command palette (same shape as lib-core's `CommandItem`). */
export interface CommandItem {
  /** Unique id, passed back as `value` in `minerva-select` */
  id: string;
  /** Main label */
  title: string;
  /** Secondary line below the title */
  description?: string;
  /** Group name, shown as a badge and matched by the search */
  group?: string;
  /** Extra search terms (not displayed) */
  keywords?: string;
  /** Hides the item from the results */
  disabled?: boolean;
}

/** Why the palette asked to open / close (`minerva-open-change` detail) */
export type CommandOpenChangeReason =
  "shortcut" | "select" | "escape" | "outside";

const normalize = (value: string) => value.trim().toLowerCase();

const searchText = (item: CommandItem) =>
  `${item.group ?? ""} ${item.title} ${item.description ?? ""} ${item.keywords ?? ""}`;

/** `shortcut` attribute: comma-separated list ("mod+k, /"). */
const shortcutConverter = {
  fromAttribute: (value: string | null) =>
    value === null
      ? undefined
      : value
          .split(",")
          .map((part) => part.trim())
          .filter(Boolean),
  toAttribute: (value: string | string[] | undefined) =>
    Array.isArray(value) ? value.join(", ") : value,
};

/**
 * Command palette (`<CommandDialog>` of lib-core): a searchable list of
 * commands in a modal dialog. Type to filter (title, description, group and
 * keywords), move with ArrowUp / ArrowDown (Home / End while the query is
 * empty) over the results (combobox + listbox with `aria-activedescendant`),
 * choose with Enter or a click; Escape (topmost layer only) or an overlay
 * click closes it. Focus moves to the search input, is trapped, and returns
 * to the opener on close. An optional global `shortcut` (e.g. "mod+k")
 * opens it.
 *
 * @summary Searchable command palette in a modal, with a global shortcut.
 * @tag minerva-command-dialog
 * @csspart overlay - The backdrop
 * @csspart panel - The dialog panel (`role="dialog"`)
 * @csspart header - The title row
 * @csspart description - The description
 * @csspart search - The search field wrapper
 * @csspart input - The search input (`role="combobox"`)
 * @csspart listbox - The results list (`role="listbox"`)
 * @csspart item - A result (`role="option"`)
 * @csspart empty - The empty state
 * @fires minerva-select - A command was chosen (`detail: { value, item }`, `value` = the item's `id`); the palette then closes
 * @fires minerva-open-change - The user asked to open (shortcut) / close (`detail: { open, reason }`); cancelable: `preventDefault()` keeps the current state
 * @fires minerva-after-open - The palette is open and focus moved to the search input
 * @fires minerva-after-close - The palette finished closing (after its exit animation)
 */
export class MinervaCommandDialog extends MinervaElement {
  static override tagName = "minerva-command-dialog";
  static override styles = [
    hostStyles,
    popoverResetStyles,
    css`
      :host {
        display: contents;
      }
    `,
    unsafeCSS(modalStyles),
    unsafeCSS(styles),
  ];

  /** Whether the palette is open */
  @property({ type: Boolean, reflect: true })
  open = false;

  /** Commands to search (disabled items are never shown) */
  @property({ attribute: false })
  items: CommandItem[] = [];

  /** Title of the dialog (default: localized "Command palette") */
  @property()
  label?: string;

  /** Description of the palette (default: a localized hint) */
  @property()
  description?: string;

  /** Placeholder (and accessible name) of the search input (default: a localized hint) */
  @property()
  placeholder?: string;

  /** Text shown when nothing matches (default: localized "No matching results") */
  @property({ attribute: "empty-text" })
  emptyText?: string;

  /** Shortcut hint rendered as `<kbd>` next to the title, e.g. "⌘K" */
  @property({ attribute: "shortcut-label" })
  shortcutLabel?: string;

  /**
   * Global keyboard shortcut(s) that open the palette, e.g. "mod+k" (Cmd+K
   * on macOS, Ctrl+K elsewhere). Modifiers: mod, ctrl, meta/cmd, shift,
   * alt/option. The attribute takes a comma-separated list ("mod+k, /").
   */
  @property({ converter: shortcutConverter })
  shortcut?: string | string[];

  /** Maximum number of results shown */
  @property({ type: Number, attribute: "max-results" })
  maxResults = 12;

  /** Accessible label of the results list (default: localized "Command results") */
  @property({ attribute: "results-label" })
  resultsLabel?: string;

  /** Key hint at the end of the search input (default: localized "Enter") */
  @property({ attribute: "enter-label" })
  enterLabel?: string;

  @state()
  private query = "";

  @state()
  private activeIndex = 0;

  @query(".content")
  private panel?: HTMLElement;

  @query(".overlay")
  private overlay?: HTMLElement;

  private readonly locale = new LocaleController(this);
  private readonly presence = new PresenceController(this, () => this.panel);
  private readonly modal = new ModalController(this);
  private readonly focusScope = new FocusScopeController(this, () => ({
    trapped: true,
    loop: true,
    restoreFocus: true,
  }));
  private readonly layer = new DismissableLayerController(this, () => ({
    disableOutsidePointerEvents: true,
    // Focus is trapped: never dismiss on focus outside (`focusin` is not
    // cancelable, so preventDefault() would not stop the dismissal).
    onFocusOutside: () => false,
    onEscapeKeyDown: () => {
      this.reason = "escape";
    },
    onPointerDownOutside: () => {
      this.reason = "outside";
    },
    onDismiss: () => this.requestOpenChange(false, this.reason),
  }));
  private reason: CommandOpenChangeReason = "outside";
  private wasPresent = false;

  /** Opens the palette */
  show(): void {
    this.open = true;
  }

  /** Closes the palette */
  hide(): void {
    this.open = false;
  }

  /** The visible results: enabled items matching the query, capped at `maxResults`. */
  private get results(): CommandItem[] {
    const q = normalize(this.query);
    return (Array.isArray(this.items) ? this.items : [])
      .filter((item) => !item.disabled)
      .filter((item) => !q || normalize(searchText(item)).includes(q))
      .slice(0, Math.max(0, this.maxResults));
  }

  /** Asks to change `open`; listeners can cancel `minerva-open-change`. */
  private requestOpenChange(open: boolean, reason: CommandOpenChangeReason) {
    if (open === this.open) return;
    const allowed = this.emit(
      "minerva-open-change",
      { open, reason },
      { cancelable: true },
    );
    if (allowed) this.open = open;
  }

  private select(item: CommandItem) {
    this.emit("minerva-select", { value: item.id, item });
    this.requestOpenChange(false, "select");
  }

  /** Global shortcut (capture phase, like lib-core). */
  private readonly handleShortcut = (event: KeyboardEvent) => {
    const shortcuts = normalizeShortcuts(this.shortcut);
    if (shortcuts.length === 0) return;
    // A shortcut without Ctrl / Meta / Alt (e.g. "/") is a printable key:
    // while typing in a text field (including the palette's own search, in
    // a shadow root: hence the composed path) it must reach the field.
    const target = event.composedPath()[0] ?? event.target;
    const editable =
      isEditableTarget(target) &&
      !event.ctrlKey &&
      !event.metaKey &&
      !event.altKey;
    if (editable || event.isComposing) return;
    if (!shortcuts.some((value) => matchesShortcut(event, value))) return;
    event.preventDefault();
    event.stopPropagation();
    this.requestOpenChange(true, "shortcut");
  };

  private handleKeyDown(event: KeyboardEvent) {
    const results = this.results;
    const last = Math.max(results.length - 1, 0);
    const moves: Record<string, (index: number) => number> = {
      ArrowDown: (index) => Math.min(index + 1, last),
      ArrowUp: (index) => Math.max(index - 1, 0),
      Home: () => 0,
      End: () => last,
    };
    const move = moves[event.key];
    if (move && (event.key.startsWith("Arrow") || !this.query)) {
      event.preventDefault();
      this.activeIndex = move(Math.min(this.activeIndex, last));
      return;
    }
    const active = results[this.activeIndex];
    if (event.key === "Enter" && active && !event.isComposing) {
      event.preventDefault();
      this.select(active);
    }
  }

  private handleInput(event: Event) {
    this.query = (event.target as HTMLInputElement).value;
    this.activeIndex = 0;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener("keydown", this.handleShortcut, true);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener("keydown", this.handleShortcut, true);
    hideTopLayer(this.panel);
    hideTopLayer(this.overlay);
  }

  protected override willUpdate(changed: PropertyValues<this>): void {
    if (changed.has("open")) {
      this.presence.sync(this.open);
      // Every opening starts with an empty query and the first result.
      if (this.open) {
        this.query = "";
        this.activeIndex = 0;
      }
    }
    if (changed.has("items") && DEV) this.checkItems();
    const count = this.results.length;
    if (this.activeIndex > 0 && this.activeIndex >= count) {
      this.activeIndex = Math.max(count - 1, 0);
    }
  }

  private checkItems() {
    if (!Array.isArray(this.items)) {
      devWarn(
        MinervaCommandDialog.tagName,
        "`items` must be an array of { id, title, ... } objects.",
      );
      return;
    }
    const seen = new Set<string>();
    for (const item of this.items) {
      if (seen.has(item.id)) {
        devWarn(
          MinervaCommandDialog.tagName,
          `duplicate item id "${item.id}": ids identify the chosen command in minerva-select and must be unique.`,
        );
      }
      seen.add(item.id);
    }
  }

  protected override updated(changed: PropertyValues): void {
    const present = this.open || this.presence.present;
    if (changed.has("open")) {
      const panel = this.panel;
      if (this.open && panel) {
        showTopLayer(this.overlay);
        showTopLayer(panel);
        this.modal.activate(this);
        this.layer.activate(panel);
        this.focusScope.activate(panel);
        this.emit("minerva-after-open");
      } else if (!this.open) {
        this.focusScope.deactivate();
        this.layer.deactivate();
        this.modal.deactivate();
      }
    }
    if (this.open && (changed.has("activeIndex") || changed.has("query"))) {
      this.renderRoot
        .querySelector(`#option-${this.activeIndex}`)
        ?.scrollIntoView?.({ block: "nearest" });
    }
    if (this.wasPresent && !present) this.afterClose();
    this.wasPresent = present;
  }

  private afterClose() {
    hideTopLayer(this.panel);
    hideTopLayer(this.overlay);
    this.emit("minerva-after-close");
  }

  protected override render() {
    const present = this.open || this.presence.present;
    if (!present) return nothing;
    const t = this.locale.t;
    const state = this.open ? "open" : "closed";
    const results = this.results;
    const activeId = results[this.activeIndex]
      ? `option-${this.activeIndex}`
      : undefined;
    const placeholder = this.placeholder ?? t("command.placeholder");
    return html`<div
        part="overlay"
        class="overlay"
        popover="manual"
        data-state=${state}
        aria-hidden="true"
      ></div>
      <div
        part="panel"
        class="content large dialog"
        popover="manual"
        role="dialog"
        aria-modal="true"
        aria-labelledby="title"
        aria-describedby="description"
        tabindex="-1"
        data-state=${state}
      >
        <p id="description" class="description" part="description">
          ${this.description ?? t("command.description")}
        </p>
        <div id="title" class="header" part="header">
          <span>${this.label ?? t("command.title")}</span>
          ${
            this.shortcutLabel
              ? html`<kbd class="kbd">${this.shortcutLabel}</kbd>`
              : nothing
          }
        </div>
        <div class="search" part="search">
          <span class="searchIcon" aria-hidden="true">⌕</span>
          <input
            part="input"
            class="input"
            type="text"
            role="combobox"
            aria-label=${placeholder}
            aria-autocomplete="list"
            aria-expanded="true"
            aria-controls="results"
            aria-activedescendant=${activeId ?? nothing}
            autocomplete="off"
            spellcheck="false"
            placeholder=${placeholder}
            .value=${live(this.query)}
            @input=${this.handleInput}
            @keydown=${this.handleKeyDown}
          />
          <kbd class="enterHint" aria-hidden="true"
            >${this.enterLabel ?? t("command.enter")}</kbd
          >
        </div>
        <div
          id="results"
          part="listbox"
          class="results"
          role="listbox"
          aria-label=${this.resultsLabel ?? t("command.results")}
        >
          ${
            results.length === 0
              ? html`<div class="empty" part="empty">
                  ${this.emptyText ?? t("command.empty")}
                </div>`
              : results.map((item, index) => {
                  const active = index === this.activeIndex;
                  return html`<button
                    id=${`option-${index}`}
                    part="item"
                    type="button"
                    role="option"
                    tabindex="-1"
                    aria-selected=${active ? "true" : "false"}
                    data-active=${active ? "true" : nothing}
                    class="item"
                    @mouseenter=${() => (this.activeIndex = index)}
                    @click=${() => this.select(item)}
                  >
                    <span class="copy"
                      ><strong>${item.title}</strong>${
                        item.description
                          ? html`<small>${item.description}</small>`
                          : nothing
                      }</span
                    >${
                      item.group
                        ? html`<span class="group">${item.group}</span>`
                        : nothing
                    }
                  </button>`;
                })
          }
        </div>
      </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-command-dialog": MinervaCommandDialog;
  }
}
