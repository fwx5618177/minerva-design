// `options` is a JS property (flat options and / or labelled groups),
// rendered before any <minerva-option> children. minerva-open-change is
// cancelable: preventDefault() keeps the listbox closed.
type Option = { value: string; label: string; disabled?: boolean };
type Group = { label: string; options: Option[] };

export function setup(root: HTMLElement) {
  const select = root.querySelector<
    HTMLElement & { options: Array<Option | Group> }
  >("#country")!;
  const lock = root.querySelector<HTMLInputElement>("#lock")!;
  const log = root.querySelector<HTMLOutputElement>("#log")!;
  select.options = [
    {
      label: "Europe",
      options: [
        { value: "fr", label: "France" },
        { value: "de", label: "Germany" },
        { value: "it", label: "Italy", disabled: true },
      ],
    },
    {
      label: "Asia",
      options: [
        { value: "cn", label: "China" },
        { value: "jp", label: "Japan" },
      ],
    },
  ];
  const onChange = (event: Event) => {
    const { value } = (event as CustomEvent<{ value: string }>).detail;
    log.value = `minerva-change: ${value}`;
  };
  const onOpenChange = (event: Event) => {
    if (lock.checked) event.preventDefault();
  };
  select.addEventListener("minerva-change", onChange);
  select.addEventListener("minerva-open-change", onOpenChange);
  return () => {
    select.removeEventListener("minerva-change", onChange);
    select.removeEventListener("minerva-open-change", onOpenChange);
  };
}
