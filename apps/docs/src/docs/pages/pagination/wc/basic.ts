// Without a listener cancelling it, the element updates `current` itself;
// minerva-page-change reports the new page and page size.
export function setup(root: HTMLElement) {
  const pager = root.querySelector<HTMLElement & { totalPages: number }>(
    "#pager",
  )!;
  const output = root.querySelector<HTMLOutputElement>("#page")!;
  const onChange = (event: Event) => {
    const { page } = (event as CustomEvent<{ page: number }>).detail;
    output.value = `Page ${page} of ${pager.totalPages}`;
  };
  pager.addEventListener("minerva-page-change", onChange);
  return () => pager.removeEventListener("minerva-page-change", onChange);
}
