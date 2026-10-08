// Built-in texts follow the `locale` of the closest <minerva-config>
// (or the closest `lang` attribute) and update live when it changes.
export function setup(root: HTMLElement) {
  const select = root.querySelector<HTMLSelectElement>("#locale")!;
  const scope = root.querySelector<HTMLElement & { locale: string }>("#scope")!;
  const onChange = () => (scope.locale = select.value);
  select.addEventListener("change", onChange);
  return () => select.removeEventListener("change", onChange);
}
