// loadData is called when an option without children (and not isLeaf) is
// activated: set `loading`, add the children, then reassign `options`.
type Option = {
  value: string;
  label: string;
  isLeaf?: boolean;
  loading?: boolean;
  children?: Option[];
};
type Cascader = HTMLElement & {
  options: Option[];
  loadData?: (selectedOptions: Option[]) => void;
};

export function setup(root: HTMLElement) {
  const cascader = root.querySelector<Cascader>("#lazy")!;
  const timers: number[] = [];
  cascader.options = [
    { value: "europe", label: "Europe" },
    { value: "asia", label: "Asia" },
  ];
  cascader.loadData = (selectedOptions) => {
    const target = selectedOptions[selectedOptions.length - 1];
    target.loading = true;
    cascader.options = [...cascader.options];
    timers.push(
      window.setTimeout(() => {
        target.loading = false;
        const last = selectedOptions.length >= 2;
        target.children = [1, 2, 3].map((n) => ({
          value: `${target.value}-${n}`,
          label: `${target.label} ${n}`,
          isLeaf: last,
        }));
        cascader.options = [...cascader.options];
      }, 800),
    );
  };
  return () => timers.forEach((id) => clearTimeout(id));
}
