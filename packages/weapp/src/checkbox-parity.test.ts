import simulate from "miniprogram-simulate";
import { expect, it } from "vitest";
import { checkbox } from "./index";
it("native checkbox exposes semantic classes, helper and form state", async () => {
  const id = simulate.load({
    tagName: "mn-checkbox",
    template: checkbox.template,
    ...checkbox.definition,
  });
  const wrapper = simulate.render(id, {
    checked: true,
    color: "danger",
    size: "large",
    shape: "circle",
    labelPlacement: "start",
    error: true,
    required: true,
    helperText: "Required",
    label: "Terms",
  });
  wrapper.attach(document.createElement("div"));
  expect(wrapper.dom!.innerHTML).toContain("mn-choice-color-danger");
  expect(wrapper.dom!.innerHTML).toContain("mn-choice-size-large");
  expect(wrapper.dom!.innerHTML).toContain("mn-choice-shape-circle");
  expect(wrapper.dom!.innerHTML).toContain("mn-choice-label-start");
  // miniprogram-simulate strips ARIA attributes; verify native template bindings.
  expect(checkbox.template).toContain('aria-invalid="{{error}}"');
  expect(checkbox.template).toContain('aria-required="{{required}}"');
  expect(wrapper.querySelector(".mn-choice-helper")!.dom!.textContent).toBe(
    "Required",
  );
  const changes: unknown[] = [];
  wrapper.addEventListener("change", (e) => changes.push(e.detail));
  wrapper.querySelector(".mn-choice")!.dispatchEvent("tap");
  await simulate.sleep(0);
  expect(changes).toEqual([{ checked: false }]);
  expect(wrapper.data.effectiveChecked).toBe(true);
  wrapper.detach();
});
