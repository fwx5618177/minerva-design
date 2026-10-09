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
import { MnHook } from "../../internal/hooks";
import { MnIcon } from "../../internal/icon";
import { MnPortal } from "../../internal/portal";
import { modalStyles as s } from "../../internal/styles";

/** Width preset of a Modal */
export type ModalSize = "small" | "medium" | "large" | "xlarge" | "full";

/**
 * Modal: a dialog with title, description and close button. The panel is
 * portalled (theme-scoped) over an overlay: focus moves in and is trapped,
 * Escape (topmost dialog only) and an overlay click close it, page scroll is
 * locked, the rest of the page is hidden from assistive technology, and focus
 * returns to the opener on close. Renders nothing on the server.
 *
 * Content: the body (usually `<mn-modal-body>` + `<mn-modal-footer>`, or a
 * `<form>` wrapping them); `<mn-modal-header>` for a rich title. Open it with
 * `[(open)]` or a `[mnModalTrigger]` button.
 *
 * @example
 * <button mnButton [mnModalTrigger]="dialog">Delete</button>
 * <mn-modal #dialog="mnModal" title="Delete record" description="Cannot be undone">
 *   <mn-modal-footer><button mnButton mnModalClose>Cancel</button></mn-modal-footer>
 * </mn-modal>
 */
@Component({
  selector: "mn-modal",
  exportAs: "mnModal",
  imports: [MnHook, MnIcon, MnPortal, NgTemplateOutlet],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: MN_DIALOG, useExisting: forwardRef(() => MnModal) }],
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
            mnHook="modal"
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
          [attr.aria-describedby]="
            hasContent(description()) ? descriptionId : null
          "
          tabindex="-1"
          [class]="contentClass()"
          mnHook="modal"
          mnPart="content"
          [mnStates]="{ state: state(), size: size() }"
        >
          @if (hasContent(description())) {
            <p
              [attr.id]="descriptionId"
              [class]="s.description"
              mnHook="modal"
              mnPart="description"
            >
              @if (templateOf(description()); as tpl) {
                <ng-container [ngTemplateOutlet]="tpl" />
              } @else {
                {{ description() }}
              }
            </p>
          }
          @if (hasContent(title())) {
            <div
              [attr.id]="titleId"
              [class]="s.header"
              mnHook="modal"
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
              [attr.aria-label]="closeLabel() ?? scope.t('modal.close')"
              (click)="setOpen(false)"
              mnHook="modal"
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
export class MnModal extends MnDialogBase {
  /** Title, the dialog's accessible name (string or template) */
  readonly title = input<MnContent>(undefined);
  /** Description below the title, the accessible description */
  readonly description = input<MnContent>(undefined);
  /** Width preset @default "medium" */
  readonly size = input<ModalSize>("medium");
  /** Hides the close (×) button @default false */
  readonly hideCloseButton = input(false, { transform: booleanAttribute });
  /** Accessible label of the close button (default: the localized "Close") */
  readonly closeLabel = input<string | undefined>(undefined);
  /**
   * ARIA role of the panel ("alertdialog" for interrupting confirmations)
   * @default "dialog"
   */
  readonly role = input<"dialog" | "alertdialog">("dialog");
  /** Extra class of the panel */
  readonly panelClass = input<string | undefined>(undefined);
  /** Extra class of the overlay */
  readonly overlayClassName = input<string | undefined>(undefined);

  protected readonly s = s;
  protected readonly hasContent = hasContent;
  protected readonly templateOf = templateOf;
  protected readonly contentClass = computed(() =>
    cn(s.content, s[this.size()], this.panelClass()),
  );
  protected readonly overlayClass = computed(() =>
    cn(s.overlay, this.overlayClassName()),
  );
}

/** The dialog title (accessible name), for a rich header */
@Component({
  selector: "mn-modal-header",
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "s.header",
    "[attr.id]": "dialog.titleId",
    "data-minerva": "modal",
    "data-part": "header",
  },
  template: `<ng-content />`,
})
export class MnModalHeader {
  protected readonly s = s;
  protected readonly dialog = inject(MN_DIALOG);

  constructor() {
    inject(DestroyRef).onDestroy(this.dialog.registerTitle());
  }
}

/** The scrollable content area */
@Component({
  selector: "mn-modal-body",
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { "[class]": "s.body", "data-minerva": "modal", "data-part": "body" },
  template: `<ng-content />`,
})
export class MnModalBody {
  protected readonly s = s;
}

/** The right-aligned, wrapping action row */
@Component({
  selector: "mn-modal-footer",
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "s.footer",
    "data-minerva": "modal",
    "data-part": "footer",
  },
  template: `<ng-content />`,
})
export class MnModalFooter {
  protected readonly s = s;
}

/**
 * Opens / closes a modal from any element (usually a button):
 * `aria-haspopup="dialog"`, `aria-expanded`, `aria-controls`; focus returns
 * to it on close.
 *
 * @example <button mnButton [mnModalTrigger]="dialog">Open</button>
 */
@Directive({
  selector: "[mnModalTrigger]",
  exportAs: "mnModalTrigger",
  host: DIALOG_TRIGGER_HOST,
})
export class MnModalTrigger {
  /** The modal it controls (`#dialog="mnModal"`) */
  readonly mnModalTrigger = input.required<DialogContext>();
  protected readonly dialog = this.mnModalTrigger;

  constructor() {
    registerTrigger(this.mnModalTrigger);
  }
}

/** Closes the enclosing modal on click */
@Directive({
  selector: "[mnModalClose]",
  host: { "(click)": "dialog?.setOpen(false)" },
})
export class MnModalClose {
  protected readonly dialog = inject(MN_DIALOG, { optional: true });
}
