import { useEffect, useRef } from "react";
import { createFocusScope, hideOthers, lockScroll } from "@minerva/dom";

export function useH5List(
  id: string,
  options: {
    open?: boolean;
    setOpen?: (open: boolean) => void;
    selector?: string;
    orientation?: string;
    dir?: string;
    loop?: boolean;
    automatic?: boolean;
    input?: boolean;
    grid?: boolean;
  } = {},
) {
  const latest = useRef(options);
  latest.current = options;
  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.getElementById(id);
    if (!root) return;
    let active = -1,
      search = "",
      timer: ReturnType<typeof setTimeout>;
    const items = () =>
      Array.from(
        root.querySelectorAll<HTMLElement>(
          latest.current.selector ?? '[role="option"], [role^="menuitem"]',
        ),
      ).filter(
        (el) =>
          !el.hasAttribute("disabled") &&
          el.getAttribute("aria-disabled") !== "true" &&
          !el.closest("[hidden]"),
      );
    const initial = items();
    const selected =
      initial.find(
        (el) =>
          el.getAttribute("aria-selected") === "true" ||
          el.getAttribute("aria-pressed") === "true",
      ) ?? initial[0];
    initial.forEach((el) => (el.tabIndex = el === selected ? 0 : -1));
    const reset = (event: Event) => {
      active = -1;
      (event.target as HTMLElement).removeAttribute("aria-activedescendant");
    };
    const key = (event: KeyboardEvent) => {
      const o = latest.current;
      if (event.defaultPrevented) return;
      let all = items();
      const target = event.target as HTMLElement;
      const menu = target.closest('[role="menu"]');
      if (menu) all = all.filter((el) => el.closest('[role="menu"]') === menu);
      active = Math.min(active, all.length - 1);
      if (
        target.getAttribute("aria-haspopup") === "menu" &&
        event.key === (o.dir === "rtl" ? "ArrowLeft" : "ArrowRight")
      ) {
        event.preventDefault();
        if (target.getAttribute("aria-expanded") !== "true") target.click();
        queueMicrotask(() => {
          const child = target.getAttribute("aria-controls");
          const first = child
            ? document
                .getElementById(child)
                ?.querySelector<HTMLElement>('[role^="menuitem"]')
            : null;
          if (first) {
            first.tabIndex = 0;
            first.focus();
          }
        });
        return;
      }
      if (
        menu &&
        event.key === (o.dir === "rtl" ? "ArrowRight" : "ArrowLeft")
      ) {
        const trigger = Array.from(
          root.querySelectorAll<HTMLElement>('[aria-haspopup="menu"]'),
        ).find((el) => el.getAttribute("aria-controls") === menu.id);
        if (trigger) {
          event.preventDefault();
          trigger.click();
          trigger.focus();
          return;
        }
      }
      if (event.key === "Escape") {
        o.setOpen?.(false);
        return;
      }
      if (
        o.open === false &&
        ["ArrowDown", "ArrowUp", "Enter", " "].includes(event.key)
      ) {
        event.preventDefault();
        o.setOpen?.(true);
        queueMicrotask(() => {
          const first = root.querySelector<HTMLElement>(
            o.selector ?? '[role="option"], [role^="menuitem"]',
          );
          if (first) {
            first.tabIndex = 0;
            first.focus();
          }
        });
        return;
      }
      if (!all.length) return;
      const current = all.findIndex(
        (el) => el === target || el.contains(target),
      );
      if (current >= 0) active = current;
      let next = active;
      const forward =
        o.orientation === "horizontal"
          ? o.dir === "rtl"
            ? "ArrowLeft"
            : "ArrowRight"
          : "ArrowDown";
      const backward =
        o.orientation === "horizontal"
          ? o.dir === "rtl"
            ? "ArrowRight"
            : "ArrowLeft"
          : "ArrowUp";
      if (event.key === forward) next = active + 1;
      else if (event.key === backward)
        next = active < 0 ? all.length - 1 : active - 1;
      else if (o.grid && event.key === "ArrowRight") next = active + 1;
      else if (o.grid && event.key === "ArrowLeft") next = active - 1;
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = all.length - 1;
      else if (event.key === "Enter" || (event.key === " " && !o.input)) {
        if (active >= 0) {
          event.preventDefault();
          all[active]?.click();
        }
        return;
      } else if (
        !o.input &&
        event.key.length === 1 &&
        !event.ctrlKey &&
        !event.metaKey
      ) {
        search += event.key.toLowerCase();
        clearTimeout(timer);
        timer = setTimeout(() => {
          search = "";
        }, 500);
        const index = all.findIndex(
          (el, i) =>
            i > active &&
            el.textContent?.trim().toLowerCase().startsWith(search),
        );
        next =
          index < 0
            ? all.findIndex((el) =>
                el.textContent?.trim().toLowerCase().startsWith(search),
              )
            : index;
        if (next < 0) return;
      } else return;
      if (o.grid && event.key === "ArrowDown") next = active + 7;
      if (o.grid && event.key === "ArrowUp") next = active - 7;
      event.preventDefault();
      next =
        o.loop === false
          ? Math.max(0, Math.min(all.length - 1, next))
          : (next + all.length) % all.length;
      active = next;
      all.forEach((el, i) => {
        el.tabIndex = i === next ? 0 : -1;
        el.toggleAttribute("data-highlighted", i === next);
      });
      const item = all[next]!;
      if (o.input && target.matches("input,textarea")) {
        item.id ||= `${id}-option-${next}`;
        target.setAttribute("aria-activedescendant", item.id);
      } else item.focus();
      if (o.automatic) item.click();
    };
    root.addEventListener("keydown", key);
    root.addEventListener("input", reset);
    return () => {
      clearTimeout(timer);
      root.removeEventListener("keydown", key);
      root.removeEventListener("input", reset);
    };
  }, [id, options.open]);
}
export function useH5Layer(
  id: string,
  open: boolean,
  modal: boolean,
  close: (event?: Event) => void,
  anchorId?: string,
  manageFocus = false,
) {
  const latest = useRef(close);
  latest.current = close;
  useEffect(() => {
    if (!open || typeof document === "undefined") return;
    const panel = document.getElementById(id);
    if (!panel) return;
    panel.tabIndex = -1;
    const scope = createFocusScope(panel, {
      trapped: modal,
      loop: modal,
      autoFocus: modal || manageFocus,
      restoreFocus: modal || manageFocus,
    });
    const restore = modal
      ? hideOthers(
          [
            panel,
            ...(panel.previousElementSibling?.matches(
              ".mn-backdrop, .mn-overlay-mask, .mn-popover-backdrop, .mn-uni-popover-backdrop",
            )
              ? [panel.previousElementSibling]
              : []),
          ],
          { attribute: "inert" },
        )
      : undefined;
    const unlock = modal ? lockScroll() : undefined;
    scope.activate();
    const outside = (event: Event) => {
      const anchor = anchorId ? document.getElementById(anchorId) : undefined;
      if (
        !panel.contains(event.target as Node) &&
        !anchor?.contains(event.target as Node)
      )
        latest.current(event);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !event.defaultPrevented) {
        event.preventDefault();
        latest.current();
      }
    };
    if (!modal) {
      document.addEventListener("pointerdown", outside);
      document.addEventListener("focusin", outside);
    }
    panel.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("focusin", outside);
      panel.removeEventListener("keydown", escape);
      restore?.();
      unlock?.();
      scope.deactivate();
    };
  }, [id, open, modal, anchorId, manageFocus]);
}
