import { NgTemplateOutlet } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Directive,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  forwardRef,
  inject,
  input,
  output,
} from "@angular/core";
import { cn } from "@minerva/core";
import { hasContent, templateOf, type MnContent } from "../../internal/content";
import {
  DIALOG_TRIGGER_HOST,
  MN_DIALOG,
  MnDialogBase,
  registerTrigger,
  type DialogContext,
} from "../../internal/dialog";
import { dialogLifecycle } from "../../internal/dialog-lifecycle";
import { MnHook } from "../../internal/hooks";
import { MnIcon } from "../../internal/icon";
import { MnPortal } from "../../internal/portal";
import { drawerStyles as s } from "../../internal/styles";

/** Edge of the viewport the drawer slides in from */
export type DrawerSide = "left" | "right" | "top" | "bottom";

/** Size preset: width for left / right drawers, height for top / bottom ones */
export type DrawerSize = "small" | "medium" | "large" | "full";

/**
 * Drawer: a side panel dialog sliding in from one edge, with title,
 * description and close button. The panel is portalled (theme-scoped) over
 * an overlay: focus moves in and is trapped, Escape (topmost dialog only)
 * and an overlay click close it, page scroll is locked, the rest of the page
 * is hidden from assistive technology, and focus returns to the opener on
 * close. Renders nothing on the server.
 *
 * Content: usually `<mn-drawer-body>` + `<mn-drawer-footer>`;
 * `<mn-drawer-header>` for a rich title. Open it with `[(open)]` or a
 * `[mnDrawerTrigger]` button; `[modal]="false"` makes it non-modal (no
 * overlay, closes on outside click / focus). Without `description` a
 * visually hidden generic description is rendered.
 *
 * @example
 * <button mnButton [mnDrawerTrigger]="drawer">Filters</button>
 * <mn-drawer #drawer="mnDrawer" title="Filters" side="left">
 *   <mn-drawer-body>...</mn-drawer-body>
 *   <mn-drawer-footer><button mnButton mnDrawerClose>Done</button></mn-drawer-footer>
 * </mn-drawer>
 */
@Component({
  selector: "mn-drawer",
  exportAs: "mnDrawer",
  imports: [MnHook, MnIcon, MnPortal, NgTemplateOutlet],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: MN_DIALOG, useExisting: forwardRef(() => MnDrawer) }],
  host: {
    style: "display: contents",
    "[attr.title]": "null",
    "[attr.role]": "null",
  },
  template: `
    @if (mounted()) {
      <ng-container *mnPortal>
        @if (modal()) {
          <div
            [class]="overlayClass()"
            style="pointer-events: auto"
            aria-hidden="true"
            mnHook="drawer"
            mnPart="overlay"
            [mnStates]="{ state: state() }"
          ></div>
        }
        <div
          #panel
          [attr.id]="contentId"
          [attr.role]="role()"
          [attr.aria-modal]="modal() ? 'true' : null"
          [attr.aria-labelledby]="
            hasTitle() || hasContent(title()) ? titleId : null
          "
          [attr.aria-describedby]="descriptionId"
          tabindex="-1"
          [class]="contentClass()"
          mnHook="drawer"
          mnPart="content"
          [mnStates]="{ state: state(), side: side(), size: size() }"
        >
          <p
            [attr.id]="descriptionId"
            [class]="
              hasContent(description()) ? s.description : s.visuallyHidden
            "
            mnHook="drawer"
            mnPart="description"
          >
            @if (templateOf(description()); as tpl) {
              <ng-container [ngTemplateOutlet]="tpl" />
            } @else if (hasContent(description())) {
              {{ description() }}
            } @else {
              {{ hiddenDescription() ?? scope.t("drawer.description") }}
            }
          </p>
          @if (hasContent(title())) {
            <div
              [attr.id]="titleId"
              [class]="s.header"
              mnHook="drawer"
              mnPart="header"
            >
              @if (templateOf(title()); as tpl) {
                <ng-container [ngTemplateOutlet]="tpl" />
              } @else {
                {{ title() }}
              }
            </div>
          }
          <ng-content />
          @if (!hideCloseButton()) {
            <button
              type="button"
              [class]="s.close"
              [attr.aria-label]="closeLabel() ?? scope.t('drawer.close')"
              (click)="setOpen(false)"
              mnHook="drawer"
              mnPart="close-button"
            >
              <svg mnIcon="X" size="16" aria-hidden="true"></svg>
            </button>
          }
        </div>
      </ng-container>
    }
  `,
})
export class MnDrawer extends MnDialogBase {
  /**
   * Edge the panel slides in from
   * @default "right"
   */
  readonly side = input<DrawerSide>("right");
  /**
   * Size preset
   * @default "medium"
   */
  readonly size = input<DrawerSize>("medium");
  /** Title, the drawer's accessible name (string or template) */
  readonly title = input<MnContent>(undefined);
  /**
   * Visible description below the title (accessible description). Without
   * it a visually hidden generic description is rendered.
   */
  readonly description = input<MnContent>(undefined);
  /**
   * Text of the visually hidden description rendered when `description` is
   * not set (default: the localized "Drawer content")
   */
  readonly hiddenDescription = input<string | undefined>(undefined);
  /**
   * Hides the close (×) button
   * @default false
   */
  readonly hideCloseButton = input(false, { transform: booleanAttribute });
  /** Accessible label of the close button (default: the localized "Close") */
  readonly closeLabel = input<string | undefined>(undefined);
  /**
   * ARIA role of the panel
   * @default "dialog"
   */
  readonly role = input<"dialog" | "alertdialog">("dialog");
  /** Extra class of the panel (React's `className`) */
  readonly panelClass = input<string | undefined>(undefined);
  /** Extra class of the overlay (backdrop) */
  readonly overlayClassName = input<string | undefined>(undefined);

  /** The drawer is open and focus moved in */
  readonly afterOpen = output<void>();
  /** The drawer finished closing (after its exit animation) */
  readonly afterClose = output<void>();

  protected readonly s = s;
  protected readonly hasContent = hasContent;
  protected readonly templateOf = templateOf;
  protected readonly contentClass = computed(() =>
    cn(s.content, s[this.side()], s[this.size()], this.panelClass()),
  );
  protected readonly overlayClass = computed(() =>
    cn(s.overlay, this.overlayClassName()),
  );

  constructor() {
    super();
    dialogLifecycle({
      isOpen: this.isOpen,
      mounted: this.mounted,
      afterOpen: () => this.afterOpen.emit(),
      afterClose: () => this.afterClose.emit(),
    });
  }
}

/** The drawer title (accessible name), for a rich header */
@Component({
  selector: "mn-drawer-header",
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "s.header",
    "[attr.id]": "dialog.titleId",
    "data-minerva": "drawer",
    "data-part": "header",
  },
  template: `<ng-content />`,
})
export class MnDrawerHeader {
  protected readonly s = s;
  protected readonly dialog = inject(MN_DIALOG);

  constructor() {
    inject(DestroyRef).onDestroy(this.dialog.registerTitle());
  }
}

/** The scrollable content area of a drawer */
@Component({
  selector: "mn-drawer-body",
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { "[class]": "s.body", "data-minerva": "drawer", "data-part": "body" },
  template: `<ng-content />`,
})
export class MnDrawerBody {
  protected readonly s = s;
}

/** The right-aligned, wrapping action row of a drawer */
@Component({
  selector: "mn-drawer-footer",
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "s.footer",
    "data-minerva": "drawer",
    "data-part": "footer",
  },
  template: `<ng-content />`,
})
export class MnDrawerFooter {
  protected readonly s = s;
}

/**
 * Opens / closes a drawer from any element (usually a button):
 * `aria-haspopup="dialog"`, `aria-expanded`, `aria-controls`; focus returns
 * to it on close.
 *
 * @example <button mnButton [mnDrawerTrigger]="drawer">Open</button>
 */
@Directive({
  selector: "[mnDrawerTrigger]",
  exportAs: "mnDrawerTrigger",
  host: DIALOG_TRIGGER_HOST,
})
export class MnDrawerTrigger {
  /** The drawer it controls (`#drawer="mnDrawer"`) */
  readonly mnDrawerTrigger = input.required<DialogContext>();
  protected readonly dialog = this.mnDrawerTrigger;

  constructor() {
    registerTrigger(this.mnDrawerTrigger);
  }
}

/** Closes the enclosing drawer on click */
@Directive({
  selector: "[mnDrawerClose]",
  exportAs: "mnDrawerClose",
  host: { "(click)": "dialog?.setOpen(false)" },
})
export class MnDrawerClose {
  protected readonly dialog = inject(MN_DIALOG, { optional: true });
}
