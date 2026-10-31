import { getIcon } from "../engine/registry";
import { Icon } from "./Icon";
import type { DynamicIconProps } from "./types";

/**
 * A built-in icon chosen by name at runtime (from data, a CMS…). It bundles
 * the whole set: prefer `Icon` with an icon constant, or the named
 * components, when the icon is known when writing the code.
 */
export function DynamicIcon({ name, ...props }: DynamicIconProps) {
  const icon = getIcon(name);
  return icon ? <Icon {...props} icon={icon} /> : null;
}
