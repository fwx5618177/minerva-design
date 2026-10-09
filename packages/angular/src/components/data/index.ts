import { NgTemplateOutlet } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  SecurityContext,
  TemplateRef,
  booleanAttribute,
  computed,
  contentChild,
  inject,
  input,
  model,
  output,
  signal,
} from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import {
  addDays,
  dayKey,
  getVirtualRange,
  monthStart,
  sameMonth,
} from "@minerva/core";
import { MnHook } from "../../internal/hooks";
import {
  MnFormValueControl,
  provideValueAccessor,
  injectFormField,
  fieldWiring,
} from "../../internal/forms";
import { injectId } from "../../internal/ids";
import * as styles from "../../internal/styles";

@Component({
  selector: "mn-json-field",
  providers: [provideValueAccessor(() => MnJsonField)],
  imports: [MnHook],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-minerva": "json-field",
    "data-part": "root",
    "[attr.data-disabled]": "field.disabled() ? '' : null",
    "[attr.data-readonly]": "field.readOnly() ? '' : null",
    "[attr.data-required]": "field.required() ? '' : null",
    "[attr.data-invalid]": "field.invalid() ? '' : null",
    "[class]": "s.root",
  },
  template: `<div mnHook="json-field" mnPart="toolbar" [class]="s.toolbar">
      <button
        type="button"
        [disabled]="
          field.disabled() || field.readOnly() || invalid() || !value().trim()
        "
        (click)="format()"
      >
        Format JSON
      </button>
    </div>
    <textarea
      [id]="field.id()"
      [attr.aria-label]="fieldContext ? null : label()"
      [attr.aria-describedby]="field.describedBy()"
      [attr.aria-invalid]="field.invalid()"
      [value]="value()"
      [rows]="rows()"
      [disabled]="field.disabled()"
      [readOnly]="field.readOnly()"
      [required]="field.required()"
      spellcheck="false"
      [class]="s.textarea"
      (input)="update($event)"
      (blur)="notifyTouched()"
    ></textarea
    ><span
      mnHook="json-field"
      mnPart="status"
      role="status"
      [id]="field.id() + '-status'"
      [class]="s.status"
      >{{ message() }}</span
    >`,
})
export class MnJsonField extends MnFormValueControl<string> {
  readonly value = model("");
  readonly label = input("JSON");
  readonly rows = input(8);
  readonly indent = input(2);
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly readOnly = input(false, { transform: booleanAttribute });
  readonly required = input(false, { transform: booleanAttribute });
  readonly id = input<string>();
  protected readonly generatedId = injectId("json");
  protected readonly fieldContext = injectFormField();
  protected readonly field = fieldWiring(this.fieldContext, {
    id: () => this.id() ?? this.fieldContext?.id() ?? this.generatedId,
    describedBy: () =>
      `${this.id() ?? this.fieldContext?.id() ?? this.generatedId}-status`,
    disabled: () => this.disabled() || this.formDisabled(),
    readOnly: () => this.readOnly(),
    required: () => this.required(),
    invalid: () => this.invalid() || this.controlInvalid(),
  });
  override writeValue(value: string | null | undefined): void {
    this.value.set(value == null ? "" : String(value));
  }
  protected commit(value: string) {
    this.value.set(value);
    this.notifyChange(value);
  }
  protected readonly s = styles.jsonFieldStyles;
  protected readonly message = computed(() => {
    if (!this.value().trim())
      return this.field.required() ? "JSON is required" : "";
    try {
      JSON.parse(this.value());
      return "Valid JSON";
    } catch (e) {
      return e instanceof Error ? e.message : "Invalid JSON";
    }
  });
  readonly invalid = computed(
    () => !!this.message() && this.message() !== "Valid JSON",
  );
  protected update(e: Event) {
    if (!this.field.disabled() && !this.field.readOnly())
      this.commit((e.target as HTMLTextAreaElement).value);
  }
  format() {
    if (
      !this.field.disabled() &&
      !this.field.readOnly() &&
      !this.invalid() &&
      this.value().trim()
    )
      this.commit(formatJsonText(this.value(), this.indent()));
  }
}
export interface KeyValueEntry {
  key: string;
  value: string;
}
@Component({
  selector: "mn-key-value-editor",
  providers: [provideValueAccessor(() => MnKeyValueEditor)],
  imports: [MnHook],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-minerva": "key-value-editor",
    "data-part": "root",
    "[attr.data-disabled]": "field.disabled() ? '' : null",
    "[class]": "s.root",
  },
  template: `@for (entry of value(); track $index) {
      <div
        mnHook="key-value-editor"
        mnPart="row"
        [mnStates]="{ invalid: duplicate(entry.key) }"
        [class]="s.row"
      >
        <input
          [attr.aria-label]="'Key ' + ($index + 1)"
          [attr.aria-invalid]="duplicate(entry.key) || field.invalid()"
          [value]="entry.key"
          [disabled]="field.disabled()"
          (input)="edit($index, 'key', $event)"
          [attr.id]="$index === 0 ? field.id() : null"
          [attr.aria-describedby]="field.describedBy()"
          [readOnly]="field.readOnly()"
          (blur)="notifyTouched()"
        /><input
          [attr.aria-label]="'Value ' + ($index + 1)"
          [value]="entry.value"
          [disabled]="field.disabled()"
          (input)="edit($index, 'value', $event)"
          [readOnly]="field.readOnly()"
          (blur)="notifyTouched()"
        /><button
          type="button"
          [attr.aria-label]="'Remove row ' + ($index + 1)"
          [disabled]="field.disabled() || field.readOnly()"
          (click)="remove($index)"
        >
          ×
        </button>
      </div>
    }
    <button
      type="button"
      [disabled]="field.disabled() || field.readOnly()"
      (click)="add()"
    >
      Add row
    </button>`,
})
export class MnKeyValueEditor extends MnFormValueControl<
  readonly KeyValueEntry[]
> {
  readonly value = model<readonly KeyValueEntry[]>([]);
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly readOnly = input(false, { transform: booleanAttribute });
  protected readonly fieldContext = injectFormField();
  protected readonly field = fieldWiring(this.fieldContext, {
    disabled: () => this.disabled() || this.formDisabled(),
    readOnly: () => this.readOnly(),
    invalid: () => this.controlInvalid(),
  });
  override writeValue(
    value: readonly KeyValueEntry[] | null | undefined,
  ): void {
    this.value.set(
      Array.isArray(value) ? value.map((row) => ({ ...row })) : [],
    );
  }
  protected commit(value: readonly KeyValueEntry[]) {
    this.value.set(value);
    this.notifyChange(value);
  }
  protected readonly s = styles.keyValueEditorStyles;
  protected duplicate(key: string) {
    return !!key && this.value().filter((e) => e.key === key).length > 1;
  }
  protected edit(index: number, key: keyof KeyValueEntry, event: Event) {
    if (!this.field.disabled() && !this.field.readOnly())
      this.commit(
        this.value().map((row, i) =>
          i === index
            ? { ...row, [key]: (event.target as HTMLInputElement).value }
            : row,
        ),
      );
  }
  add() {
    if (!this.field.disabled() && !this.field.readOnly())
      this.commit([...this.value(), { key: "", value: "" }]);
  }
  remove(index: number) {
    if (!this.field.disabled() && !this.field.readOnly())
      this.commit(this.value().filter((_, i) => i !== index));
  }
}
@Component({
  selector: "mn-code-block",
  imports: [MnHook],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-minerva": "code-block",
    "data-part": "root",
    "[class]": "s.root",
  },
  template: `<pre
      mnHook="code-block"
      mnPart="region"
      tabindex="0"
      [attr.aria-label]="label()"
      [class]="s.codeBlock"
    ><code mnHook="code-block" mnPart="code" [attr.data-language]="language()">{{code()}}</code></pre>
    @if (copyable()) {
      <button
        type="button"
        [attr.aria-label]="copied() ? 'Copied' : 'Copy code'"
        (click)="copy()"
      >
        {{ copied() ? "Copied" : "Copy" }}
      </button>
    }
    <span role="status">{{ error() }}</span>`,
})
export class MnCodeBlock {
  readonly code = input("");
  readonly language = input("text");
  readonly label = input("Code");
  readonly copyable = input(false, { transform: booleanAttribute });
  readonly copyError = output<unknown>();
  protected readonly copied = signal(false);
  protected readonly error = signal("");
  protected readonly s = styles.codeBlockStyles;
  async copy() {
    try {
      await navigator.clipboard.writeText(this.code());
      this.copied.set(true);
      this.error.set("");
    } catch (e) {
      this.error.set("Unable to copy code");
      this.copyError.emit(e);
    }
  }
}
@Component({
  selector: "mn-html-preview",
  imports: [MnHook],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-minerva": "html-preview",
    "data-part": "root",
    "[class]": "s.preview",
  },
  template: `<iframe
    mnHook="html-preview"
    mnPart="frame"
    srcdoc="<!doctype html>"
    sandbox=""
    referrerpolicy="no-referrer"
    [title]="title()"
    [srcdoc]="document()"
    [class]="s.frame"
    [style.width]="viewport() === 'mobile' ? mobileWidth() + 'px' : '100%'"
    [style.height.px]="height()"
  ></iframe>`,
})
export class MnHtmlPreview {
  readonly html = input("");
  readonly title = input("HTML preview");
  readonly viewport = input<"desktop" | "mobile">("desktop");
  readonly mobileWidth = input(375);
  readonly height = input(600);
  protected readonly s = styles.htmlPreviewStyles;
  private readonly sanitizer = inject(DomSanitizer);
  protected readonly document = computed(() =>
    this.sanitizer.bypassSecurityTrustHtml(
      "<!doctype html><html><head><meta http-equiv=\"Content-Security-Policy\" content=\"default-src 'none'; img-src data:; style-src 'unsafe-inline'; form-action 'none'; base-uri 'none'\"></head><body>" +
        (this.sanitizer.sanitize(SecurityContext.HTML, this.html()) ?? "") +
        "</body></html>",
    ),
  );
}
export interface VirtualItemContext {
  $implicit: unknown;
  index: number;
}
@Component({
  selector: "mn-virtual-list",
  imports: [MnHook, NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-minerva": "virtual-list",
    "data-part": "root",
    "[attr.data-loading]": "loading() ? '' : null",
    "[attr.aria-busy]": "loading()",
    "[class]": "s.virtualList",
    "[style.height.px]": "height()",
    "style.overflow": "auto",
    "(scroll)": "scroll($event)",
  },
  template: `<div
      mnHook="virtual-list"
      mnPart="list"
      role="list"
      [attr.aria-label]="label()"
      [class]="s.virtualListContent"
      [style.height.px]="items().length * itemHeight()"
      style="position:relative"
    >
      @for (item of visible(); track $index) {
        <div
          mnHook="virtual-list"
          mnPart="item"
          role="listitem"
          [attr.aria-setsize]="items().length"
          [attr.aria-posinset]="range().start + $index + 1"
          [class]="s.virtualListItem"
          style="position:absolute;width:100%"
          [style.top.px]="(range().start + $index) * itemHeight()"
          [style.height.px]="itemHeight()"
        >
          @if (itemTemplate(); as tpl) {
            <ng-container
              [ngTemplateOutlet]="tpl"
              [ngTemplateOutletContext]="{
                $implicit: item,
                index: range().start + $index,
              }"
            />
          } @else {
            {{ displayWith()(item) }}
          }
        </div>
      }
    </div>
    @if (loading()) {
      <div
        mnHook="virtual-list"
        mnPart="loading"
        role="status"
        [class]="s.loadingWrapper"
      >
        Loading…
      </div>
    }`,
})
export class MnVirtualList {
  readonly items = input<readonly unknown[]>([]);
  readonly itemHeight = input(40);
  readonly height = input(300);
  readonly overscan = input(3);
  readonly label = input("Items");
  readonly loading = input(false, { transform: booleanAttribute });
  readonly displayWith = input<(item: unknown) => string>(String);
  protected readonly itemTemplate =
    contentChild<TemplateRef<VirtualItemContext>>(TemplateRef);
  protected readonly offset = signal(0);
  protected readonly s = styles.virtualListStyles;
  protected readonly range = computed(() =>
    getVirtualRange({
      scrollTop: this.offset(),
      viewportHeight: this.height(),
      itemHeight: this.itemHeight(),
      itemCount: this.items().length,
      overscan: this.overscan(),
    }),
  );
  protected readonly visible = computed(() =>
    this.items().slice(this.range().start, this.range().end),
  );
  protected scroll(e: Event) {
    this.offset.set((e.target as HTMLElement).scrollTop);
  }
}
export interface CalendarEvent {
  id: string;
  date: string;
  title: string;
}
@Component({
  selector: "mn-month-calendar",
  imports: [MnHook],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-minerva": "month-calendar",
    "data-part": "root",
    "[attr.data-disabled]": "disabled() ? '' : null",
    "[attr.data-size]": "size()",
    "[class]": "s.monthCalendar",
  },
  template: `<header [class]="s.toolbar">
      <button
        type="button"
        mnHook="month-calendar"
        mnPart="nav-button"
        aria-label="Previous month"
        [disabled]="disabled()"
        (click)="move(-1)"
      >
        ‹
      </button>
      <h2
        mnHook="month-calendar"
        mnPart="heading"
        [class]="s.heading"
        aria-live="polite"
      >
        {{ heading() }}
      </h2>
      <button
        type="button"
        mnHook="month-calendar"
        mnPart="nav-button"
        aria-label="Next month"
        [disabled]="disabled()"
        (click)="move(1)"
      >
        ›
      </button>
    </header>
    <div
      mnHook="month-calendar"
      mnPart="grid"
      role="grid"
      [attr.aria-label]="heading()"
      [class]="s.grid"
    >
      @for (week of weeks(); track $index) {
        <div role="row" [class]="s.week">
          @for (day of week; track key(day)) {
            <button
              type="button"
              role="gridcell"
              mnHook="month-calendar"
              mnPart="day"
              [class]="s.day"
              [mnStates]="{
                selected: value() === key(day),
                today: today() === key(day),
                outside: outside(day),
                disabled: isDisabled(day),
              }"
              [disabled]="isDisabled(day)"
              [attr.aria-selected]="value() === key(day)"
              [attr.aria-label]="key(day)"
              [attr.tabindex]="focusDate() === key(day) ? 0 : -1"
              [attr.data-date]="key(day)"
              (click)="choose(day)"
              (keydown)="navigate($event, day)"
            >
              {{ day.getDate() }}
            </button>
          }
        </div>
      }
    </div>
    <div
      mnHook="month-calendar"
      mnPart="events"
      [class]="s.events"
      aria-live="polite"
    >
      @for (event of selectedEvents(); track event.id) {
        <button
          mnHook="month-calendar"
          mnPart="event"
          type="button"
          [class]="s.eventButton"
          (click)="eventClick.emit(event)"
        >
          {{ event.title }}
        </button>
      } @empty {
        <p mnHook="month-calendar" mnPart="empty" [class]="s.empty">
          No events
        </p>
      }
    </div>`,
})
export class MnMonthCalendar {
  readonly month = model(new Date());
  readonly value = model<string | null>(null);
  readonly today = input(dayKey(new Date()));
  readonly events = input<readonly CalendarEvent[]>([]);
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly disabledDate = input<(date: Date) => boolean>(() => false);
  readonly size = input<"small" | "medium" | "large">("medium");
  readonly eventClick = output<CalendarEvent>();
  protected readonly s = styles.monthCalendarStyles;
  protected readonly key = dayKey;
  protected readonly focused = signal<string | null>(null);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  protected readonly heading = computed(() =>
    this.month().toLocaleDateString("en", { month: "long", year: "numeric" }),
  );
  protected readonly focusDate = computed(
    () => this.focused() ?? this.value() ?? dayKey(monthStart(this.month())),
  );
  protected readonly weeks = computed(() => {
    const first = monthStart(this.month());
    const start = addDays(first, -first.getDay());
    return Array.from({ length: 6 }, (_, w) =>
      Array.from({ length: 7 }, (_, d) => addDays(start, w * 7 + d)),
    );
  });
  protected readonly selectedEvents = computed(() =>
    this.events().filter((e) => e.date === (this.value() ?? this.today())),
  );
  protected outside(day: Date) {
    return !sameMonth(day, this.month());
  }
  protected isDisabled(day: Date) {
    return this.disabled() || this.disabledDate()(day);
  }
  protected move(offset: number) {
    if (!this.disabled()) this.month.set(monthStart(this.month(), offset));
  }
  protected choose(day: Date) {
    if (!this.isDisabled(day)) {
      this.value.set(dayKey(day));
      this.focused.set(dayKey(day));
    }
  }
  protected navigate(e: KeyboardEvent, day: Date) {
    if (this.disabled()) return;
    const offsets: Record<string, number> = {
      ArrowLeft: -1,
      ArrowRight: 1,
      ArrowUp: -7,
      ArrowDown: 7,
      Home: -day.getDay(),
      End: 6 - day.getDay(),
    };
    let next: Date;
    if (e.key in offsets) next = addDays(day, offsets[e.key]);
    else if (e.key === "PageUp" || e.key === "PageDown")
      next = monthStart(day, e.key === "PageUp" ? -1 : 1);
    else return;
    e.preventDefault();
    this.month.set(monthStart(next));
    this.focused.set(dayKey(next));
    queueMicrotask(() =>
      this.host.nativeElement
        .querySelector<HTMLElement>(`[data-date="${dayKey(next)}"]`)
        ?.focus(),
    );
  }
}

/** Whitespace-only JSON formatting preserves numeric lexemes, key order and duplicate keys. */
function formatJsonText(value: string, indent: number): string {
  const tokens =
    value.match(/"(?:\\.|[^"\\])*"|[{}[\],:]|[^{}[\],:\s]+/g) ?? [];
  const width = Math.max(0, Math.min(10, Math.trunc(indent) || 0));
  if (!width) return tokens.join("");
  let depth = 0;
  let result = "";
  const line = () => "\n" + " ".repeat(depth * width);
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (token === "{" || token === "[") {
      result += token;
      depth++;
      if (tokens[i + 1] !== "}" && tokens[i + 1] !== "]") result += line();
    } else if (token === "}" || token === "]") {
      depth--;
      if (tokens[i - 1] !== "{" && tokens[i - 1] !== "[") result += line();
      result += token;
    } else if (token === ",") result += "," + line();
    else if (token === ":") result += ": ";
    else result += token;
  }
  return result;
}
