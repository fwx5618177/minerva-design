import { NgTemplateOutlet } from "@angular/common";
import { MnTooltipProvider } from "./tooltip-provider";
import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  DestroyRef,
  effect,
  inject,
  afterRenderEffect,
  ElementRef,
  booleanAttribute,
  computed,
  input,
  model,
  output,
  signal,
  viewChild,
} from "@angular/core";
import { type Placement, parsePlacement } from "@minerva/dom";
import { MnHook } from "../../internal/hooks";
import { MnDialogBase } from "../../internal/dialog";
import { injectId } from "../../internal/ids";
import { anchoredPosition } from "../../internal/overlay";
import { floatingLayer } from "../../internal/floating-layer";
import { MnPortal, presence } from "../../internal/portal";
import * as styles from "../../internal/styles";

@Component({
  selector: "mn-confirm-dialog",
  imports: [MnHook, MnPortal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `@if (mounted()) {
    <ng-container *mnPortal
      ><div
        mnHook="confirm-dialog"
        mnPart="overlay"
        [mnStates]="{ state: state() }"
        [class]="s.overlay"
        aria-hidden="true"
      ></div>
      <section
        #panel
        mnHook="confirm-dialog"
        mnPart="content"
        [mnStates]="{ state: state(), color: color(), loading: loading() }"
        [class]="s.content"
        role="alertdialog"
        aria-modal="true"
        [attr.aria-labelledby]="titleId"
        [attr.aria-describedby]="descriptionId"
        tabindex="-1"
      >
        <h2
          mnHook="confirm-dialog"
          mnPart="header"
          [id]="titleId"
          [class]="s.header"
        >
          {{ title() }}
        </h2>
        <p
          mnHook="confirm-dialog"
          mnPart="description"
          [id]="descriptionId"
          [class]="s.description"
        >
          {{ description() }}
        </p>
        <div mnHook="confirm-dialog" mnPart="body" [class]="s.body">
          <ng-content />
        </div>
        <footer mnHook="confirm-dialog" mnPart="footer" [class]="s.footer">
          <button type="button" [disabled]="loading()" (click)="cancel()">
            {{ cancelLabel() }}</button
          ><button
            type="button"
            [disabled]="loading() || confirmDisabled()"
            [attr.aria-busy]="loading()"
            (click)="accept()"
          >
            {{ confirmLabel() }}
          </button>
        </footer>
        <button
          type="button"
          mnHook="confirm-dialog"
          mnPart="close-button"
          aria-label="Close"
          [class]="s.close"
          [disabled]="loading()"
          (click)="cancel()"
        >
          ×
        </button>
      </section></ng-container
    >
  }`,
})
export class MnConfirmDialog extends MnDialogBase {
  readonly title = input("Confirm action");
  readonly description = input("");
  readonly color = input<"primary" | "warning" | "danger">("primary");
  readonly loading = input(false, { transform: booleanAttribute });
  readonly confirmDisabled = input(false, { transform: booleanAttribute });
  readonly cancelLabel = input("Cancel");
  readonly confirmLabel = input("Confirm");
  readonly confirm = output<void>();
  readonly cancelled = output<void>();
  protected readonly s = styles.modalStyles;
  protected accept() {
    if (!this.loading() && !this.confirmDisabled()) this.confirm.emit();
  }
  constructor() {
    super();
    this.escapeKeyDown.subscribe((event) => {
      if (this.loading()) event.preventDefault();
    });
    this.pointerDownOutside.subscribe((event) => {
      if (this.loading()) event.preventDefault();
    });
  }
  protected cancel() {
    if (!this.loading()) {
      this.cancelled.emit();
      this.setOpen(false);
    }
  }
}
export interface CommandItem {
  id: string;
  label: string;
  keywords?: string;
  disabled?: boolean;
}
@Component({
  selector: "mn-command-dialog",
  imports: [MnHook, MnPortal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `@if (mounted()) {
    <ng-container *mnPortal
      ><div
        mnHook="command-dialog"
        mnPart="overlay"
        [mnStates]="{ state: state() }"
        [class]="modalStyles.overlay"
        aria-hidden="true"
      ></div>
      <div
        #panel
        mnHook="command-dialog"
        mnPart="content"
        [mnStates]="{ state: state() }"
        [class]="s.dialog"
        role="dialog"
        aria-modal="true"
        [attr.aria-labelledby]="titleId"
        [attr.aria-describedby]="descriptionId"
        tabindex="-1"
      >
        <h2
          mnHook="command-dialog"
          mnPart="header"
          [id]="titleId"
          [class]="s.header"
        >
          {{ title() }}
        </h2>
        <p mnHook="command-dialog" mnPart="description" [id]="descriptionId">
          {{ description() }}
        </p>
        <div mnHook="command-dialog" mnPart="search" [class]="s.search">
          <input
            mnHook="command-dialog"
            mnPart="input"
            role="combobox"
            aria-autocomplete="list"
            aria-expanded="true"
            [attr.aria-controls]="contentId + '-list'"
            [attr.aria-activedescendant]="
              filtered()[highlighted()]
                ? contentId + '-item-' + highlighted()
                : null
            "
            [attr.aria-label]="title()"
            [class]="s.input"
            [value]="query()"
            (input)="search($event)"
            (keydown)="navigate($event)"
          />
        </div>
        <div
          mnHook="command-dialog"
          mnPart="list"
          role="listbox"
          [id]="contentId + '-list'"
          [class]="s.results"
        >
          @for (item of filtered(); track item.id) {
            <button
              type="button"
              mnHook="command-dialog"
              mnPart="item"
              role="option"
              [id]="contentId + '-item-' + $index"
              [mnStates]="{ highlighted: highlighted() === $index }"
              [attr.aria-selected]="highlighted() === $index"
              [disabled]="item.disabled"
              [class]="s.item"
              (pointerenter)="highlighted.set($index)"
              (click)="choose(item)"
            >
              {{ item.label }}
            </button>
          } @empty {
            <p mnHook="command-dialog" mnPart="empty" [class]="s.empty">
              No commands found
            </p>
          }
        </div>
      </div></ng-container
    >
  }`,
})
export class MnCommandDialog extends MnDialogBase {
  readonly title = input("Commands");
  readonly description = input("Search for a command");
  readonly items = input<readonly CommandItem[]>([]);
  readonly selected = output<CommandItem>();
  readonly query = model("");
  protected readonly highlighted = signal(0);
  protected readonly s = styles.commandStyles;
  protected readonly modalStyles = styles.modalStyles;
  protected readonly filtered = computed(() =>
    this.items().filter((item) =>
      `${item.label} ${item.keywords ?? ""}`
        .toLocaleLowerCase()
        .includes(this.query().toLocaleLowerCase()),
    ),
  );
  protected search(e: Event) {
    this.query.set((e.target as HTMLInputElement).value);
    this.highlighted.set(0);
  }
  protected choose(item: CommandItem) {
    if (!item.disabled) {
      this.selected.emit(item);
      this.setOpen(false);
    }
  }
  protected navigate(e: KeyboardEvent) {
    const list = this.filtered();
    if (!list.length) return;
    if (e.key === "Enter") {
      e.preventDefault();
      this.choose(list[this.highlighted()]);
      return;
    }
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(e.key)) return;
    e.preventDefault();
    let n =
      e.key === "Home"
        ? 0
        : e.key === "End"
          ? list.length - 1
          : (this.highlighted() +
              (e.key === "ArrowDown" ? 1 : -1) +
              list.length) %
            list.length;
    for (let i = 0; i < list.length && list[n].disabled; i++)
      n = (n + (e.key === "ArrowUp" ? -1 : 1) + list.length) % list.length;
    this.highlighted.set(n);
  }
}

@Directive()
export abstract class MnFloatingBase {
  readonly open = model(false);
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly forceMount = input(false, { transform: booleanAttribute });
  readonly placement = input<Placement>("bottom-start");
  readonly label = input("Open");
  readonly id = injectId("floating");
  protected readonly trigger = viewChild<ElementRef<HTMLElement>>("trigger");
  protected readonly panel = viewChild<ElementRef<HTMLElement>>("panel");
  protected readonly actualPlacement = signal<Placement>("bottom-start");
  protected readonly state = computed(() => (this.open() ? "open" : "closed"));
  protected readonly parts = computed(() =>
    parsePlacement(this.actualPlacement()),
  );
  protected readonly mounted = presence(
    () => this.open() || this.forceMount(),
    () => this.panel()?.nativeElement,
  );
  protected connect(focus = true, autoFocus?: () => HTMLElement | null) {
    anchoredPosition({
      anchor: () => this.anchorElement(),
      floating: () => this.panel()?.nativeElement,
      active: () => this.open(),
      options: () => ({ placement: this.placement(), offset: { mainAxis: 8 } }),
      onPosition: (result) => this.actualPlacement.set(result.placement),
    });
    floatingLayer({
      element: () => this.panel()?.nativeElement,
      active: () => this.open(),
      focus,
      autoFocus,
      branches: () => [this.trigger()?.nativeElement, this.anchorElement()],
      restoreFocus: () => this.trigger()?.nativeElement,
      onDismiss: () => this.open.set(false),
    });
  }
  protected anchorElement(): HTMLElement | undefined {
    return this.trigger()?.nativeElement;
  }
  protected toggle() {
    if (!this.disabled()) this.open.update((v) => !v);
  }
}
@Component({
  selector: "mn-popover",
  exportAs: "mnPopover",
  imports: [MnHook, MnPortal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<button
      #trigger
      type="button"
      mnHook="popover"
      mnPart="trigger"
      [mnStates]="{ state: state() }"
      [disabled]="disabled()"
      aria-haspopup="dialog"
      [attr.aria-expanded]="open()"
      [attr.aria-controls]="id"
      (click)="toggle()"
    >
      {{ label() }}
    </button>
    @if (mounted()) {
      <div
        *mnPortal
        #panel
        mnHook="popover"
        mnPart="content"
        [mnStates]="{
          state: state(),
          placement: actualPlacement(),
          side: parts().side,
          align: parts().align,
        }"
        [id]="id"
        role="dialog"
        [attr.aria-label]="label()"
        tabindex="-1"
        [class]="s.content"
      >
        <span
          mnHook="popover"
          mnPart="arrow"
          [class]="s.arrow"
          aria-hidden="true"
        ></span
        ><ng-content />
      </div>
    }`,
})
export class MnPopover extends MnFloatingBase {
  private readonly externalAnchor = signal<HTMLElement | undefined>(undefined);
  protected override anchorElement(): HTMLElement | undefined {
    return this.externalAnchor() ?? super.anchorElement();
  }
  /** Register an anchor independently of the trigger. Returns cleanup. */
  registerAnchor(element: HTMLElement): () => void {
    this.externalAnchor.set(element);
    return () => {
      if (this.externalAnchor() === element) this.externalAnchor.set(undefined);
    };
  }
  protected readonly s = styles.popoverStyles;
  constructor() {
    super();
    this.connect();
  }
}
/** Positions a popover relative to this element; accepts a reference to an external popover. */
@Directive({
  selector: "[mnPopoverAnchor]",
  host: { "data-minerva": "popover", "data-part": "anchor" },
})
export class MnPopoverAnchor {
  readonly mnPopoverAnchor = input<MnPopover | "">("");
  private readonly parent = inject(MnPopover, { optional: true });
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  constructor() {
    effect((cleanup) => {
      const popover = this.mnPopoverAnchor() || this.parent;
      if (popover) cleanup(popover.registerAnchor(this.element.nativeElement));
    });
  }
}
/** Native button that closes its projected parent popover or an explicit reference. */
@Directive({
  selector: "button[mnPopoverClose]",
  host: {
    type: "button",
    "data-minerva": "popover",
    "data-part": "close",
    "(click)": "close()",
  },
})
export class MnPopoverClose {
  readonly mnPopoverClose = input<MnPopover | "">("");
  private readonly parent = inject(MnPopover, { optional: true });
  protected close() {
    (this.mnPopoverClose() || this.parent)?.open.set(false);
  }
}
@Component({
  selector: "mn-tooltip",
  imports: [MnHook, MnPortal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span
      #trigger
      mnHook="tooltip"
      mnPart="trigger"
      [mnStates]="{ state: state(), disabled: disabled() }"
      [attr.aria-describedby]="open() ? id : null"
      [class]="s.tooltipTrigger"
      (pointerenter)="show()"
      (pointerleave)="hide()"
      (focusin)="show()"
      (focusout)="hide()"
      ><ng-content
    /></span>
    @if (mounted()) {
      <div
        *mnPortal
        #panel
        mnHook="tooltip"
        mnPart="content"
        [mnStates]="{
          state: state(),
          placement: actualPlacement(),
          side: parts().side,
          align: parts().align,
          color: color(),
          shape: shape(),
          variant: variant(),
        }"
        [id]="id"
        role="tooltip"
        [class]="tooltipClass()"
      >
        {{ text()
        }}<span
          mnHook="tooltip"
          mnPart="arrow"
          [class]="s.arrow"
          aria-hidden="true"
        ></span>
      </div>
    }`,
})
export class MnTooltip extends MnFloatingBase {
  /** Override the enclosing provider delay, in milliseconds. */
  readonly enterDelay = input<number>();
  readonly leaveDelay = input<number>();
  private readonly provider = inject(MnTooltipProvider, { optional: true });
  private timer: ReturnType<typeof setTimeout> | undefined;
  private readonly closeNow = () => {
    this.clearTimer();
    this.open.set(false);
    this.provider?.release(this.closeNow);
  };
  private clearTimer() {
    if (this.timer !== undefined) clearTimeout(this.timer);
    this.timer = undefined;
  }
  readonly text = input("");
  readonly color = input<"neutral" | "info" | "success" | "warning" | "danger">(
    "neutral",
  );
  readonly shape = input<"default" | "rounded" | "square" | "thought">(
    "default",
  );
  readonly variant = input<"solid" | "subtle" | "glass">("solid");
  protected readonly s = styles.tooltipStyles;
  protected readonly tooltipClass = computed(() =>
    [
      this.s.tooltip,
      this.s[this.color()],
      this.s[this.shape()],
      this.s[this.variant()],
      this.open() ? this.s.show : "",
    ].join(" "),
  );
  constructor() {
    super();
    this.connect(false);
    inject(DestroyRef).onDestroy(this.closeNow);
    effect(() => {
      if (this.disabled() || this.provider?.disabled()) this.closeNow();
    });
    afterRenderEffect((onCleanup) => {
      const trigger = this.trigger()?.nativeElement;
      const target =
        trigger?.querySelector<HTMLElement>(
          "button,a,input,select,textarea,[tabindex]",
        ) ?? trigger;
      if (!target || !this.open()) return;
      const previous = target.getAttribute("aria-describedby");
      target.setAttribute(
        "aria-describedby",
        [previous, this.id].filter(Boolean).join(" "),
      );
      onCleanup(() => {
        if (previous) target.setAttribute("aria-describedby", previous);
        else target.removeAttribute("aria-describedby");
      });
    });
  }
  protected show() {
    this.clearTimer();
    if (this.disabled() || this.provider?.disabled()) return;
    const open = () => {
      this.provider?.activate(this.closeNow);
      this.open.set(true);
    };
    const delay = Math.max(0, this.enterDelay() ?? this.provider?.delay() ?? 0);
    if (delay) this.timer = setTimeout(open, delay);
    else open();
  }
  protected hide() {
    this.clearTimer();
    const delay = Math.max(
      0,
      this.leaveDelay() ?? this.provider?.leaveDelay() ?? 0,
    );
    if (delay) this.timer = setTimeout(this.closeNow, delay);
    else this.closeNow();
  }
}
export interface MenuItem {
  id: string;
  label?: string;
  type?: "item" | "separator" | "label" | "group" | "radio";
  /** Radio group id; defaults to the enclosing group item id. */
  group?: string;
  /** Radio value; defaults to id. */
  value?: string;
  disabled?: boolean;
  checked?: boolean;
  icon?: string;
  shortcut?: string;
  children?: readonly MenuItem[];
}
const menuTemplate = `<button #trigger type="button" [mnHook]="kind" mnPart="trigger" [mnStates]="{state:state(),disabled:disabled()}" [disabled]="disabled()" aria-haspopup="menu" [attr.aria-expanded]="open()" [attr.aria-controls]="id" (click)="triggerClick()" (contextmenu)="context($event)" (keydown)="triggerKey($event)">{{label()}}</button>
@if(mounted()) {<div *mnPortal #panel [mnHook]="kind" mnPart="content" [mnStates]="{state:state(),placement:actualPlacement(),side:parts().side,align:parts().align,size:size()}" [id]="id" role="menu" [attr.aria-label]="label()" tabindex="-1" [class]="s.content" (keydown)="navigate($event)"><div [mnHook]="kind" mnPart="group" role="group"><ng-container [ngTemplateOutlet]="entries" [ngTemplateOutletContext]="{$implicit:items(),group:'default'}"/></div></div>}
<ng-template #entries let-list let-group="group">@for(item of list; track item.id) {
  @if(item.type==='group') {<div [mnHook]="kind" mnPart="group" role="group" [attr.aria-label]="item.label"><span [mnHook]="kind" mnPart="label" [class]="s.label">{{item.label}}</span><ng-container [ngTemplateOutlet]="entries" [ngTemplateOutletContext]="{$implicit:item.children ?? [],group:item.id}"/></div>}
  @else if(item.type==='separator') {<div [mnHook]="kind" mnPart="separator" role="separator" [class]="s.separator"></div>}
  @else if(item.type==='label') {<span [mnHook]="kind" mnPart="label" [class]="s.label">{{item.label}}</span>}
  @else {<button type="button" [mnHook]="kind" mnPart="item" [mnStates]="{disabled:item.disabled,highlighted:highlighted()===item.id,expanded:expanded().includes(item.id),state:checked(item,group)===undefined?undefined:checked(item,group)?'checked':'unchecked'}" [attr.role]="item.type==='radio'?'menuitemradio':item.checked===undefined?'menuitem':'menuitemcheckbox'" [attr.aria-checked]="checked(item,group)??null" [attr.aria-disabled]="item.disabled" [attr.aria-haspopup]="item.children?'menu':null" [attr.aria-expanded]="item.children?expanded().includes(item.id):null" [class]="s.item" tabindex="-1" (focus)="highlighted.set(item.id)" (pointerenter)="highlighted.set(item.id)" (click)="choose(item,group)">
    @if(item.icon){<span [mnHook]="kind" mnPart="icon" [class]="s.icon" aria-hidden="true">{{item.icon}}</span>}
    <span [mnHook]="kind" mnPart="item-label" [class]="s.text">{{item.label}}</span>
    @if(checked(item,group)!==undefined){<span [mnHook]="kind" mnPart="item-indicator" [class]="s.indicator" aria-hidden="true">{{checked(item,group)?'✓':''}}</span>}
    @if(item.shortcut){<kbd [mnHook]="kind" mnPart="shortcut" [class]="s.shortcut">{{item.shortcut}}</kbd>}
  </button>
  @if(item.children && expanded().includes(item.id)) {<ng-container [ngTemplateOutlet]="entries" [ngTemplateOutletContext]="{$implicit:item.children,group:group}"/>}}
}</ng-template>`;
@Directive()
export abstract class MnMenuBase extends MnFloatingBase {
  abstract readonly kind: "menu" | "context-menu";
  readonly items = input<readonly MenuItem[]>([]);
  readonly size = input<"small" | "medium">("medium");
  readonly selected = output<MenuItem>();
  readonly checkedChange = output<{ id: string; checked: boolean }>();
  readonly expanded = model<readonly string[]>([]);
  /** Selected radio value by group id. */
  readonly radioValues = model<Readonly<Record<string, string>>>({});
  readonly radioChange = output<{ group: string; value: string }>();
  protected checked(item: MenuItem, group: string): boolean | undefined {
    return item.type === "radio"
      ? this.radioValues()[item.group ?? group] === (item.value ?? item.id)
      : item.checked;
  }
  protected readonly highlighted = signal("");
  protected readonly s = styles.menuStyles;
  constructor() {
    super();
    this.connect(
      true,
      () =>
        this.panel()?.nativeElement.querySelector<HTMLElement>(
          '[role^="menuitem"]:not([aria-disabled="true"])',
        ) ?? null,
    );
  }
  protected triggerClick() {
    if (this.kind === "menu") this.toggle();
  }
  protected context(e: Event) {
    if (this.kind === "context-menu" && !this.disabled()) {
      e.preventDefault();
      this.open.set(true);
    }
  }
  protected triggerKey(e: KeyboardEvent) {
    if (
      e.key === "ArrowDown" ||
      e.key === "ArrowUp" ||
      (e.key === "F10" && e.shiftKey)
    ) {
      e.preventDefault();
      if (!this.disabled()) this.open.set(true);
    }
  }
  protected choose(item: MenuItem, group = "default") {
    if (item.disabled) return;
    if (item.children) {
      this.expanded.update((ids) =>
        ids.includes(item.id)
          ? ids.filter((id) => id !== item.id)
          : [...ids, item.id],
      );
      return;
    }
    if (item.type === "radio") {
      const change = {
        group: item.group ?? group,
        value: item.value ?? item.id,
      };
      this.radioValues.update((values) => ({
        ...values,
        [change.group]: change.value,
      }));
      this.radioChange.emit(change);
    } else if (item.checked !== undefined)
      this.checkedChange.emit({ id: item.id, checked: !item.checked });
    this.selected.emit(item);
    this.open.set(false);
  }
  protected navigate(e: KeyboardEvent) {
    const panel = this.panel()?.nativeElement;
    if (!panel) return;
    const items = Array.from(
      panel.querySelectorAll<HTMLElement>('[role^="menuitem"]'),
    ).filter((el) => el.getAttribute("aria-disabled") !== "true");
    if (!items.length) return;
    const index = items.indexOf(e.target as HTMLElement);
    if (["ArrowDown", "ArrowUp", "Home", "End"].includes(e.key)) {
      e.preventDefault();
      const target =
        e.key === "Home"
          ? 0
          : e.key === "End"
            ? items.length - 1
            : (index + (e.key === "ArrowDown" ? 1 : -1) + items.length) %
              items.length;
      items[target].focus();
    } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
      const match =
        items.find(
          (item, i) =>
            i > index &&
            item.textContent
              ?.trim()
              .toLowerCase()
              .startsWith(e.key.toLowerCase()),
        ) ??
        items.find((item) =>
          item.textContent
            ?.trim()
            .toLowerCase()
            .startsWith(e.key.toLowerCase()),
        );
      if (match) {
        e.preventDefault();
        match.focus();
      }
    }
  }
}
@Component({
  selector: "mn-menu",
  imports: [MnHook, MnPortal, NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: menuTemplate,
})
export class MnMenu extends MnMenuBase {
  readonly kind = "menu" as const;
}
@Component({
  selector: "mn-context-menu",
  imports: [MnHook, MnPortal, NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: menuTemplate,
})
export class MnContextMenu extends MnMenuBase {
  readonly kind = "context-menu" as const;
}
