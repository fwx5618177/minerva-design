// Test helpers of the Angular renderer (not part of the package build).
import { type Type } from "@angular/core";
import { TestBed, type ComponentFixture } from "@angular/core/testing";
import userEvent from "@testing-library/user-event";

/**
 * Creates a (test host) component attached to `document.body`, waits until
 * it is stable (zoneless change detection) and returns the fixture.
 */
export async function render<T>(
  component: Type<T>,
): Promise<ComponentFixture<T>> {
  const fixture = TestBed.createComponent(component);
  document.body.appendChild(fixture.nativeElement as HTMLElement);
  await fixture.whenStable();
  return fixture;
}

/** user-event for happy-dom (no pointer-events check) */
export const user = () => userEvent.setup({ pointerEventsCheck: 0 });

/** Waits for pending effects / timers and a change detection round */
export async function settle<T>(
  fixture: ComponentFixture<T>,
  ms = 0,
): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
  await fixture.whenStable();
}

export { screen, within, fireEvent } from "@testing-library/dom";
