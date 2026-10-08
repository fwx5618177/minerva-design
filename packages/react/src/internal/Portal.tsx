import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { useThemeScope } from "./themeScope";
import { useIsClient } from "./useIsClient";

export interface PortalProps {
  /** Content rendered into the container. */
  children?: ReactNode;
  /**
   * Element the content is rendered into. Defaults to the portal host of the
   * closest scoped `ConfigProvider` (so the scoped theme applies), else
   * `document.body`.
   */
  container?: Element | null;
}

/**
 * Portal: renders `children` into the theme-scoped portal container (see
 * `usePortalContainer`) or `document.body`. Every React overlay must
 * portal through this component so nested `ConfigProvider` themes keep
 * applying to portalled content.
 *
 * SSR-safe: renders nothing on the server and during hydration, then mounts
 * on the client. Inside a scoped provider whose host element is not created
 * yet (first client render), it waits for the host instead of flashing the
 * content into `document.body`.
 */
export const Portal = ({ children, container }: PortalProps) => {
  const isClient = useIsClient();
  const scope = useThemeScope();
  if (!isClient) return null;
  if (container) return createPortal(children, container);
  if (scope?.scoped && !scope.portalContainer) return null;
  return createPortal(children, scope?.portalContainer ?? document.body);
};

export default Portal;
