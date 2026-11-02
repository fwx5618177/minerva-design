import { css, html, nothing, type TemplateResult } from "lit";
import { property } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import styles from "@react-styles/components/SegmentedControl/segmentedControl.module.scss?inline";
import { getNextIndex } from "@minerva/core";
import { getDirection } from "@minerva/dom";
import { AriaController } from "../../internal/aria";
import { DEV, devWarn } from "../../internal/dev";
import {
  FormAssociatedElement,
  type ValidityResult,
} from "../../internal/form";
import { LocaleController } from "../../internal/locale";
import { hostStyles } from "../../internal/minerva-element";
import { itemParts } from "../../internal/styling-hooks";
import { sharedStyles } from "../../internal/styles";

/** Segment density */
export type SegmentedControlSize = "small" | "medium" | "large";

/** Thumb color: raised surface thumb ("neutral") or solid primary thumb */
export type SegmentedControlColor = "neutral" | "primary";

/** Content of a segment icon or label */
export type SegmentedControlContent = string | Node | TemplateResult;

/** A segment of a `<minerva-segmented-control>` */
export interface SegmentedControlOptionObject {
  /** Value of the segment */
  value: string;
  /** Visible label (default: the value, unless an icon is given) */
  label?: SegmentedControlContent;
  /** Icon shown before the label (alone for an icon-only segment) */
  icon?: SegmentedControlContent;
  /** Blocks this segment */
  disabled?: boolean;
  /** Accessible name; required for an icon-only segment */
  "aria-label"?: string;
}

/** A segment: a plain string (value and label) or an option object */
export type SegmentedControlOption = string | SegmentedControlOptionObject;

const SIZES: readonly SegmentedControlSize[] = ["small", "medium", "large"];
const COLORS: readonly SegmentedControlColor[] = ["neutral", "primary"];

/**
 * `options` attribute: a JSON array (strings and / or option objects) or
 * comma-separated values.
 */
const optionsConverter = {
  fromAttribute(value: string | null): SegmentedControlOption[] {
    const text = value?.trim() ?? "";
    if (!text) return [];
    if (text.startsWith("[")) {
      try {
        const parsed: unknown = JSON.parse(text);
        if (Array.isArray(parsed)) return parsed as SegmentedControlOption[];
      } catch {
        // falls back to comma-separated values
      }
    }
    return text
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean);
  },
};

const normalize = (
  option: SegmentedControlOption,
): SegmentedControlOptionObject =>
  typeof option === "string" ? { value: option } : option;

/**
 * A single-choice segmented switch for modes and filters
 * (`<SegmentedControl>` of React): a `radiogroup` of `radio` segments
 * sharing the width equally, with a thumb sliding under the selected
 * segment. Use `<minerva-tabs>` when each choice has a content panel.
 * Keyboard: one Tab stop (the selected segment, else the first enabled
 * one); the arrow keys move and select, skipping disabled segments and
 * wrapping (RTL-aware); Home / End select the first / last enabled segment.
 *
 * Form-associated: submits `value` under `name`, `required` makes it invalid
 * while nothing is selected, and it supports `form.reset()` (restores the
 * `value` attribute), `<fieldset disabled>` and state restoration. Name it
 * with `aria-label`, `aria-labelledby` or `<label for>`.
 *
 * @summary Single-choice segmented switch with a sliding thumb.
 * @tag minerva-segmented-control
 * @csspart root - The element with role="radiogroup" (the track)
 * @csspart indicator - The sliding thumb under the selected segment
 * @csspart item - A segment (`role=radio`)
 * @csspart item--selected - Item state of `item`: selected
 * @csspart item--disabled - Item state of `item`: disabled
 * @csspart icon - The icon of a segment
 * @csspart label - The text label of a segment
 * @fires change - The user selected another segment (like native radios)
 * @fires minerva-change - The user selected another segment; `detail: { value }`
 */
export class MinervaSegmentedControl extends FormAssociatedElement {
  static override tagName = "minerva-segmented-control";
  static override styles = [
    hostStyles,
    css`
      :host {
        display: inline-block;
        max-inline-size: 100%;
        vertical-align: middle;
      }
      :host([full-width]) {
        display: block;
      }
    `,
    sharedStyles(styles),
  ];

  /** The segments (property; the attribute takes a JSON array or comma-separated values) */
  @property({ converter: optionsConverter })
  options: SegmentedControlOption[] = [];

  /** Selected value (property; the `value` attribute sets `defaultValue`) */
  @property({ attribute: false })
  value = "";

  /** Initially selected value, restored by `form.reset()` (the `value` attribute) */
  @property({ attribute: "value" })
  defaultValue = "";

  /** Segment density */
  @property({ reflect: true })
  size: SegmentedControlSize = "medium";

  /** Thumb color */
  @property({ reflect: true })
  color: SegmentedControlColor = "neutral";

  /** Fills the width of the container (the segments always share the width equally) */
  @property({ type: Boolean, attribute: "full-width", reflect: true })
  fullWidth = false;

  private readonly locale = new LocaleController(this);
  private readonly aria = new AriaController(this, () => this.labels);
  private dirty = false;

  private get items(): SegmentedControlOptionObject[] {
    return (Array.isArray(this.options) ? this.options : []).map(normalize);
  }

  private get segments(): HTMLElement[] {
    return Array.from(
      this.renderRoot.querySelectorAll<HTMLElement>('[role="radio"]'),
    );
  }

  /** Focuses the selected segment (else the first enabled one) */
  override focus(options?: FocusOptions): void {
    this.renderRoot
      .querySelector<HTMLElement>('[role="radio"][tabindex="0"]')
      ?.focus(options);
  }

  protected getFormValue(): string | null {
    return this.value === "" ? null : this.value;
  }

  protected override getValidity(): ValidityResult {
    if (this.required && this.value === "") {
      return {
        flags: { valueMissing: true },
        message: this.locale.t("validation.radioMissing"),
        anchor: this.segments[0] ?? null,
      };
    }
    return { flags: {}, message: "" };
  }

  protected resetFormValue(): void {
    this.dirty = false;
    this.value = this.defaultValue;
  }

  protected override restoreFormState(state: unknown): void {
    if (typeof state === "string") this.value = state;
    else if (state === null) this.value = "";
  }

  protected override willUpdate(changed: Map<PropertyKey, unknown>): void {
    // first update: a value set before connecting wins over the default
    // unless the value attribute is present
    if (
      changed.has("defaultValue") &&
      !this.dirty &&
      (this.hasUpdated || this.hasAttribute("value"))
    ) {
      this.value = this.defaultValue;
    }
    if (
      DEV &&
      (changed.has("value") || changed.has("options")) &&
      this.value !== "" &&
      this.items.length > 0 &&
      !this.items.some((item) => item.value === this.value)
    ) {
      devWarn(
        MinervaSegmentedControl.tagName,
        `value "${this.value}" matches no option: nothing is selected.`,
      );
    }
  }

  private isItemDisabled(index: number): boolean {
    return this.isDisabled || Boolean(this.items[index]?.disabled);
  }

  private select(index: number) {
    if (this.isItemDisabled(index)) return;
    const next = this.items[index]!.value;
    if (next === this.value) return;
    this.dirty = true;
    this.value = next;
    this.dispatchEvent(new Event("change", { bubbles: true }));
    this.emit("minerva-change", { value: next });
  }

  private handleKeyDown(event: KeyboardEvent, index: number) {
    if (this.isDisabled) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (!event.repeat) this.select(index);
      return;
    }
    const next = getNextIndex({
      currentIndex: index,
      count: this.items.length,
      key: event.key,
      orientation: "both",
      dir: getDirection(this),
      isDisabled: (i) => this.isItemDisabled(i),
    });
    if (next === null) return;
    event.preventDefault();
    this.select(next);
    this.segments[next]?.focus();
  }

  protected override hookStates() {
    return {
      disabled: this.isDisabled,
      size: SIZES.includes(this.size) ? this.size : "medium",
      color: COLORS.includes(this.color) ? this.color : "neutral",
    };
  }

  protected override render() {
    const items = this.items;
    const disabled = this.isDisabled;
    const { size, color } = this.hookStates();
    const selectedIndex = items.findIndex((item) => item.value === this.value);
    const tabStop =
      selectedIndex >= 0 && !this.isItemDisabled(selectedIndex)
        ? selectedIndex
        : items.findIndex((_, index) => !this.isItemDisabled(index));
    const classes = [
      "segmentedControl",
      size,
      color,
      this.fullWidth ? "fullWidth" : "",
      disabled ? "disabled" : "",
    ]
      .filter(Boolean)
      .join(" ");

    return html`<div
      part="root"
      role="radiogroup"
      class=${classes}
      aria-label=${this.aria.label ?? nothing}
      aria-description=${this.aria.description ?? nothing}
      aria-required=${this.required ? "true" : nothing}
      aria-disabled=${disabled ? "true" : nothing}
      style=${styleMap({
        "--_segmented-control-count": String(Math.max(items.length, 1)),
        "--_segmented-control-index": String(Math.max(selectedIndex, 0)),
      })}
    >
      <span
        part="indicator"
        class="indicator"
        ?hidden=${selectedIndex < 0}
        aria-hidden="true"
      ></span>
      ${items.map((item, index) => {
        const states = {
          selected: index === selectedIndex,
          disabled: this.isItemDisabled(index),
        };
        const hasIcon = item.icon !== undefined && item.icon !== null;
        const label = item.label ?? (hasIcon ? undefined : item.value);
        return html`<div
          role="radio"
          part=${itemParts("item", states)}
          class="item"
          data-value=${item.value}
          aria-checked=${String(states.selected)}
          aria-disabled=${states.disabled ? "true" : nothing}
          aria-label=${item["aria-label"] ?? nothing}
          tabindex=${!disabled && index === tabStop ? "0" : "-1"}
          @click=${() => this.select(index)}
          @keydown=${(event: KeyboardEvent) => this.handleKeyDown(event, index)}
        >
          ${
            hasIcon
              ? html`<span part="icon" class="icon" aria-hidden="true"
                  >${item.icon}</span
                >`
              : nothing
          }${
            label !== undefined && label !== null
              ? html`<span part="label" class="label">${label}</span>`
              : nothing
          }
        </div>`;
      })}
    </div>`;
  }
}
