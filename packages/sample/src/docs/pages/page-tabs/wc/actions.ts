// The actions slot sits outside the scrolling list: here it adds a page.
// The action slot holds any separate control next to a label (a pin toggle).
export function setup(root: HTMLElement) {
  const tabs = root.querySelector<HTMLElement & { activeValue?: string }>(
    "#tabs",
  )!;
  const add = root.querySelector<HTMLElement>("#add")!;
  let count = 2;
  const onAdd = () => {
    count += 1;
    const tab = document.createElement("minerva-page-tab") as HTMLElement & {
      value: string;
      label: string;
      closable: boolean;
    };
    tab.value = `q${count}`;
    tab.label = `Query ${count}`;
    tab.closable = true;
    tabs.insertBefore(tab, add);
    tabs.activeValue = tab.value;
  };
  const onClose = (event: Event) => {
    const { value } = (event as CustomEvent<{ value: string }>).detail;
    (event.target as HTMLElement).remove();
    if (tabs.activeValue === value) tabs.activeValue = "q1";
  };
  add.addEventListener("click", onAdd);
  tabs.addEventListener("minerva-close", onClose);
  return () => {
    add.removeEventListener("click", onAdd);
    tabs.removeEventListener("minerva-close", onClose);
  };
}
