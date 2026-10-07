// Optional JSX typings for using the custom elements from React.
// Opt in with: /// <reference types="@minerva/lib-web-components/react" />
import type { DetailedHTMLProps, HTMLAttributes } from "react";
import type { ButtonProps } from "./Button/types";

type MinervaButtonAttributes = Omit<ButtonProps, "ariaLabel"> & {
  "aria-label"?: string;
};

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "minerva-button": DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & MinervaButtonAttributes,
        HTMLElement
      >;
    }
  }
}
