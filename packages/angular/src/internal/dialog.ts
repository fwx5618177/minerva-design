import {
  DestroyRef,
  Directive,
  ElementRef,
  InjectionToken,
  booleanAttribute,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
  untracked,
  viewChild,
  type Signal,
} from "@angular/core";
import { injectScope } from "../config/scope";
import { controllable } from "./controllable";
import { injectId } from "./ids";
import { overlayLayer } from "./overlay";
import { injectIsBrowser } from "./platform";
import { presence } from "./portal";

/** What dialog parts (header, trigger, close) need from their dialog */
export interface DialogContext {
  readonly contentId: string;
  readonly titleId: string;
  readonly descriptionId: string;
  readonly isOpen: Signal<boolean>;
  /** Opens / closes (emits the model change) */
  setOpen(open: boolean): void;
  /** A header was mounted (the dialog is labelled by it); returns the unregister */
  registerTitle(): () => void;
  /** A trigger element (focus returns to it, outside clicks on it are inside) */
  registerTrigger(element: HTMLElement): () => void;
}

/** The closest dialog (Modal, Drawer, CommandDialog...) */
export const MN_DIALOG = new InjectionToken<DialogContext>("MN_DIALOG");

/**
 * Dialog foundation of Modal, Drawer, ConfirmDialog and CommandDialog (React's
 * internal `Dialog`): the open state (`[(open)]` model, `defaultOpen`), ids
 * linking trigger / content / title / description, the presence of the
 * portalled panel during its exit animation and its behaviour (focus moved in
 * and trapped, Escape / overlay click dismissal, scroll lock, the rest of the
 * page hidden, focus returned to the opener).
 *
 * Subclasses render, inside `@if (mounted()) { <ng-container *mnPortal> }`,
 * an overlay and the panel element (`#panel`).
 */
@Directive()
export abstract class MnDialogBase implements DialogContext {
  /**
   * Open state. Bound, the parent owns it (`[(open)]`; a one-way `[open]`
   * only receives requests through `openChange`, React's controlled mode);
   * unbound, the dialog owns it (`defaultOpen`, triggers)
   */
  readonly open = input<boolean | undefined, unknown>(undefined, {
    transform: (v: unknown) =>
      v === undefined || v === null ? undefined : booleanAttribute(v),
  });
  /** The user asked to open / close (trigger, close button, Escape, overlay) */
  readonly openChange = output<boolean>();
  /**
   * Initial open state when `open` is not bound
   * @default false
   */
  readonly defaultOpen = input(false, { transform: booleanAttribute });
  /**
   * Modal mode: overlay, focus trap, scroll lock, outside pointer blocked and
   * the rest of the page hidden from assistive technology
   * @default true
   */
  readonly modal = input(true, { transform: booleanAttribute });
  /**
   * Keeps the panel mounted while closed (`data-state="closed"`)
   * @default false
   */
  readonly forceMount = input(false, { transform: booleanAttribute });

  /** Escape pressed while topmost; `preventDefault()` keeps it open */
  readonly escapeKeyDown = output<KeyboardEvent>();
  /** Pointer down outside (e.g. on the overlay); `preventDefault()` keeps it open */
  readonly pointerDownOutside = output<PointerEvent>();
  /** Before focus moves into the panel on open; `preventDefault()` keeps it */
  readonly openAutoFocus = output<Event>();
  /** Before focus returns to the opener on close; `preventDefault()` skips it */
  readonly closeAutoFocus = output<Event>();

  protected readonly scope = injectScope();
  readonly contentId = injectId("dialog");
  readonly titleId = `${this.contentId}-title`;
  readonly descriptionId = `${this.contentId}-description`;

  private readonly openState = controllable({
    bound: () => this.open(),
    initial: () => this.defaultOpen(),
    emit: (open) => this.openChange.emit(open),
  });
  /** Current open state */
  readonly isOpen = this.openState.value;
  protected readonly state = computed(() =>
    this.isOpen() ? "open" : "closed",
  );

  private readonly titleCount = signal(0);
  /** A title is mounted (`aria-labelledby`) */
  protected readonly hasTitle = computed(() => this.titleCount() > 0);
  private readonly triggers = new Set<HTMLElement>();
  private opener: HTMLElement | null = null;

  protected readonly panel = viewChild<ElementRef<HTMLElement>>("panel");
  /** The panel is rendered (open, or closing during its exit animation) */
  protected readonly mounted = presence(
    () => this.isOpen() || this.forceMount(),
    () => this.panel()?.nativeElement,
  );

  private destroyed = false;

  constructor() {
    const isBrowser = injectIsBrowser();
    inject(DestroyRef).onDestroy(() => (this.destroyed = true));
    // the element focused when opening (focus returns to it)
    effect(() => {
      if (!this.isOpen() || !isBrowser) return;
      untracked(() => {
        const active = document.activeElement;
        const panel = this.panel()?.nativeElement;
        if (!active || !panel?.contains(active))
          this.opener =
            active instanceof HTMLElement && active !== document.body
              ? active
              : null;
      });
    });
    overlayLayer({
      element: () => this.panel()?.nativeElement,
      active: () => this.isOpen(),
      modal: () => this.modal(),
      restoreFocus: () => this.opener ?? [...this.triggers][0] ?? true,
      branches: () => [...this.triggers],
      onEscapeKeyDown: (event) => {
        this.escapeKeyDown.emit(event);
        return event.defaultPrevented ? false : undefined;
      },
      onPointerDownOutside: (event) => {
        this.pointerDownOutside.emit(event);
        return event.defaultPrevented ? false : undefined;
      },
      onOpenAutoFocus: (event) => this.openAutoFocus.emit(event),
      // (focus returns on the next macrotask: maybe after a destroy)
      onCloseAutoFocus: (event) => {
        if (!this.destroyed) this.closeAutoFocus.emit(event);
      },
      onDismiss: () => this.setOpen(false),
    });
  }

  setOpen(open: boolean): void {
    this.openState.set(open);
  }

  registerTitle(): () => void {
    this.titleCount.update((n) => n + 1);
    return () => this.titleCount.update((n) => n - 1);
  }

  registerTrigger(element: HTMLElement): () => void {
    this.triggers.add(element);
    return () => this.triggers.delete(element);
  }
}

/** Shared host bindings of dialog triggers (`[mnModalTrigger]`...) */
export const DIALOG_TRIGGER_HOST = {
  "aria-haspopup": "dialog",
  "[attr.aria-expanded]": "dialog().isOpen()",
  "[attr.aria-controls]": "dialog().isOpen() ? dialog().contentId : null",
  "[attr.data-state]": "dialog().isOpen() ? 'open' : 'closed'",
  "(click)": "dialog().setOpen(!dialog().isOpen())",
} as const;

/** Registers the host element as a trigger of a dialog */
export function registerTrigger(dialog: () => DialogContext): void {
  const host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  let unregister: (() => void) | undefined;
  effect((onCleanup) => {
    unregister = dialog().registerTrigger(host);
    onCleanup(() => unregister?.());
  });
}
