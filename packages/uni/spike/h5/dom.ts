import { nextTick } from "vue";

// Accessible-name lookup for the H5 fixture tests: aria-label, then
// aria-labelledby, then the trimmed text content.
export function accessibleName(element: Element) {
  const label = element.getAttribute("aria-label");
  if (label) return label.trim();
  const ids = element.getAttribute("aria-labelledby");
  if (ids)
    return ids
      .split(/\s+/)
      .map((id) => document.getElementById(id)?.textContent?.trim() ?? "")
      .join(" ")
      .trim();
  return (element.textContent ?? "").replace(/\s+/g, " ").trim();
}

export function queryAllByRole(
  role: string,
  name?: string,
  root: ParentNode = document,
) {
  const selector = [`[role="${role}"]`, implicit[role]]
    .filter(Boolean)
    .join(", ");
  return [...root.querySelectorAll(selector)]
    .filter((element) => {
      const explicit = element.getAttribute("role");
      return !explicit || explicit === role;
    })
    .filter((element) => name === undefined || accessibleName(element) === name)
    .filter(
      (element) => !element.closest("[hidden], [style*='display: none']"),
    );
}

export function queryByRole(
  role: string,
  name?: string,
  root: ParentNode = document,
) {
  return (
    (queryAllByRole(role, name, root)[0] as HTMLElement | undefined) ?? null
  );
}

export function getByRole(
  role: string,
  name?: string,
  root: ParentNode = document,
) {
  const element = queryByRole(role, name, root);
  if (!element) throw new Error(`No ${role} named ${name ?? "(any)"}`);
  return element;
}

const implicit: Record<string, string> = {
  button: "button",
  textbox: "input:not([type]), input[type=text], textarea",
};

export function key(
  target: EventTarget,
  value: string,
  init: KeyboardEventInit = {},
) {
  target.dispatchEvent(
    new KeyboardEvent("keydown", {
      key: value,
      bubbles: true,
      cancelable: true,
      ...init,
    }),
  );
}

export async function flush(times = 3) {
  for (let index = 0; index < times; index++) {
    await nextTick();
    await Promise.resolve();
  }
}
