import { onScopeDispose, watch, type Ref } from "vue";

/**
 * Counts a rendered helper text / error message in its FormControl while
 * `present`, so `aria-describedby` only references ids that exist (the
 * registration of the React `FormHelperText` / `FormErrorMessage`).
 */
export function useRegistration(
  counter: Ref<number> | undefined,
  present: () => boolean,
): void {
  if (!counter) return;
  let registered = false;
  const sync = (on: boolean) => {
    if (on === registered) return;
    registered = on;
    counter.value += on ? 1 : -1;
  };
  watch(present, sync, { immediate: true, flush: "sync" });
  onScopeDispose(() => sync(false));
}
