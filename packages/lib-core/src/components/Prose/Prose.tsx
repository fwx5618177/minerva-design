import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../utils/cn";
import type { ProseProps } from "./types";
import styles from "./prose.module.scss";

/**
 * Prose: unframed, theme-aware typography for semantic HTML (articles,
 * rendered Markdown, rich-text editors). It does not parse or sanitize HTML.
 * The same rules are published as the `prose` Sass mixin (`prose.scss`).
 */
export const Prose = ({
  asChild = false,
  className,
  ref,
  ...rest
}: ProseProps) => {
  const Component = asChild ? Slot : "div";
  return (
    <Component
      ref={ref}
      className={cn(styles.prose, "ui-prose", className)}
      {...rest}
    />
  );
};

export default Prose;
