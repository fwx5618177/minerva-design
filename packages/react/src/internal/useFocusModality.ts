import { useEffect, useRef, type RefObject } from "react";
import { acquireFocusModality } from "@minerva/dom";

/** Register document input modality only for mounted, framed controls. */
export function useFocusModality<T extends Element>(
  existing?: RefObject<T | null>,
) {
  const internal = useRef<T>(null);
  const target = existing ?? internal;
  useEffect(() => {
    const doc =
      target.current?.ownerDocument ??
      (typeof document === "undefined" ? undefined : document);
    if (doc) return acquireFocusModality(doc);
  }, [target]);
  return target;
}
