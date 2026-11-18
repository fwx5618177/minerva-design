import { onMounted, onUnmounted, shallowRef, type Ref } from "vue";
import { acquireFocusModality } from "@minerva/dom";

/** Register document input modality only for mounted, framed controls. */
export function useFocusModality<T extends Element>(
  existing?: Ref<T | null>,
): Ref<T | null> {
  const target: Ref<T | null> = existing ?? shallowRef<T | null>(null);
  let release: (() => void) | undefined;
  onMounted(() => {
    const doc =
      target.value?.ownerDocument ??
      (typeof document === "undefined" ? undefined : document);
    if (doc) release = acquireFocusModality(doc);
  });
  onUnmounted(() => release?.());
  return target;
}
