import { css, html, nothing, unsafeCSS, type PropertyValues } from "lit";
import { property } from "lit/decorators.js";
import styles from "@lib-core-styles/components/Select/select.module.scss?inline";
import { DEV, devWarn } from "../../internal/dev";
import { IconCheck } from "../../internal/icons";
import { MinervaElement, hostStyles } from "../../internal/minerva-element";

let nextLabelId = 0;

/**
 * An option of a `<minerva-select>` (`<SelectItem>` of lib-core). The
 * element itself is the `role="option"` (it receives focus while the
 * listbox is open); its content is the option's label.
 *
 * @summary Selectable option of a select.
 * @tag minerva-option
 * @slot - Content of the option (text, icon...)
 * @csspart base - The option row
 * @csspart label - The content wrapper
 * @csspart indicator - The check mark of the selected option
 */
export class MinervaOption extends MinervaElement {
  static override tagName = "minerva-option";
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
        outline: none;
      }
    `,
    unsafeCSS(styles),
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
    this.setAttribute("role", "option");
    this.tabIndex = -1;
  }

  protected override updated(changed: PropertyValues<this>): void {
    super.updated(changed);
    this.setAttribute("aria-selected", String(this.selected));
    this.toggleAttribute("data-highlighted", this.highlighted);
    this.toggleAttribute("data-disabled", this.disabled);
    this.dataset.state = this.selected ? "checked" : "unchecked";
    if (this.disabled) this.setAttribute("aria-disabled", "true");
    else this.removeAttribute("aria-disabled");
    if (DEV && changed.has("value") && this.value === "" && this.isConnected) {
      devWarn(
        MinervaOption.tagName,
        'an option needs a non-empty "value" (the empty value means "nothing selected").',
      );
    }
  }

  protected override render() {
    return html`<div
      part="base"
      class="item"
      data-state=${this.selected ? "checked" : "unchecked"}
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
 * Groups options of a `<minerva-select>` (`<SelectGroup>` of lib-core,
 * `role="group"`), labelled by its `<minerva-select-label>` child.
 *
 * @summary Group of select options.
 * @tag minerva-option-group
 * @slot - A `<minerva-select-label>` and `<minerva-option>` elements
 */
export class MinervaOptionGroup extends MinervaElement {
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
    this.setAttribute("role", "group");
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
      if (!label.id) label.id = `minerva-select-label-${nextLabelId++}`;
      this.setAttribute("aria-labelledby", label.id);
    } else {
      this.removeAttribute("aria-labelledby");
    }
  }

  protected override render() {
    return html`<slot></slot>`;
  }
}

/**
 * The (non-selectable) heading of a `<minerva-option-group>`
 * (`<SelectLabel>` of lib-core).
 *
 * @summary Heading of a group of select options.
 * @tag minerva-select-label
 * @slot - Label text
 * @csspart base - The label
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
    unsafeCSS(styles),
  ];

  protected override render() {
    return html`<div class="label" part="base"><slot></slot></div>`;
  }
}

/**
 * A presentational divider between select options or groups
 * (`<SelectSeparator>` of lib-core), hidden from assistive technologies.
 *
 * @summary Divider between select options.
 * @tag minerva-select-separator
 * @csspart base - The line
 */
export class MinervaSelectSeparator extends MinervaElement {
  static override tagName = "minerva-select-separator";
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
      }
    `,
    unsafeCSS(styles),
  ];

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute("aria-hidden", "true");
  }

  protected override render() {
    return html`<div class="separator" part="base"></div>`;
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
