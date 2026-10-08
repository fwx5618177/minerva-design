// The close button fires `minerva-close`: remove (here: hide) the tag in the
// listener, and move focus to a neighbour so it is not lost.
export function setup(root: HTMLElement) {
  const tags = root.querySelector<HTMLElement>("#tags")!;
  const restore = root.querySelector<HTMLElement>("#restore")!;
  const all = () => [...tags.children] as HTMLElement[];
  const onClose = (event: Event) => {
    const tag = event.target as HTMLElement;
    const visible = all().filter((t) => !t.hidden);
    const index = visible.indexOf(tag);
    const next = visible[index + 1] ?? visible[index - 1] ?? restore;
    tag.hidden = true;
    next.focus();
  };
  const onRestore = () => all().forEach((tag) => (tag.hidden = false));
  tags.addEventListener("minerva-close", onClose);
  restore.addEventListener("click", onRestore);
  return () => {
    tags.removeEventListener("minerva-close", onClose);
    restore.removeEventListener("click", onRestore);
  };
}
