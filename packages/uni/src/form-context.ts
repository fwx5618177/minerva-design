import { getCurrentInstance, inject, type ComputedRef } from "vue";
export interface FormState {
  disabled?: boolean;
  readOnly?: boolean;
  invalid?: boolean;
  required?: boolean;
  id?: string;
}
/** Resolve only omitted flags through the enclosing field; explicit false wins. */
export function inheritForm<T extends object>(props: T): T {
  const instance = getCurrentInstance();
  const parent = inject<ComputedRef<FormState> | null>("minerva:form", null);
  const names = new Set(["disabled", "readOnly", "invalid", "required"]);
  return new Proxy(props, {
    get(target, key, receiver) {
      if (typeof key === "string" && names.has(key)) {
        const attributes = instance?.vnode.props;
        const kebab = key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
        if (
          attributes?.[key] !== undefined ||
          attributes?.[kebab] !== undefined
        )
          return Reflect.get(target, key, receiver);
        return (
          parent?.value[key as keyof FormState] ??
          Reflect.get(target, key, receiver)
        );
      }
      return Reflect.get(target, key, receiver);
    },
  });
}
