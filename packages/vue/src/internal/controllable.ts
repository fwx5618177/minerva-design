import {
  computed,
  getCurrentInstance,
  ref,
  watch,
  type WritableComputedRef,
} from "vue";

const defaultPropOf = (prop: string) =>
  `default${prop.charAt(0).toUpperCase()}${prop.slice(1)}`;

/**
 * Controlled / uncontrolled value of a `v-model` prop (`modelValue`,
 * `v-model:open`...): the prop wins while it is not `undefined` (declare
 * boolean models with a `default: undefined` so Vue does not cast a missing
 * prop to `false`); otherwise an internal value, seeded from `defaultX`.
 *
 * Writing it emits `update:<prop>` (and calls `onChange`) when the value
 * changes; the internal value only follows while uncontrolled, exactly like
 * `useControllableState` of the React renderer.
 */
export function useControllable<T>(
  props: Record<string, unknown>,
  prop: string,
  options: {
    /** Prop with the initial uncontrolled value (default `default<Prop>`) */
    defaultProp?: string;
    /** Fallback when neither the prop nor the default prop is set */
    fallback: T;
    /** Called after `update:<prop>` with the new value */
    onChange?: (value: T) => void;
    /** Component name of the development warning */
    name?: string;
  },
): WritableComputedRef<T> {
  const instance = getCurrentInstance();
  const emit = instance?.emit as
    ((event: string, ...args: unknown[]) => void) | undefined;
  const defaultProp = options.defaultProp ?? defaultPropOf(prop);
  const initial = props[defaultProp];
  const internal = ref(
    initial !== undefined ? (initial as T) : options.fallback,
  );
  const controlled = () => props[prop] !== undefined;

  if (process.env.NODE_ENV !== "production") {
    const wasControlled = controlled();
    let warned = false;
    watch(controlled, (now) => {
      if (warned || now === wasControlled) return;
      warned = true;
      console.error(
        `${options.name ?? "Component"}: a component is changing ${
          wasControlled ? "a controlled" : "an uncontrolled"
        } \`${prop}\` to be ${now ? "controlled" : "uncontrolled"}. Use either \`${prop}\` (v-model) or \`${defaultProp}\`, not both over its lifetime.`,
      );
    });
  }

  return computed<T>({
    get: () => (controlled() ? (props[prop] as T) : (internal.value as T)),
    set(next) {
      const prev = controlled() ? (props[prop] as T) : (internal.value as T);
      if (Object.is(next, prev)) return;
      if (!controlled()) internal.value = next;
      emit?.(`update:${prop}`, next);
      options.onChange?.(next);
    },
  });
}
