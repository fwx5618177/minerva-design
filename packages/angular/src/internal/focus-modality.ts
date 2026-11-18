import { isPlatformBrowser } from "@angular/common";
import { DestroyRef, ElementRef, PLATFORM_ID, inject } from "@angular/core";
import { acquireFocusModality } from "@minerva/dom";

/** Explicit browser lifecycle ownership; importing controls remains SSR-safe. */
export function injectFocusModality(): void {
  const element = inject(ElementRef<HTMLElement>);
  const platform = inject(PLATFORM_ID);
  const destroy = inject(DestroyRef);
  if (isPlatformBrowser(platform)) {
    destroy.onDestroy(
      acquireFocusModality(element.nativeElement.ownerDocument),
    );
  }
}
