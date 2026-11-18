import { Component, type Type } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { expect, it, vi } from "vitest";
import { render } from "../testing";
import { renderToString } from "../testing/ssr";
import { MnInput } from "../components/input/input";
import { MnTextarea } from "../components/textarea/textarea";
import { MnNumberInput } from "../components/number-input/number-input";
import { MnSelect } from "../components/select/select";
import { MnCascader } from "../components/cascader/cascader";
import { MnCommandDialog } from "../components/overlays";
import { MnPagination } from "../components/navigation";

const width = () =>
  document.documentElement.style.getPropertyValue(
    "--_minerva-focus-ring-width",
  );

@Component({
  imports: [
    MnInput,
    MnTextarea,
    MnNumberInput,
    MnSelect,
    MnCascader,
    MnCommandDialog,
    MnPagination,
  ],
  template: `<mn-input /><textarea mnTextarea></textarea><mn-number-input />
    <mn-select /><mn-cascader
      name="path"
      label="Path"
      [options]="[]"
    /><mn-command-dialog /><mn-pagination />`,
})
class Controls {}

it.each<Type<unknown>>([
  MnInput,
  MnTextarea,
  MnNumberInput,
  MnSelect,
  MnCascader,
  MnCommandDialog,
  MnPagination,
])("%s owns modality when mounted independently", async (component) => {
  const fixture = TestBed.createComponent(component);
  if (component === MnCascader) {
    fixture.componentRef.setInput("name", "path");
    fixture.componentRef.setInput("label", "Path");
  }
  document.body.append(fixture.nativeElement);
  try {
    await fixture.whenStable();
    document.dispatchEvent(new Event("pointerdown"));
    expect(width()).toBe("0px");
  } finally {
    fixture.destroy();
  }
  expect(width()).toBe("");
});

it("standalone controls share browser modality listeners and clean up on destroy", async () => {
  const add = vi.spyOn(document, "addEventListener");
  const fixture = await render(Controls);
  try {
    expect(width()).toBe("2px");
    expect(
      add.mock.calls.filter(([name]) => name === "pointerdown"),
    ).toHaveLength(1);
    // Components may install their own keyboard handlers; modality adds just
    // one capturing document handler regardless of the seven owners.
    expect(
      add.mock.calls.filter(
        ([name, , options]) => name === "keydown" && options === true,
      ),
    ).toHaveLength(1);
    document.dispatchEvent(new Event("pointerdown"));
    expect(width()).toBe("0px");
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "a" }));
    expect(width()).toBe("0px");
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Tab" }));
    expect(width()).toBe("2px");
  } finally {
    fixture.destroy();
    add.mockRestore();
  }
  expect(width()).toBe("");
});

it("server rendering controls does not acquire browser modality state", async () => {
  const html = await renderToString(Controls);
  expect(html).toContain("mn-input");
  expect(html).not.toContain("--_minerva-focus-ring-width");
  expect(width()).toBe("");
});
