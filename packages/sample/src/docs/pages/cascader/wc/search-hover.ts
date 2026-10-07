// show-search filters every path, expand-trigger="hover" opens sub-menus on
// hover, displayRender formats the text of the field. Disabled options
// cannot be picked.
type Option = {
  value: string;
  label: string;
  disabled?: boolean;
  children?: Option[];
};
type Cascader = HTMLElement & {
  options: Option[];
  displayRender?: (labels: string[]) => string;
};

const options: Option[] = [
  {
    value: "electronics",
    label: "Electronics",
    children: [
      { value: "phones", label: "Phones" },
      { value: "laptops", label: "Laptops" },
      { value: "cameras", label: "Cameras", disabled: true },
    ],
  },
  {
    value: "home",
    label: "Home",
    children: [
      { value: "kitchen", label: "Kitchen" },
      { value: "garden", label: "Garden" },
    ],
  },
];

export function setup(root: HTMLElement) {
  root.querySelectorAll<Cascader>("minerva-cascader").forEach((cascader) => {
    cascader.options = options;
  });
  const formatted = root.querySelector<Cascader>("#formatted")!;
  formatted.displayRender = (labels) => labels[labels.length - 1] ?? "";
}
