// While `invalid`, the error message replaces the helper text and the
// control gets `invalid` + aria-invalid; turning it off restores both.
export function setup(root: HTMLElement) {
  const field = root.querySelector<HTMLElement & { invalid: boolean }>(
    "#fc-username",
  )!;
  const toggle = root.querySelector<HTMLElement>("#fc-toggle")!;
  const onClick = () => (field.invalid = !field.invalid);
  toggle.addEventListener("click", onClick);
  return () => toggle.removeEventListener("click", onClick);
}
