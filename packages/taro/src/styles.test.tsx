import { readFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import { Modal, Drawer, Table, Button, ConfigProvider } from "./index";
const styleRoot = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../../../tools/styles",
);
const cssPath = resolve(styleRoot, "taro-components.css");
function installStyles() {
  expect(existsSync(cssPath)).toBe(true);
  const style = document.createElement("style");
  style.textContent =
    readFileSync(resolve(styleRoot, "mini-controls.css"), "utf8") +
    "\n" +
    readFileSync(cssPath, "utf8");
  document.head.append(style);
  return () => style.remove();
}
it("modal mask covers the viewport and content supplies a visible elevated surface", () => {
  const cleanup = installStyles();
  try {
    const close = () => {};
    const { container } = render(
      <Modal open title="Review" onOpenChange={close}>
        Body
      </Modal>,
    );
    const mask = container.querySelector(".mn-overlay-mask")!;
    expect(getComputedStyle(mask).position).toBe("absolute");
    expect(getComputedStyle(mask).inset).toBe("0");
    const panel = container.querySelector(".mn-modal__content")!;
    expect(getComputedStyle(panel).position).toBe("relative");
    expect(getComputedStyle(panel).maxHeight).toContain("min(");
  } finally {
    cleanup();
  }
});
it("drawer right panel fills viewport height and table cells form rows", () => {
  const cleanup = installStyles();
  try {
    const { container } = render(
      <>
        <Drawer open>Details</Drawer>
        <Table
          columns={[
            { key: "name", header: "Name" },
            { key: "team", header: "Team" },
          ]}
          data={[{ name: "Ada", team: "Core" }]}
        />
      </>,
    );
    expect(
      getComputedStyle(container.querySelector(".mn-drawer__content")!)
        .position,
    ).toBe("absolute");
    expect(
      getComputedStyle(container.querySelector(".mn-drawer__content")!).height,
    ).toBe("100%");
    expect(
      getComputedStyle(container.querySelector(".mn-table__row")!).display,
    ).toBe("flex");
    expect(
      getComputedStyle(container.querySelector(".mn-table__cell")!).padding,
    ).not.toBe("");
  } finally {
    cleanup();
  }
});
it("disabled button state is styled through a host-independent class", () => {
  const cleanup = installStyles();
  try {
    const { container } = render(
      <ConfigProvider>
        <Button disabled>Disabled</Button>
      </ConfigProvider>,
    );
    expect(
      Number(getComputedStyle(container.querySelector(".mn-button")!).opacity),
    ).toBe(0.5);
  } finally {
    cleanup();
  }
});
