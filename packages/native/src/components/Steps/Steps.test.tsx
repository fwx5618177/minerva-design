import {
  fireEvent,
  render,
  screen,
  userEvent,
} from "@testing-library/react-native";
import { describe, expect, it, vi } from "vitest";
import { resolveTokens } from "@minerva/core";
import { MinervaProvider } from "../../theme/MinervaProvider";
import { getByRoleDeep, hostElements } from "../../../test/queries";
import { Steps, type StepsItem } from "./Steps";

const light = resolveTokens({ mode: "light", design: { preset: "touch" } });
const items: StepsItem[] = [
  { value: "cart", title: "Cart" },
  { value: "address", title: "Address", description: "Where to ship" },
  { value: "pay", title: "Pay" },
  { value: "done", title: "Done", disabled: true },
];
const indicators = () =>
  hostElements().filter((el) => el.props.dataSet?.part === "indicator");

describe("Steps", () => {
  it("read-only by default: a labelled list of 'title, status' items", async () => {
    await render(<Steps items={items} defaultValue="address" />);
    expect(getByRoleDeep("list", { name: "Steps" })).toBeTruthy();
    expect(screen.queryByRole("button")).toBeNull();
    expect(screen.getByLabelText("Cart, Completed")).toBeTruthy();
    expect(screen.getByLabelText("Address, In progress")).toBeSelected();
    expect(screen.getByLabelText("Pay, Waiting")).toBeTruthy();
    expect(screen.getByText("Where to ship")).toBeTruthy();
    expect(indicators().map((el) => el.props.dataSet.status)).toEqual([
      "finish",
      "process",
      "wait",
      "wait",
    ]);
  });

  it("current step colors and number glyphs from the tokens", async () => {
    await render(
      <MinervaProvider theme="light">
        <Steps items={items} defaultValue="address" />
      </MinervaProvider>,
    );
    expect(indicators()[1]).toHaveStyle({
      backgroundColor: light.colors["primary-color"],
    });
    expect(screen.getByText("2")).toHaveStyle({
      color: light.colors["text-inverse-color"],
    });
    // finished step shows a check, not its number
    expect(screen.queryByText("1")).toBeNull();
  });

  it("pressing a step emits onChange (uncontrolled)", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    await render(<Steps items={items} onChange={onChange} />);
    expect(
      screen.getByRole("button", { name: "Cart, In progress" }),
    ).toBeSelected();
    await user.press(screen.getByRole("button", { name: "Pay, Waiting" }));
    expect(onChange).toHaveBeenCalledWith("pay");
    expect(
      screen.getByRole("button", { name: "Pay, In progress" }),
    ).toBeSelected();
    expect(
      screen.getByRole("button", { name: "Address, Completed" }),
    ).toBeTruthy();
  });

  it("controlled, disabled steps and re-pressing the current one", async () => {
    const onChange = vi.fn();
    await render(<Steps items={items} value="cart" onChange={onChange} />);
    await fireEvent.press(
      screen.getByRole("button", { name: "Cart, In progress" }),
    );
    expect(onChange).not.toHaveBeenCalled();
    const done = screen.getByRole("button", { name: "Done, Waiting" });
    expect(done).toBeDisabled();
    await fireEvent.press(done);
    expect(onChange).not.toHaveBeenCalled();
    await fireEvent.press(
      screen.getByRole("button", { name: "Address, Waiting" }),
    );
    expect(onChange).toHaveBeenCalledWith("address");
    expect(
      screen.getByRole("button", { name: "Cart, In progress" }),
    ).toBeSelected();
  });

  it("error status, explicit statuses, values by index and readOnly", async () => {
    await render(
      <MinervaProvider locale={{ language: "zh" }}>
        <Steps
          readOnly
          onChange={() => {}}
          status="error"
          defaultValue="1"
          direction="vertical"
          items={[
            { title: "A" },
            { title: "B" },
            { title: "C", status: "finish" },
          ]}
        />
      </MinervaProvider>,
    );
    expect(getByRoleDeep("list", { name: "步骤" })).toBeTruthy();
    expect(screen.queryByRole("button")).toBeNull();
    expect(screen.getByLabelText("A, 已完成")).toBeTruthy();
    expect(screen.getByLabelText("B, 错误")).toBeTruthy();
    expect(screen.getByLabelText("C, 已完成")).toBeTruthy();
    expect(indicators()[1]).toHaveStyle({
      backgroundColor: light.colors["danger-color"],
    });
  });
});
