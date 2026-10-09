import {
  ref,
  onMounted,
  onBeforeUnmount,
  getCurrentInstance,
  type Ref,
} from "vue";
/** Observe actual H5 container width; native hosts measure the component and
 * remeasure on window resize. With no target this follows the viewport. */
export function useResponsiveWidth(target?: Ref<unknown>, selector?: string) {
  const instance = getCurrentInstance();
  function viewport() {
    try {
      const width = uni.getSystemInfoSync?.().windowWidth;
      if (Number.isFinite(width) && width > 0) return width;
    } catch {
      /* SSR or a host without synchronous system information. */
    }
    return typeof window === "undefined" ? 1024 : window.innerWidth;
  }
  function element(value: unknown): HTMLElement | undefined {
    return (
      value && typeof value === "object" && "$el" in value ? value.$el : value
    ) as HTMLElement | undefined;
  }
  const width = ref(viewport());
  let observer: ResizeObserver | undefined;
  let frame: number | undefined;
  function measure() {
    if (!target) {
      width.value = viewport();
      return;
    }
    const el = element(target.value);
    if (el && typeof el.getBoundingClientRect === "function") {
      const next = el.getBoundingClientRect().width;
      if (next > 0) width.value = next;
      return;
    }
    try {
      const query = uni.createSelectorQuery?.();
      if (query && selector)
        query
          .in(instance?.proxy)
          .select(selector)
          .boundingClientRect((rect) => {
            if (
              !Array.isArray(rect) &&
              typeof rect?.width === "number" &&
              rect.width > 0
            )
              width.value = rect.width;
          })
          .exec();
    } catch {
      /* host measurement may be unavailable before its first layout */
    }
  }
  function resize(event?: { size?: { windowWidth?: number } }) {
    if (!target && event?.size?.windowWidth) {
      width.value = event.size.windowWidth;
      return;
    }
    measure();
  }
  onMounted(() => {
    measure();
    const el = element(target?.value);
    if (el && typeof ResizeObserver !== "undefined" && el.nodeType === 1) {
      observer = new ResizeObserver((entries) => {
        const next = entries[0]?.contentRect.width;
        if (next > 0) {
          if (typeof requestAnimationFrame === "function") {
            if (frame !== undefined) cancelAnimationFrame(frame);
            frame = requestAnimationFrame(() => (width.value = next));
          } else width.value = next;
        }
      });
      observer.observe(el);
    }
    uni.onWindowResize?.(resize);
    if (typeof window !== "undefined")
      window.addEventListener("resize", measure);
  });
  onBeforeUnmount(() => {
    observer?.disconnect();
    if (frame !== undefined) cancelAnimationFrame(frame);
    uni.offWindowResize?.(resize);
    if (typeof window !== "undefined")
      window.removeEventListener("resize", measure);
  });
  return width;
}
