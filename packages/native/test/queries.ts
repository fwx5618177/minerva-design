// Role queries for container roles. RNTL's `*ByRole` only matches
// accessibility elements (`accessible` views, Text, TextInput, Switch), but
// a container such as a dialog, tab list, radio group or navigation must NOT
// be `accessible` on iOS (VoiceOver would merge its children into one
// element). These helpers match any host view by its `role` /
// `accessibilityRole` and accessible name, like the web queries do.
import { screen } from "@testing-library/react-native";
import {
  computeAccessibleName,
  getRole,
  isHiddenFromAccessibility,
} from "@testing-library/react-native/dist/helpers/accessibility";
import type { TestInstance } from "test-renderer";

export type Host = TestInstance;

const matches = (value: string, expected?: string | RegExp) =>
  expected === undefined ||
  (typeof expected === "string" ? value === expected : expected.test(value));

/** Every host element of the tree, document order */
export function hostElements(root: Host = screen.container): Host[] {
  const out: Host[] = [];
  const visit = (node: Host) => {
    out.push(node);
    for (const child of node.children)
      if (typeof child !== "string") visit(child);
  };
  visit(root);
  return out;
}

export function queryAllByRoleDeep(
  role: string,
  { name }: { name?: string | RegExp } = {},
  root?: Host,
): Host[] {
  return hostElements(root).filter(
    (el) =>
      typeof el.type === "string" &&
      getRole(el) === role &&
      !isHiddenFromAccessibility(el) &&
      matches(computeAccessibleName(el) ?? "", name),
  );
}

export function getByRoleDeep(
  role: string,
  options: { name?: string | RegExp } = {},
  root?: Host,
): Host {
  const [found, ...more] = queryAllByRoleDeep(role, options, root);
  if (!found) throw new Error(`No ${role} ${options.name ?? ""}`);
  if (more.length) throw new Error(`Several ${role} ${options.name ?? ""}`);
  return found;
}

/** The host view of a styling-hook part (`dataSet.part`) */
export function queryPart(
  name: string,
  component?: string,
  root?: Host,
): Host | null {
  return (
    hostElements(root).find(
      (el) =>
        el.props.dataSet?.part === name &&
        (!component || el.props.dataSet?.minerva === component),
    ) ?? null
  );
}
