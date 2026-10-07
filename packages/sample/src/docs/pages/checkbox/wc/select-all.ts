// The parent box mirrors its children: checked when all are, indeterminate
// (aria-checked="mixed") when only some are. `minerva-change` only fires
// for user toggles, so setting `checked` here does not loop.
type Checkbox = HTMLElement & {
  checked: boolean;
  indeterminate: boolean;
  value: string;
  updateComplete: Promise<boolean>;
};

export function setup(root: HTMLElement) {
  const all = root.querySelector<Checkbox>("#cb-all")!;
  const items = Array.from(root.querySelectorAll<Checkbox>(".cb-item"));
  const output = root.querySelector<HTMLOutputElement>("#cb-selection")!;
  const sync = () => {
    const checked = items.filter((item) => item.checked);
    all.checked = checked.length === items.length;
    all.indeterminate = checked.length > 0 && checked.length < items.length;
    output.value = `Selected: ${checked.map((item) => item.value).join(", ") || "none"}`;
  };
  const onAll = () => {
    items.forEach((item) => (item.checked = all.checked));
    sync();
  };
  all.addEventListener("minerva-change", onAll);
  items.forEach((item) => item.addEventListener("minerva-change", sync));
  // the `checked` attributes are applied on the first render
  void Promise.all(items.map((item) => item.updateComplete)).then(sync);
  return () => {
    all.removeEventListener("minerva-change", onAll);
    items.forEach((item) => item.removeEventListener("minerva-change", sync));
  };
}
