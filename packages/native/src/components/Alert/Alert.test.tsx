import {
  fireEvent,
  render,
  screen,
  userEvent,
} from "@testing-library/react-native";
import { resolveTokens } from "@minerva/core";
import { useState } from "react";
import { Text } from "react-native";
import { describe, expect, it, vi } from "vitest";
import { MinervaProvider } from "../../theme/MinervaProvider";
import { getByRoleDeep, queryPart } from "../../../test/queries";
import { Button } from "../Button";
import { Alert } from "./Alert";

const light = resolveTokens({ design: { preset: "touch" } });

describe("Alert", () => {
  it("info: a polite status with its icon, title and description", async () => {
    await render(<Alert title="Heads up">Body text</Alert>);
    const root = getByRoleDeep("status", { name: "Heads up" });
    expect(root.props.accessibilityLiveRegion).toBe("polite");
    expect(root.props.dataSet).toMatchObject({
      color: "info",
      variant: "subtle",
      size: "medium",
    });
    expect(screen.getByRole("img", { name: "info icon" })).toBeTruthy();
    expect(screen.getByText("Body text")).toBeTruthy();
  });

  it.each(["danger", "warning"] as const)(
    "%s: an assertive alert",
    async (color) => {
      await render(<Alert color={color}>Oops</Alert>);
      const root = getByRoleDeep("alert");
      expect(root.props.accessibilityLiveRegion).toBe("assertive");
      expect(screen.getByRole("img", { name: `${color} icon` })).toBeTruthy();
    },
  );

  it("role override and hidden icon", async () => {
    await render(
      <Alert color="danger" role="status" showIcon={false}>
        x
      </Alert>,
    );
    expect(getByRoleDeep("status")).toBeTruthy();
    expect(screen.queryByRole("img")).toBeNull();
  });

  it("closes with the close button", async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    await render(
      <Alert closable onClose={onClose}>
        Closable
      </Alert>,
    );
    const close = screen.getByRole("button", { name: "Close" });
    expect(close.props.hitSlop).toEqual({
      top: 10,
      bottom: 10,
      left: 10,
      right: 10,
    });
    await user.press(close);
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(screen.queryByText("Closable")).toBeNull();
  });

  it("collapsible: uncontrolled toggle with onExpand", async () => {
    const onExpand = vi.fn();
    await render(
      <Alert title="Details" collapsible onExpand={onExpand}>
        More
      </Alert>,
    );
    const toggle = screen.getByRole("button", { name: "Collapse" });
    expect(toggle).toBeExpanded();
    await fireEvent.press(toggle);
    expect(onExpand).toHaveBeenCalledWith(false);
    expect(screen.queryByText("More")).toBeNull();
    expect(screen.getByRole("button", { name: "Expand" })).toBeCollapsed();
  });

  it("collapsible: controlled", async () => {
    const onExpand = vi.fn();
    function App() {
      const [open, setOpen] = useState(false);
      return (
        <Alert
          title="T"
          collapsible
          expanded={open}
          onExpand={(next) => {
            onExpand(next);
            setOpen(next);
          }}
        >
          Hidden
        </Alert>
      );
    }
    await render(<App />);
    expect(screen.queryByText("Hidden")).toBeNull();
    await fireEvent.press(screen.getByRole("button", { name: "Expand" }));
    expect(onExpand).toHaveBeenCalledWith(true);
    expect(screen.getByText("Hidden")).toBeTruthy();
  });

  it("renders an action and custom icon", async () => {
    await render(
      <Alert icon={<Text>!</Text>} action={<Button size="small">Undo</Button>}>
        Saved
      </Alert>,
    );
    expect(screen.getByRole("button", { name: "Undo" })).toBeTruthy();
    expect(screen.getByText("!")).toBeTruthy();
  });

  it.each(["subtle", "outline", "solid"] as const)(
    "token colors of the %s variant",
    async (variant) => {
      await render(
        <MinervaProvider theme="light">
          <Alert color="success" variant={variant}>
            x
          </Alert>
        </MinervaProvider>,
      );
      expect(queryPart("root", "alert")).toHaveStyle({
        backgroundColor:
          variant === "solid"
            ? light.colors["success-color"]
            : variant === "outline"
              ? "transparent"
              : light.colors["success-color-subtle"],
      });
    },
  );

  it.each(["small", "medium", "large"] as const)(
    "renders the %s size",
    async (size) => {
      await render(<Alert size={size}>x</Alert>);
      expect(queryPart("root", "alert")?.props.dataSet.size).toBe(size);
    },
  );

  it("banner mode has square corners", async () => {
    await render(<Alert banner>x</Alert>);
    expect(queryPart("root", "alert")).toHaveStyle({ borderRadius: 0 });
  });

  it("localized labels", async () => {
    await render(
      <MinervaProvider locale={{ language: "zh" }}>
        <Alert title="T" closable collapsible>
          x
        </Alert>
      </MinervaProvider>,
    );
    expect(screen.getByRole("button", { name: "关闭" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "收起" })).toBeTruthy();
  });
});
