import { createFocusScope, hideOthers, lockScroll } from "@minerva/dom";
/** Called only after a concrete H5 HTMLElement is mounted. Native renderers do not enter this boundary. */
export function modalScope(
  panel: unknown,
  branches: Element[] = [],
): (() => void) | undefined {
  if (typeof HTMLElement === "undefined" || !(panel instanceof HTMLElement))
    return;
  const scope = createFocusScope(panel, {
    trapped: true,
    loop: true,
    autoFocus: false,
    restoreFocus: false,
  });
  const restore = hideOthers(
      [
        panel,
        ...branches,
        ...(panel.previousElementSibling?.matches(
          ".mn-backdrop, .mn-overlay-mask, .mn-popover-backdrop, .mn-uni-popover-backdrop",
        )
          ? [panel.previousElementSibling]
          : []),
      ],
      { attribute: "inert" },
    ),
    unlock = lockScroll();
  scope.activate();
  return () => {
    restore();
    unlock();
    scope.deactivate();
  };
}
