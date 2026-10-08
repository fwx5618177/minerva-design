import type { WcHookScenario } from "../types";

const sections = [
  {
    id: "main",
    title: "Main",
    items: [
      { id: "home", label: "Home", href: "/" },
      {
        id: "docs",
        label: "Docs",
        description: "Guides",
        children: [{ id: "intro", label: "Intro" }],
      },
      { id: "off", label: "Off", disabled: true },
    ],
  },
];

export default [
  {
    name: "sections, branch, active",
    html: `<minerva-nav-tree active-id="intro"></minerva-nav-tree>`,
    setup: (root) => {
      root.querySelector<HTMLElement & { sections: unknown }>(
        "minerva-nav-tree",
      )!.sections = sections;
    },
  },
] satisfies WcHookScenario[];
