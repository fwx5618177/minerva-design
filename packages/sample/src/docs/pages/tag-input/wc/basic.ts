// `value` is a property holding a new array after every change; the
// `value` attribute only sets the initial tags.
export function setup(root: HTMLElement) {
  const tags = root.querySelector<HTMLElement & { value: string[] }>("#tags")!;
  const result = root.querySelector<HTMLOutputElement>("#result")!;
  const show = () => (result.value = `Tags: ${tags.value.join(", ") || "—"}`);
  show();
  tags.addEventListener("minerva-change", show);
  return () => tags.removeEventListener("minerva-change", show);
}
