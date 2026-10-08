import { Slot, Slottable } from "../../internal/Slot";
import { IconChevronRight } from "../../internal/icons";
import { linkRel } from "@minerva/core";
import { cn } from "../../utils/cn";
import { safeHref } from "../../internal/safeUrl";
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
  // Only the attributes the caller passed: with `asChild` the child's own
  // href / rel must not be overridden by `undefined`.
  const link: { href?: string; rel?: string } = {};
  if ("href" in rest) link.href = safeHref("TextLink", rest.href);
  if ("href" in rest || "target" in rest || "rel" in rest) {
    link.rel = linkRel(rest.target, rest.rel);
  }
  return (
    <Component
      ref={ref}
      className={cn(styles.textLink, styles[variant], className)}
      {...rest}
      {...link}
    >
      <Slottable>{children}</Slottable>
      {variant === "subtle" && <IconChevronRight aria-hidden="true" />}
    </Component>
  );
};

export default TextLink;
