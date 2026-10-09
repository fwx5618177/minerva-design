/** Optional Monaco entry: importing the standard Angular entry never loads Monaco. */
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  effect,
  inject,
  input,
  model,
  output,
  signal,
  viewChild,
} from "@angular/core";
import type * as Monaco from "monaco-editor";
import { injectMinerva } from "@minerva/angular";
export type MonacoModule = typeof Monaco;
export type MonacoLoader = () => Promise<MonacoModule>;
export const MONACO_ENTRY = "minerva-design/angular/monaco";

@Component({
  selector: "mn-monaco-code-editor",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-minerva": "code-editor",
    "data-part": "root",
    "[attr.data-disabled]": "disabled() ? '' : null",
    "[attr.data-loading]": "loading() ? '' : null",
  },
  template: `<span data-minerva="code-editor" data-part="label">{{
      label()
    }}</span>
    <div
      #surface
      data-minerva="code-editor"
      data-part="surface"
      [style.height]="height()"
      [hidden]="!ready()"
      [attr.aria-label]="label()"
    ></div>
    @if (!ready()) {
      <textarea
        data-minerva="code-editor"
        data-part="fallback"
        [attr.aria-label]="label()"
        [value]="value()"
        [disabled]="disabled()"
        [readOnly]="readOnly()"
        (input)="editFallback($event)"
        [style.height]="height()"
      ></textarea>
    }
    @if (loading()) {
      <span data-minerva="code-editor" data-part="loading" role="status">
        {{ loadingLabel() ?? scope.t("monacoCodeEditor.loading") }}
      </span>
    }
    @if (error()) {
      <div data-minerva="code-editor" data-part="error" role="alert">
        {{ error() }}
        <button
          type="button"
          (click)="load()"
          [attr.aria-label]="
            retryLabel() ?? scope.t('monacoCodeEditor.retryLabel')
          "
        >
          {{ retryLabel() ?? scope.t("monacoCodeEditor.retry") }}
        </button>
      </div>
    }`,
})
export class MnMonacoCodeEditor {
  readonly monaco = input<MonacoModule>();
  readonly theme = input<string>();
  readonly value = model("");
  readonly language = input("plaintext");
  readonly label = input("Code editor");
  /** Accessible status while the engine loads; defaults to the scoped locale. */
  readonly loadingLabel = input<string>();
  /** Retry action label after an engine error; defaults to the scoped locale. */
  readonly retryLabel = input<string>();
  readonly height = input("300px");
  readonly disabled = input(false);
  readonly readOnly = input(false);
  readonly options = input<Monaco.editor.IStandaloneEditorConstructionOptions>(
    {},
  );
  readonly loader = input<MonacoLoader>(() => import("monaco-editor"));
  readonly editorReady = output<Monaco.editor.IStandaloneCodeEditor>();
  readonly loadError = output<unknown>();
  protected readonly surface =
    viewChild.required<ElementRef<HTMLElement>>("surface");
  protected readonly loading = signal(true);
  protected readonly ready = signal(false);
  protected readonly error = signal("");
  private instance: Monaco.editor.IStandaloneCodeEditor | undefined;
  private engine: MonacoModule | undefined;
  protected readonly scope = injectMinerva();
  private subscription: Monaco.IDisposable | undefined;
  private generation = 0;
  private destroyed = false;
  constructor() {
    afterNextRender(() => void this.load());
    effect(() => {
      const ready = this.ready();
      const theme =
        this.theme() ??
        (this.scope.resolvedMode() === "dark" ? "vs-dark" : "vs");
      const value = this.value();
      const language = this.language();
      const ariaLabel = this.label();
      const options = this.options();
      const readOnly = this.disabled() || this.readOnly();
      if (ready && this.instance) {
        this.engine?.editor.setTheme(theme);
        if (this.instance.getValue() !== value) this.instance.setValue(value);
        this.instance.updateOptions({
          ...options,
          readOnly,
          domReadOnly: readOnly,
          ariaLabel,
        });
        const model = this.instance.getModel();
        if (model) this.engine?.editor.setModelLanguage(model, language);
      }
    });
    inject(DestroyRef).onDestroy(() => {
      this.destroyed = true;
      this.generation++;
      this.dispose();
    });
  }
  private dispose() {
    this.subscription?.dispose();
    const model = this.instance?.getModel();
    this.instance?.dispose();
    model?.dispose();
    this.instance = undefined;
    this.ready.set(false);
  }
  async load() {
    const generation = ++this.generation;
    this.dispose();
    this.loading.set(true);
    this.error.set("");
    try {
      const monaco = this.monaco() ?? (await this.loader()());
      if (this.destroyed || generation !== this.generation) return;
      this.engine = monaco;
      this.instance = monaco.editor.create(this.surface().nativeElement, {
        ...this.options(),
        value: this.value(),
        language: this.language(),
        theme:
          this.theme() ??
          (this.scope.resolvedMode() === "dark" ? "vs-dark" : "vs"),
        readOnly: this.disabled() || this.readOnly(),
        domReadOnly: this.disabled() || this.readOnly(),
        automaticLayout: true,
        ariaLabel: this.label(),
      });
      this.subscription = this.instance.onDidChangeModelContent(() => {
        if (!this.disabled() && !this.readOnly())
          this.value.set(this.instance!.getValue());
      });
      this.ready.set(true);
      this.editorReady.emit(this.instance);
    } catch (error) {
      if (this.destroyed || generation !== this.generation) return;
      this.error.set(error instanceof Error ? error.message : String(error));
      this.loadError.emit(error);
    } finally {
      if (!this.destroyed && generation === this.generation)
        this.loading.set(false);
    }
  }
  protected editFallback(event: Event) {
    if (!this.disabled() && !this.readOnly())
      this.value.set((event.target as HTMLTextAreaElement).value);
  }
}
