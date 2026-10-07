import { Slot, Slottable } from "@radix-ui/react-slot";
import { LuChevronRight } from "react-icons/lu";
import { cn } from "../../utils/cn";
import type { TextLinkProps } from "./types";
import styles from "./textLink.module.scss";

/**
 * TextLink: a styled native anchor. `asChild` slots the styling onto a router
 * link; the subtle variant appends a decorative chevron as a non-color cue.
 */
export const TextLink = ({
  asChild = false,
  variant = "default",
  className,
  children,
  ref,
  ...rest
}: TextLinkProps) => {
  const Component = asChild ? Slot : "a";
  return (
    <Component
      ref={ref}
      className={cn(
        styles.textLink,
        styles[variant],
        "ui-text-link",
        `ui-text-link-${variant}`,
        className,
      )}
      {...rest}
    >
      <Slottable>{children}</Slottable>
      {variant === "subtle" && <LuChevronRight aria-hidden="true" />}
    </Component>
  );
};

export default TextLink;
