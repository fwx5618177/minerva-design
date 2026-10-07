// `separator` set as a property can be a function: it returns fresh content
// for every gap (here a vertical divider).
export function setup(root: HTMLElement) {
  const links = root.querySelector<HTMLElement & { separator: () => Node }>(
    "#links",
  )!;
  links.separator = () => {
    const divider = document.createElement("minerva-divider");
    divider.setAttribute("orientation", "vertical");
    divider.setAttribute("spacing", "0");
    return divider;
  };
  // The docs use hash routing: keep the demo links from navigating
  const onClick = (event: Event) => {
    if ((event.target as Element).closest("a")) event.preventDefault();
  };
  root.addEventListener("click", onClick);
  return () => root.removeEventListener("click", onClick);
}
