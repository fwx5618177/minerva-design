import {
  computed,
  inject,
  onBeforeUnmount,
  onMounted,
  provide,
  ref,
  shallowRef,
  useId,
  watch,
  type ComputedRef,
  type InjectionKey,
  type Ref,
} from "vue";

/** Open / closed, mirrored in `data-state` for CSS animations. */
export type DialogState = "open" | "closed";

/** State shared by the parts of a dialog (Modal, Drawer, CommandDialog...) */
export interface DialogContext {
  open: ComputedRef<boolean>;
  setOpen(open: boolean): void;
  modal: ComputedRef<boolean>;
  contentId: string;
  titleId: string;
  descriptionId: string;
  /** Number of mounted titles / descriptions (ARIA links) */
  titles: Ref<number>;
  descriptions: Ref<number>;
  triggerEl: Ref<HTMLElement | null>;
  /** Element focused when the dialog opened (focus returns to it) */
  openerEl: Ref<HTMLElement | null>;
  contentEl: Ref<HTMLElement | null>;
}

export const DIALOG_KEY: InjectionKey<DialogContext> = Symbol("minerva-dialog");

/** Dialog state of the closest dialog root (throws outside of one). */
export function useDialogContext(component: string): DialogContext {
  const context = inject(DIALOG_KEY, null);
  if (!context) {
    throw new Error(`<${component}> must be used inside its dialog root`);
  }
  return context;
}

/**
 * Creates and provides the dialog state: `open` (controlled or not, owned by
 * the caller), ids linking trigger / content / title / description, and the
 * opener captured synchronously on the closed -> open transition (before the
 * content mounts and takes focus).
 */
export function provideDialog(options: {
  open: ComputedRef<boolean>;
  setOpen: (open: boolean) => void;
  modal: ComputedRef<boolean>;
}): DialogContext {
  const id = useId();
  const triggerEl = shallowRef<HTMLElement | null>(null);
  const openerEl = shallowRef<HTMLElement | null>(null);
  const contentEl = shallowRef<HTMLElement | null>(null);
  const capture = () => {
    if (typeof document === "undefined") return;
    const active = document.activeElement;
    // Re-opened while the previous content still has focus: keep the opener
    if (!active || !contentEl.value?.contains(active)) {
      openerEl.value =
        active instanceof HTMLElement && active !== document.body
          ? active
          : null;
    }
  };
  if (options.open.value) onMounted(capture);
  watch(
    options.open,
    (open, was) => {
      if (open && !was) capture();
    },
    { flush: "sync" },
  );
  const context: DialogContext = {
    open: options.open,
    setOpen: options.setOpen,
    modal: options.modal,
    contentId: `${id}-content`,
    titleId: `${id}-title`,
    descriptionId: `${id}-description`,
    titles: ref(0),
    descriptions: ref(0),
    triggerEl,
    openerEl,
    contentEl,
  };
  provide(DIALOG_KEY, context);
  return context;
}

/** Registers a mounted title / description: returns its id. */
export function useDialogText(
  kind: "title" | "description",
  component: string,
): string {
  const context = useDialogContext(component);
  const counter = kind === "title" ? context.titles : context.descriptions;
  onMounted(() => {
    counter.value += 1;
  });
  onBeforeUnmount(() => {
    counter.value -= 1;
  });
  return kind === "title" ? context.titleId : context.descriptionId;
}

/** Props bound on a dialog trigger (`aria-*`, `data-state`, toggle on click) */
export function useDialogTrigger(component: string) {
  const context = useDialogContext(component);
  return computed(() => ({
    "aria-haspopup": "dialog" as const,
    "aria-expanded": context.open.value,
    "aria-controls": context.open.value ? context.contentId : undefined,
    "data-state": context.open.value ? "open" : "closed",
    onClick: (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      context.setOpen(!context.open.value);
    },
    ref: (el: unknown) => {
      const node =
        el instanceof HTMLElement
          ? el
          : ((el as { $el?: HTMLElement } | null)?.$el ?? null);
      context.triggerEl.value = node instanceof HTMLElement ? node : null;
    },
  }));
}
