import { StrictMode, createRef } from "react";
import { renderToString } from "react-dom/server";
import { render, fireEvent, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Input } from "./Input";
import { Textarea } from "./Textarea";
import { NumberInput } from "./NumberInput";
import { Select } from "./Select";
import { Cascader } from "./Cascader";
import { Pagination } from "./Pagination";
import { CommandDialog } from "./Command";

const width = () =>
  document.documentElement.style.getPropertyValue(
    "--_minerva-focus-ring-width",
  );
const cases = [
  ["Input", <Input aria-label="field" />],
  ["Textarea", <Textarea aria-label="field" />],
  ["NumberInput", <NumberInput aria-label="field" />],
  ["Select", <Select aria-label="field">{null}</Select>],
  ["Cascader", <Cascader label="field" name="field" options={[]} />],
  ["Pagination", <Pagination total={100} />],
  [
    "Command",
    <CommandDialog
      defaultOpen
      items={[]}
      onSelect={() => {}}
      title="Commands"
    />,
  ],
] as const;

describe("control focus modality lifecycle", () => {
  it.each(cases)(
    "%s registers pointer and keyboard events only while mounted",
    (_name, element) => {
      const before = width();
      const view = render(<StrictMode>{element}</StrictMode>);
      fireEvent.pointerDown(document.body);
      expect(width()).toBe("0px");
      fireEvent.keyDown(document.body, { key: "Tab" });
      expect(width()).toBe("2px");
      view.unmount();
      expect(width()).toBe(before);
      fireEvent.pointerDown(document.body);
      expect(width()).toBe(before);
    },
  );

  it("tracks pointer opening before the first Command panel mounts", () => {
    const view = render(
      <CommandDialog
        open={false}
        onOpenChange={() => {}}
        items={[]}
        onSelect={() => {}}
        title="Commands"
      />,
    );
    fireEvent.pointerDown(document.body);
    view.rerender(
      <CommandDialog
        open
        onOpenChange={() => {}}
        items={[]}
        onSelect={() => {}}
        title="Commands"
      />,
    );
    expect(width()).toBe("0px");
    view.unmount();
  });

  it("registers the actual owner document when rendered in another document", () => {
    const doc = document.implementation.createHTMLDocument("Embedded");
    const container = doc.createElement("div");
    doc.body.append(container);
    const view = render(<Input aria-label="Embedded" />, { container });
    doc.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true }));
    expect(
      doc.documentElement.style.getPropertyValue("--_minerva-focus-ring-width"),
    ).toBe("0px");
    expect(width()).toBe("");
    view.unmount();
    expect(
      doc.documentElement.style.getPropertyValue("--_minerva-focus-ring-width"),
    ).toBe("");
  });

  it("SSR does not acquire document listeners", () => {
    renderToString(<Input aria-label="Server field" />);
    fireEvent.pointerDown(document.body);
    expect(width()).toBe("");
  });

  it("keeps another control registered when one unmounts and preserves forwarded refs", () => {
    const ref = createRef<HTMLInputElement>();
    const first = render(<Input ref={ref} aria-label="first" />);
    const second = render(<Textarea aria-label="second" />);
    expect(ref.current).toBe(screen.getByRole("textbox", { name: "first" }));
    first.unmount();
    fireEvent.pointerDown(document.body);
    expect(width()).toBe("0px");
    second.unmount();
    expect(width()).toBe("");
  });
});
