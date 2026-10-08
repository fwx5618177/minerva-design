import {
  defineComponent,
  h,
  Teleport,
  type PropType,
  type SlotsType,
} from "vue";
import { useIsClient } from "./is-client";
import { useThemeScope } from "./scope";

/**
 * Portal: teleports its slot into the theme-scoped portal container (the host
 * of the closest scoped `ConfigProvider`, so nested themes keep applying) or
 * `document.body`. Every overlay renders through it.
 *
 * SSR-safe: renders nothing on the server and during hydration, then mounts
 * on the client (no hydration mismatch). Inside a scoped provider whose host
 * is not created yet it waits for the host.
 */
export const Portal = defineComponent({
  name: "MinervaPortal",
  props: {
    /** Target element; defaults to the scoped container / `document.body` */
    container: {
      type: Object as PropType<Element | null>,
      default: undefined,
    },
  },
  slots: Object as SlotsType<{ default?: () => unknown }>,
  setup(props, { slots }) {
    const client = useIsClient();
    const scope = useThemeScope();
    return () => {
      if (!client.value) return null;
      const target =
        props.container ??
        (scope?.value.scoped
          ? scope.value.portalContainer
          : (scope?.value.portalContainer ?? document.body));
      if (!target) return null;
      return h(Teleport, { to: target }, slots.default?.() as never);
    };
  },
});

export default Portal;
