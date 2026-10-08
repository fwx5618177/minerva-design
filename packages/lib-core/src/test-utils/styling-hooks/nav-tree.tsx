import { NavTree } from "../../components/NavTree";
import type { HookScenario } from "./types";

const sections = [
  {
    id: "main",
    title: "Main",
    items: [
      { id: "home", label: "Home", href: "/", icon: <svg /> },
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
    element: <NavTree sections={sections} activeId="intro" />,
  },
] satisfies HookScenario[];
