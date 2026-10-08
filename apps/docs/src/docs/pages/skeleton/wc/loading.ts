// The skeleton is a busy region until `loaded` is set; then it renders its
// slotted content instead.
export function setup(root: HTMLElement) {
  const post = root.querySelector<HTMLElement & { loaded: boolean }>("#post")!;
  const reload = root.querySelector<HTMLElement>("#reload")!;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const load = () => {
    post.loaded = false;
    clearTimeout(timer);
    timer = setTimeout(() => (post.loaded = true), 1500);
  };
  load();
  reload.addEventListener("click", load);
  return () => {
    clearTimeout(timer);
    reload.removeEventListener("click", load);
  };
}
