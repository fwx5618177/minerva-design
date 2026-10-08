import { css, html, nothing, type PropertyValues } from "lit";
import { setHostAria } from "../../internal/aria";
import { attachInternals } from "../../internal/form";
import { property } from "lit/decorators.js";
import styles from "@react-styles/components/Select/select.module.scss?inline";
import { DEV, devWarn } from "../../internal/dev";
import { getHostAttribute, setHostAttribute } from "../../internal/hydration";
import { IconCheck } from "../../internal/icons";
import { MinervaElement, hostStyles } from "../../internal/minerva-element";
import { sharedStyles } from "../../internal/styles";

let nextLabelId = 0;

/**
 * An option of a `<minerva-select>` (`<SelectItem>` of React). The
 * element itself is the `role="option"` (it receives focus while the
 * listbox is open); its content is the option's label.
 *
 * @summary Selectable option of a select.
 * @tag minerva-option
 * @slot - Content of the option (text, icon...)
 * @csspart root - The option row
 * @csspart label - The content wrapper
 * @csspart indicator - The check mark (while selected)
 */
export class MinervaOption extends MinervaElement {
  private readonly internals = attachInternals(this);
  private readonly ownedAria = new Set<string>();
  static override tagName = "minerva-option";
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
        outline: none;
      }
    `,
    sharedStyles(styles),
  ];

  /** Value of the option (must not be empty) */
  @property({ reflect: true })
  value = "";

  /**
   * Prevents selecting the option
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** Text shown in the select's trigger when selected (default: the text content) */
  @property()
  label = "";

  /** Text used for typeahead when the content is not plain text */
  @property({ attribute: "text-value" })
  textValue?: string;

  /** Whether the option is the selected one (managed by the select) */
  @property({ type: Boolean, attribute: false })
  selected = false;

  /** Whether the option is highlighted (managed by the select) */
  @property({ type: Boolean, attribute: false })
  highlighted = false;

  /** Text of the option: `textValue`, else `label`, else its text content. */
  get text(): string {
    return this.textValue ?? (this.label || this.textContent?.trim() || "");
  }

  /** Label shown in the trigger: `label`, else the text content. */
  get displayLabel(): string {
    return this.label || this.textContent?.trim() || "";
  }

  override connectedCallback(): void {
    super.connectedCallback();
    setHostAria(this, this.internals, { role: "option" }, this.ownedAria);
    // tabindex="-1" is set by the select when it focuses the option
  }

  protected override updated(changed: PropertyValues<this>): void {
    super.updated(changed);
    setHostAria(
      this,
      this.internals,
      {
        ariaSelected: String(this.selected),
        ariaDisabled: this.disabled ? "true" : null,
      },
      this.ownedAria,
    );
    // hydration-safe: server-rendered options get them once hydrated
    setHostAttribute(this, "data-highlighted", this.highlighted);
    setHostAttribute(this, "data-disabled", this.disabled);
    setHostAttribute(this, "data-selected", this.selected);
    if (DEV && changed.has("value") && this.value === "" && this.isConnected) {
      devWarn(
        MinervaOption.tagName,
        'an option needs a non-empty "value" (the empty value means "nothing selected").',
      );
    }
  }

  protected override hookStates() {
    return {
      selected: this.selected,
      highlighted: this.highlighted,
      disabled: this.disabled,
    };
  }

  protected override render() {
    return html`<div
      part="root"
      class="item"
      ?data-selected=${this.selected}
      ?data-highlighted=${this.highlighted}
      ?data-disabled=${this.disabled}
    >
      <span class="itemText" part="label"><slot></slot></span>
      ${
        this.selected
          ? html`<span class="itemIndicator" part="indicator" aria-hidden="true"
              >${IconCheck}</span
            >`
          : nothing
      }
    </div>`;
  }
}

/**
 * Groups options of a `<minerva-select>` (`<SelectGroup>` of React,
 * `role="group"`), labelled by its `<minerva-select-label>` child.
 *
 * @summary Group of select options.
 * @tag minerva-option-group
 * @slot - A `<minerva-select-label>` and `<minerva-option>` elements
 * @csspart root - The group wrapper
 */
export class MinervaOptionGroup extends MinervaElement {
  private readonly internals = attachInternals(this);
  static override tagName = "minerva-option-group";
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
      }
    `,
  ];

  private observer: MutationObserver | null = null;

  override connectedCallback(): void {
    super.connectedCallback();
    setHostAria(this, this.internals, { role: "group" });
    this.syncLabel();
    if (typeof MutationObserver === "undefined") return;
    this.observer = new MutationObserver(() => this.syncLabel());
    this.observer.observe(this, { childList: true });
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.observer?.disconnect();
    this.observer = null;
  }

  /** Links the group to its `<minerva-select-label>` (aria-labelledby). */
  private syncLabel() {
    const label = this.querySelector<HTMLElement>(
      ":scope > minerva-select-label",
    );
    if (label) {
      let id = getHostAttribute(label, "id");
      if (!id) {
        id = `minerva-select-label-${nextLabelId++}`;
        setHostAttribute(label, "id", id, this);
      }
      setHostAttribute(this, "aria-labelledby", id);
    } else {
      setHostAttribute(this, "aria-labelledby", null);
    }
  }

  protected override render() {
    return html`<div part="root"><slot></slot></div>`;
  }
}

/**
 * The (non-selectable) heading of a `<minerva-option-group>`
 * (`<SelectLabel>` of React).
 *
 * @summary Heading of a group of select options.
 * @tag minerva-select-label
 * @slot - Label text
 * @csspart root - The label
 */
export class MinervaSelectLabel extends MinervaElement {
  static override tagName = "minerva-select-label";
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
      }
    `,
    sharedStyles(styles),
  ];

  protected override render() {
    return html`<div class="label" part="root"><slot></slot></div>`;
  }
}

/**
 * A presentational divider between select options or groups
 * (`<SelectSeparator>` of React), hidden from assistive technologies.
 *
 * @summary Divider between select options.
 * @tag minerva-select-separator
 * @csspart root - The line
 */
export class MinervaSelectSeparator extends MinervaElement {
  private readonly internals = attachInternals(this);
  static override tagName = "minerva-select-separator";
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
      }
    `,
    sharedStyles(styles),
  ];

  override connectedCallback(): void {
    super.connectedCallback();
    setHostAria(this, this.internals, { ariaHidden: "true" });
  }

  protected override render() {
    return html`<div class="separator" part="root"></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-option": MinervaOption;
    "minerva-option-group": MinervaOptionGroup;
    "minerva-select-label": MinervaSelectLabel;
    "minerva-select-separator": MinervaSelectSeparator;
  }
}
