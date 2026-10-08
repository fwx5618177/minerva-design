import type { HTMLAttributes, Ref } from "react";

export interface ProseProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Merges the prose class onto its single child (e.g. an editor host)
   * instead of rendering a wrapper <div>
   * @default false
   */
  asChild?: boolean;
  /** Ref to the root element */
  ref?: Ref<HTMLDivElement>;
}
