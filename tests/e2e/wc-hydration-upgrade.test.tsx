// React 19 hydration of server-rendered composite elements whose
// definitions load AFTER the markup was parsed (the usual case: module
// scripts run once the HTML is parsed, so the tags are upgraded in place).
// The upgraded items must not write host attributes of their own before
// React hydrated them.
import { hydrateRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { act } from "react";
import { expect, it, vi } from "vitest";
import {
  CompositePage,
  attributes,
  expectSettledA11y,
  installInternals,
  litUpdates,
  nextFrames,
  withoutReflectedState,
} from "./wc-hydration-fixtures";

installInternals();

/**
 * happy-dom upgrades parsed elements on `define()` without enqueuing
 * `attributeChangedCallback` for their existing observed attributes
 * (browsers do, HTML spec "upgrade an element"): replayed here.
 */
function replayAttributes(root: ParentNode) {
  for (const el of Array.from(root.querySelectorAll("*"))) {
    const ctor = customElements.get(el.localName) as
      | (CustomElementConstructor & { observedAttributes?: string[] })
      | undefined;
    const upgraded = el as Element & {
      attributeChangedCallback?(n: string, o: null, v: string): void;
    };
    for (const name of ctor?.observedAttributes ?? []) {
      const value = el.getAttribute(name);
      if (value !== null)
        upgraded.attributeChangedCallback?.(name, null, value);
    }
  }
}

it("upgraded tabs, radios and options hydrate without mismatches", async () => {
  const html = renderToString(<CompositePage />);
  document.body.innerHTML = `<div id="root">${html}</div>`;
  const container = document.getElementById("root")!;
  const before = attributes(container);
  // the page's script: the element classes are loaded, then registered and
  // hydrated in the same task (React hydrates in a later one)
  const [{ defineElement }, tabsModule, radio, select, option] =
    await Promise.all([
      import("../../packages/lib-web-components/src/internal/define"),
      import("../../packages/lib-web-components/src/components/tabs/tabs"),
      import("../../packages/lib-web-components/src/components/radio/radio"),
      import("../../packages/lib-web-components/src/components/select/select"),
      import("../../packages/lib-web-components/src/components/select/option"),
    ]);
  expect(customElements.get("minerva-tabs")).toBeUndefined();
  for (const element of [
    tabsModule.MinervaTabs,
    tabsModule.MinervaTab,
    tabsModule.MinervaTabPanel,
    radio.MinervaRadioGroup,
    radio.MinervaRadio,
    select.MinervaSelect,
    option.MinervaOption,
    option.MinervaOptionGroup,
    option.MinervaSelectLabel,
  ]) {
    defineElement(element);
  }
  replayAttributes(container);
  await litUpdates(container);
  expect(container.querySelector("minerva-tab")!.shadowRoot).not.toBeNull();
  expect(withoutReflectedState(attributes(container))).toEqual(before);

  const errors = vi.spyOn(console, "error").mockImplementation(() => {});
  const recoverable: unknown[] = [];
  await act(async () => {
    hydrateRoot(container, <CompositePage />, {
      onRecoverableError: (error) => recoverable.push(error),
    });
  });
  expect(recoverable).toEqual([]);
  expect(errors.mock.calls).toEqual([]);

  await nextFrames();
  await litUpdates(container);
  expectSettledA11y(container);

  // (keyboard roving of deferred items: src/internal/hydration.test.ts of
  // lib-web-components, whose setup routes events through slots)
  expect(errors.mock.calls).toEqual([]);
  errors.mockRestore();
});
