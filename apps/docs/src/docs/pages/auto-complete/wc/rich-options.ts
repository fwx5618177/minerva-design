// Basic mode renders each option's icon, label and description; highlight
// marks recommended options, disabled ones are skipped by the keyboard.
// groupBy puts options under headings; auto-highlight makes the first
// enabled option active, so Enter picks it right away.
type Option = {
  label: string;
  value: string;
  icon?: string;
  description?: string;
  highlight?: boolean;
  disabled?: boolean;
  group?: string;
};
type Autocomplete = HTMLElement & {
  options: Option[];
  groupBy?: (option: Option) => string;
};

const OPTIONS: Option[] = [
  {
    label: "React",
    value: "react",
    icon: "⚛️",
    group: "UI libraries",
    description: "Component-based UI library",
    highlight: true,
  },
  {
    label: "Vue",
    value: "vue",
    icon: "🟩",
    group: "UI libraries",
    description: "Progressive framework",
  },
  {
    label: "Lit",
    value: "lit",
    icon: "🔥",
    group: "UI libraries",
    description: "Web Components base class",
  },
  {
    label: "Next.js",
    value: "next",
    icon: "▲",
    group: "Meta-frameworks",
    description: "React framework",
  },
  {
    label: "Nuxt",
    value: "nuxt",
    icon: "⛰️",
    group: "Meta-frameworks",
    description: "Vue framework",
  },
  {
    label: "Gatsby",
    value: "gatsby",
    icon: "🟣",
    group: "Meta-frameworks",
    description: "Deprecated in this project",
    disabled: true,
  },
];

export function setup(root: HTMLElement) {
  root.querySelectorAll<Autocomplete>("minerva-autocomplete").forEach((el) => {
    el.options = OPTIONS;
    el.groupBy = (option) => option.group ?? "";
  });
}
