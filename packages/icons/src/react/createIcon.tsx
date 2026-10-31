import type { IconDefinition } from "../engine/types";
import { Icon } from "./Icon";
import type { NamedIconProps } from "./types";

const pascal = (name: string) =>
  name.replace(/(^|-)([a-z0-9])/g, (_, __, c: string) => c.toUpperCase());

/**
 * A component for one icon (`createIcon(myIcon)` -> `<MyIcon size={20} />`),
 * like the built-in `SearchIcon`, `ArrowUpIcon`, … Only that icon is bundled.
 */
export function createIcon(icon: IconDefinition) {
  function NamedIcon(props: NamedIconProps) {
    return <Icon {...props} icon={icon} />;
  }
  NamedIcon.displayName = `${pascal(icon.name)}Icon`;
  return NamedIcon;
}
