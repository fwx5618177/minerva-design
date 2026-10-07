import { useMemo, type Ref, type RefCallback } from "react";

/** Assign `node` to a callback or object ref. Returns the callback's cleanup. */
const assignRef = <T>(ref: Ref<T> | undefined, node: T | null) => {
  if (typeof ref === "function") return ref(node);
  if (ref) (ref as { current: T | null }).current = node;
};

/**
 * Combine several refs (callback or object refs) into one callback ref.
 * Supports React 19 ref cleanup functions returned by callback refs.
 */
export function mergeRefs<T>(
  ...refs: Array<Ref<T> | undefined>
): RefCallback<T> {
  return (node) => {
    const cleanups = refs.map((ref) => assignRef(ref, node));
    return () => {
      refs.forEach((ref, i) => {
        const cleanup = cleanups[i];
        if (typeof cleanup === "function") cleanup();
        else assignRef(ref, null);
      });
    };
  };
}

/** Memoized `mergeRefs` for two refs (e.g. an internal ref and the `ref` prop). */
export function useMergedRefs<T>(
  a: Ref<T> | undefined,
  b: Ref<T> | undefined,
): RefCallback<T> {
  return useMemo(() => mergeRefs(a, b), [a, b]);
}
