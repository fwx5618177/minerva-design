import { readFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import {
  Modal,
  Drawer,
  Table,
  Button,
  ConfigProvider,
  Input,
  QuadrantTaskBoard,
} from "./index";
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
it("inputs pad their field once, whatever their size", () => {
  const cleanup = installStyles();
  try {
    const { container } = render(
      <>
        {(["small", "medium", "large"] as const).map((size) => (
          <Input key={size} size={size} aria-label={size} />
        ))}
      </>,
    );
    const roots = [...container.querySelectorAll(".mn-input-root")];
    expect(roots).toHaveLength(3);
    for (const root of roots) {
      // the shared .mn-size-* rules pad buttons: not the input root
      expect(getComputedStyle(root).paddingLeft).toBe("0px");
      expect(getComputedStyle(root).paddingRight).toBe("0px");
    }
  } finally {
    cleanup();
  }
});
it("quadrant task board headers are single-line pills in a 2 x 2 grid", () => {
  const cleanup = installStyles();
  try {
    const { container } = render(
      <QuadrantTaskBoard
        locale="en"
        points={[{ x: 2, y: 8, label: "Write report" }]}
        quadrants={{
          topLeft: { label: "Important and urgent work", badge: "Q1" },
        }}
        onPointsChange={() => {}}
      />,
    );
    const grid = container.querySelector(".mn-quadrant-task-board__quadrants")!;
    expect(getComputedStyle(grid).display).toBe("grid");
    expect(getComputedStyle(grid).gridTemplateColumns).toBe(
      "repeat(2, minmax(0, 1fr))",
    );
    const header = container.querySelector(".mn-quadrant-task-board__header")!;
    // presentation lives in the stylesheet, not in inline styles
    expect(header.getAttribute("style") ?? "").toBe("");
    expect(getComputedStyle(header).display).toBe("flex");
    expect(getComputedStyle(header).whiteSpace).toBe("nowrap");
    expect(getComputedStyle(header).borderRadius).toBe("999px");
    const title = header.querySelector(".mn-quadrant-task-board__title")!;
    expect(getComputedStyle(title).overflow).toBe("hidden");
    expect(getComputedStyle(title).textOverflow).toBe("ellipsis");
    expect(getComputedStyle(title).minWidth).toBe("0");
    for (const chip of ["badge", "count"]) {
      const el = header.querySelector(`.mn-quadrant-task-board__${chip}`)!;
      expect(getComputedStyle(el).borderRadius).toBe("999px");
      expect(getComputedStyle(el).flex).toMatch(/^(none|0 0 auto)$/);
    }
    const add = header.querySelector(".mn-quadrant-task-board__add")!;
    expect(getComputedStyle(add).width).toBe("24px");
    expect(getComputedStyle(add).paddingLeft).toBe("0px");
  } finally {
    cleanup();
  }
});
