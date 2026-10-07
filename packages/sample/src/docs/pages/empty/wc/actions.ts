// Actions are regular elements slotted into `action` / `secondary-action`;
// the default slot is the footer.
export function setup(root: HTMLElement) {
  const create = root.querySelector<HTMLElement>("#create")!;
  const status = root.querySelector<HTMLOutputElement>("#status")!;
  const onClick = () => (status.value = "Project created");
  create.addEventListener("click", onClick);
  return () => create.removeEventListener("click", onClick);
}
