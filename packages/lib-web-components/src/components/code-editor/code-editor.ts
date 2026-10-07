import { css, html, nothing, type PropertyValues } from "lit";
import { property, query, state } from "lit/decorators.js";
import { live } from "lit/directives/live.js";
import { styleMap } from "lit/directives/style-map.js";
import styles from "@lib-core-styles/components/MonacoCodeEditor/monacoCodeEditor.module.scss?inline";
import { DEV, devWarn } from "../../internal/dev";
import { closestComposed } from "../../internal/dom";
import {
  FormAssociatedElement,
  type ValidityResult,
} from "../../internal/form";
import { IconRotateCw } from "../../internal/icons";
import { LocaleController } from "../../internal/locale";
import { hostStyles } from "../../internal/minerva-element";
import { MinervaButton } from "../button/button";
import { MinervaProgress } from "../progress/progress";
import { sharedStyles } from "../../internal/styles";

/** Color theme of the editor */
export type CodeEditorTheme = "light" | "dark";

/** Subscription returned by the engine's events. */
export interface CodeEditorDisposable {
  dispose(): void;
}

/** A text range (Monaco's `IRange`). */
export interface CodeEditorRange {
  startLineNumber: number;
  startColumn: number;
  endLineNumber: number;
  endColumn: number;
}

/**
 * The editor instance created by the engine (the subset of Monaco's
 * `IStandaloneCodeEditor` the element uses).
 */
export interface CodeEditorInstance {
  getValue(): string;
  setValue(value: string): void;
  getModel(): { getFullModelRange(): CodeEditorRange } | null;
  executeEdits(
    source: string,
    edits: Array<{
      range: CodeEditorRange;
      text: string | null;
      forceMoveMarkers?: boolean;
    }>,
  ): boolean;
  pushUndoStop(): boolean;
  updateOptions(options: Record<string, unknown>): void;
  onDidChangeModelContent(listener: () => void): CodeEditorDisposable;
  onDidBlurEditorText(listener: () => void): CodeEditorDisposable;
  focus(): void;
  dispose(): void;
}

/**
 * A local Monaco engine: `import * as monaco from "monaco-editor"` (the
 * subset of its API the element uses, so the published types do not depend
 * on `monaco-editor`).
 */
export interface CodeEditorEngine {
  editor: {
    create(
      container: HTMLElement,
      options?: Record<string, unknown>,
    ): CodeEditorInstance;
    setTheme(theme: string): void;
    setModelLanguage(model: unknown, languageId: string): void;
  };
}

type Status = "loading" | "mounted" | "error";

const positive = (value: number, fallback: number) =>
  Number.isFinite(value) && value > 0 ? value : fallback;

const asMode = (
  value: string | null | undefined,
): CodeEditorTheme | undefined =>
  value === "dark" || value === "github-dark"
    ? "dark"
    : value === "light"
      ? "light"
      : undefined;

const isEngine = (engine: unknown): engine is CodeEditorEngine =>
  typeof (engine as CodeEditorEngine | undefined)?.editor?.create ===
  "function";

/** One document-wide observer of `data-theme` changes (theme scopes). */
const themeListeners = new Set<() => void>();
let themeObserver: MutationObserver | null = null;
function onThemeChange(listener: () => void): () => void {
  themeListeners.add(listener);
  if (!themeObserver && typeof MutationObserver !== "undefined") {
    themeObserver = new MutationObserver(() => {
      for (const notify of [...themeListeners]) notify();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
      subtree: true,
    });
  }
  return () => {
    themeListeners.delete(listener);
    if (themeListeners.size === 0) {
      themeObserver?.disconnect();
      themeObserver = null;
    }
  };
}

/**
 * A labelled Monaco code editor running on a local engine (never loaded
 * from a CDN), following the theme of its scope (lib-core's
 * `MonacoCodeEditor`, published from `@minerva/lib-core/monaco`). When the
 * engine is missing, cannot create the editor in time (`load-timeout`) or
 * throws, it degrades to an editable `<textarea>` with a Retry button.
 *
 * Published as the optional entry `@minerva/lib-web-components/code-editor`
 * (not part of the all-in-one entry nor the CDN bundle): it requires the
 * optional peer dependency `monaco-editor`. Pass the engine as a property:
 * `editor.monaco = monaco` (`import * as monaco from "monaco-editor"`; one
 * engine per application, configure its workers in the host). Until it is
 * set the element shows its loading state; without it after `load-timeout`
 * it falls back to the textarea, and setting it later loads the editor.
 *
 * Monaco renders into a light DOM child (`<div slot="editor">`, created by
 * the element) so the stylesheets Monaco injects into the document apply.
 *
 * Theme: the `theme` attribute, else the closest `data-theme` (a
 * `<minerva-config>` scope, then `<html>`), followed live. Monaco themes are
 * global to the engine (as with lib-core): the last editor to apply its
 * theme wins for all editors of the page.
 *
 * Form-associated: submits `value` under `name`, supports `required`,
 * `form.reset()` (back to the `value` attribute) and `<fieldset disabled>`.
 *
 * @summary Monaco code editor (local engine) with theme sync and a textarea fallback.
 * @tag minerva-code-editor
 * @slot editor - Created by the element: the light DOM container Monaco renders into
 * @csspart base - The `role="group"` root
 * @csspart label - The visible label
 * @csspart surface - The editor surface (sized by `height`)
 * @csspart fallback - The fallback `<textarea>`
 * @csspart retry-button - The Retry `<minerva-button>`
 * @fires input - The value changed (each edit; composed)
 * @fires change - The value was committed (the editor lost focus after an edit)
 * @fires minerva-input - Same as `input`, with `detail: { value }` (lib-core's `onChange`)
 * @fires minerva-change - Same as `change`, with `detail: { value }`
 * @fires minerva-error - The editor became unavailable and the textarea fallback is shown
 */
export class MinervaCodeEditor extends FormAssociatedElement {
  static override tagName = "minerva-code-editor";
  static override dependencies = [MinervaButton, MinervaProgress];
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
        min-width: 0;
      }
      ::slotted([slot="editor"]) {
        flex: 1;
        min-height: 0;
        width: 100%;
      }
      .label {
        cursor: default;
      }
    `,
    sharedStyles(styles),
  ];

  /**
   * Local Monaco engine (`import * as monaco from "monaco-editor"`); never
   * loaded from a CDN
   */
  @property({ attribute: false })
  monaco?: CodeEditorEngine;

  /** Source text (property; the `value` attribute sets `defaultValue`) */
  @property({ attribute: false })
  value = "";

  /** Initial source text, restored by `form.reset()` (the `value` attribute) */
  @property({ attribute: "value" })
  defaultValue = "";

  /** Monaco language id */
  @property({ reflect: true })
  language = "plaintext";

  /** Visible label, also the accessible name of the editor */
  @property()
  label = "";

  /** Height of the editor in pixels, clamped to [min-height, max-height] */
  @property({ type: Number })
  height = 420;

  /** Minimum height in pixels */
  @property({ type: Number, attribute: "min-height" })
  minHeight = 160;

  /** Maximum height in pixels */
  @property({ type: Number, attribute: "max-height" })
  maxHeight = 800;

  /** Color theme; defaults to the theme of the element's scope */
  @property({ reflect: true })
  theme?: CodeEditorTheme;

  /**
   * Milliseconds to wait for the engine and the editor before showing the
   * textarea fallback
   */
  @property({ type: Number, attribute: "load-timeout" })
  loadTimeout = 10000;

  /** Message shown above the fallback (default: localized "The editor is unavailable") */
  @property({ attribute: "unavailable-text" })
  unavailableText?: string;

  /** Text of the retry button (default: localized "Retry") */
  @property({ attribute: "retry-text" })
  retryText?: string;

  /** Accessible label of the retry button (default: localized "Retry editor") */
  @property({ attribute: "retry-label" })
  retryLabel?: string;

  /** Accessible label of the loading indicator (default: localized "Loading editor") */
  @property({ attribute: "loading-label" })
  loadingLabel?: string;

  @state()
  private status: Status = "loading";

  /** Theme of the element's scope (when `theme` is not set) */
  @state()
  private scopeTheme: CodeEditorTheme = "light";

  @query("textarea")
  private fallback?: HTMLTextAreaElement;

  private readonly locale = new LocaleController(this);
  private editor: CodeEditorInstance | null = null;
  private engine: CodeEditorEngine | null = null;
  private container: HTMLElement | null = null;
  private subscriptions: CodeEditorDisposable[] = [];
  private timer: ReturnType<typeof setTimeout> | undefined;
  /** Value written into the editor by the element (not a user edit) */
  private applying = false;
  /** An edit happened since the last `change` */
  private edited = false;
  private dirty = false;
  private unobserveTheme: (() => void) | null = null;
  /** The first load ran (after the first render) */
  private started = false;

  /** Theme actually applied: `theme`, else the scope's. */
  get resolvedTheme(): CodeEditorTheme {
    return this.theme === "dark" || this.theme === "light"
      ? this.theme
      : this.scopeTheme;
  }

  override focus(options?: FocusOptions): void {
    if (this.editor) this.editor.focus();
    else this.fallback?.focus(options);
  }

  /** Tries to load the editor again (what the Retry button does). */
  retry(): void {
    this.load();
  }

  protected getFormValue(): string {
    return this.value;
  }

  protected override getValidity(): ValidityResult {
    return this.required && !this.value
      ? {
          flags: { valueMissing: true },
          message: this.locale.t("validation.valueMissing"),
          anchor: this.fallback ?? null,
        }
      : { flags: {}, message: "" };
  }

  protected resetFormValue(): void {
    this.dirty = false;
    this.value = this.defaultValue;
  }

  protected override restoreFormState(state: unknown): void {
    if (typeof state === "string") this.value = state;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.syncScopeTheme();
    this.unobserveTheme = onThemeChange(() => this.syncScopeTheme());
    if (this.started) this.load();
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.unobserveTheme?.();
    this.unobserveTheme = null;
    this.teardown();
  }

  private syncScopeTheme() {
    const owner = closestComposed(this, "[data-theme]");
    this.scopeTheme = asMode(owner?.getAttribute("data-theme")) ?? "light";
  }

  private get monacoTheme(): string {
    return this.resolvedTheme === "dark" ? "vs-dark" : "vs";
  }

  /** Disposes the editor and its light DOM container. */
  private teardown() {
    clearTimeout(this.timer);
    this.timer = undefined;
    for (const subscription of this.subscriptions) subscription.dispose();
    this.subscriptions = [];
    try {
      this.editor?.dispose();
    } catch {
      // a broken engine must not break the element
    }
    this.editor = null;
    this.engine = null;
    this.container?.remove();
    this.container = null;
  }

  private fail() {
    const wasError = this.status === "error";
    this.teardown();
    this.status = "error";
    if (!wasError) this.emit("minerva-error");
  }

  /** (Re)starts loading: waits up to `load-timeout` for an engine. */
  private load() {
    this.teardown();
    this.status = "loading";
    if (!this.isConnected) return;
    this.timer = setTimeout(() => this.fail(), this.loadTimeout);
    if (this.monaco !== undefined) this.mount();
  }

  /** Creates the editor with the current engine (synchronously). */
  private mount() {
    const engine = this.monaco;
    if (!isEngine(engine)) {
      if (DEV) {
        devWarn(
          MinervaCodeEditor.tagName,
          '`monaco` is not a Monaco engine (expected `import * as monaco from "monaco-editor"`); showing the textarea fallback.',
        );
      }
      this.fail();
      return;
    }
    const container = document.createElement("div");
    container.slot = "editor";
    container.setAttribute("data-minerva-code-editor", "");
    this.append(container);
    this.container = container;
    try {
      engine.editor.setTheme(this.monacoTheme);
      const editor = engine.editor.create(container, {
        value: this.value,
        language: this.language,
        theme: this.monacoTheme,
        readOnly: this.isDisabled,
        domReadOnly: this.isDisabled,
        ariaLabel: this.label,
        automaticLayout: true,
        minimap: { enabled: false },
        wordWrap: "on",
        scrollBeyondLastLine: false,
      });
      this.editor = editor;
      this.engine = engine;
      this.subscriptions.push(
        editor.onDidChangeModelContent(() => this.handleEdit()),
        editor.onDidBlurEditorText(() => this.commit()),
      );
    } catch {
      this.fail();
      return;
    }
    clearTimeout(this.timer);
    this.timer = undefined;
    this.status = "mounted";
  }

  private handleEdit() {
    const editor = this.editor;
    if (!editor || this.applying) return;
    if (this.isDisabled) return;
    this.value = editor.getValue();
    this.dirty = true;
    this.edited = true;
    this.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
    this.emit("minerva-input", { value: this.value });
  }

  private commit() {
    if (!this.edited) return;
    this.edited = false;
    this.dispatchEvent(new Event("change", { bubbles: true }));
    this.emit("minerva-change", { value: this.value });
  }

  private handleFallbackInput(event: Event) {
    if (this.isDisabled) return;
    this.value = (event.target as HTMLTextAreaElement).value;
    this.dirty = true;
    this.edited = true;
    this.emit("minerva-input", { value: this.value });
  }

  /** Writes an external `value` into the editor, keeping undo history. */
  private applyValue() {
    const editor = this.editor;
    if (!editor || editor.getValue() === this.value) return;
    this.applying = true;
    try {
      const model = editor.getModel();
      if (this.isDisabled || !model) {
        editor.setValue(this.value);
      } else {
        editor.executeEdits("", [
          {
            range: model.getFullModelRange(),
            text: this.value,
            forceMoveMarkers: true,
          },
        ]);
        editor.pushUndoStop();
      }
    } finally {
      this.applying = false;
    }
  }

  protected override willUpdate(changed: PropertyValues<this>): void {
    if (changed.has("value") && changed.get("value") !== undefined) {
      this.dirty = this.value !== this.defaultValue || this.dirty;
    }
    if (
      changed.has("defaultValue") &&
      !this.dirty &&
      (this.hasUpdated || this.hasAttribute("value"))
    ) {
      this.value = this.defaultValue;
    }
  }

  protected override updated(changed: PropertyValues<this>): void {
    super.updated(changed);
    if (!this.started) {
      this.started = true;
      if (DEV && !this.label) {
        devWarn(
          MinervaCodeEditor.tagName,
          "set label: it is the visible label and the accessible name of the editor.",
        );
      }
      this.load();
      return;
    }
    if (changed.has("monaco") && changed.get("monaco") !== undefined) {
      this.load();
      return;
    }
    if (changed.has("monaco") && this.monaco !== undefined && !this.editor) {
      if (this.status === "loading" && this.timer !== undefined) this.mount();
      else if (this.status === "error") this.load();
    }
    const editor = this.editor;
    const engine = this.engine;
    if (!editor || !engine) return;
    try {
      if (changed.has("value")) this.applyValue();
      if (changed.has("language")) {
        engine.editor.setModelLanguage(editor.getModel(), this.language);
      }
      if (
        changed.has("disabled") ||
        (changed as Map<PropertyKey, unknown>).has("formDisabled") ||
        changed.has("label")
      ) {
        editor.updateOptions({
          readOnly: this.isDisabled,
          domReadOnly: this.isDisabled,
          ariaLabel: this.label,
        });
      }
      if (
        changed.has("theme") ||
        (changed as Map<PropertyKey, unknown>).has("scopeTheme")
      ) {
        engine.editor.setTheme(this.monacoTheme);
      }
    } catch {
      this.fail();
    }
  }

  protected override render() {
    const minimum = positive(this.minHeight, 160);
    const maximum = Math.max(minimum, positive(this.maxHeight, 800));
    const height = Math.min(
      maximum,
      Math.max(minimum, positive(this.height, 420)),
    );
    const t = this.locale.t;
    const status = this.status;
    return html`<div
      part="base"
      class="root"
      role="group"
      aria-label=${this.label || nothing}
    >
      <label
        part="label"
        class="label"
        for=${status === "error" ? "fallback" : nothing}
        @click=${() => this.editor?.focus()}
        >${this.label}</label
      >
      <div
        part="surface"
        class="surface"
        style=${styleMap({ height: `${height}px` })}
        aria-busy=${status === "loading" ? "true" : "false"}
      >
        ${
          status === "error"
            ? html`<div class="error">
                  <div class="message" role="alert">
                    ${this.unavailableText ?? t("monacoCodeEditor.unavailable")}
                  </div>
                  <minerva-button
                    part="retry-button"
                    color="neutral"
                    variant="outline"
                    size="small"
                    aria-label=${this.retryLabel ?? t("monacoCodeEditor.retryLabel")}
                    @click=${() => this.retry()}
                  >
                    <span slot="start" class="retryIcon" aria-hidden="true"
                      >${IconRotateCw}</span
                    >
                    ${this.retryText ?? t("monacoCodeEditor.retry")}
                  </minerva-button>
                </div>
                <textarea
                  id="fallback"
                  part="fallback"
                  class="fallback"
                  aria-label=${this.label || nothing}
                  spellcheck="false"
                  .value=${live(this.value)}
                  ?disabled=${this.isDisabled}
                  @input=${this.handleFallbackInput}
                  @change=${() => this.commit()}
                ></textarea>`
            : html`${
                  status === "loading"
                    ? html`<div class="loading" role="status">
                        <minerva-progress
                          size="small"
                          aria-label=${this.loadingLabel ?? t("monacoCodeEditor.loading")}
                        ></minerva-progress>
                      </div>`
                    : nothing
                }<slot name="editor"></slot>`
        }
      </div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-code-editor": MinervaCodeEditor;
  }
}
