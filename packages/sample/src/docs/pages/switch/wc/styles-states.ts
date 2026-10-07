// `loading` blocks interaction (aria-busy) while a change is being saved.
export function setup(root: HTMLElement) {
  const sync = root.querySelector<HTMLElement & { loading: boolean }>(
    "#sw-sync",
  )!;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const onChange = () => {
    sync.loading = true;
    timer = setTimeout(() => (sync.loading = false), 1200);
  };
  sync.addEventListener("minerva-change", onChange);
  return () => {
    clearTimeout(timer);
    sync.removeEventListener("minerva-change", onChange);
  };
}
