// While loading the button shows a spinner, stays focusable
// (aria-busy / aria-disabled) and ignores clicks.
export function setup(root: HTMLElement) {
  const refresh = root.querySelector<HTMLElement & { loading: boolean }>(
    "#refresh",
  )!;
  const onClick = () => {
    refresh.loading = true;
    setTimeout(() => (refresh.loading = false), 1500);
  };
  refresh.addEventListener("click", onClick);
  return () => refresh.removeEventListener("click", onClick);
}
