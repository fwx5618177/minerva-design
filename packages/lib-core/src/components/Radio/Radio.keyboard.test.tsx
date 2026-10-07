// Keyboard audit (WAI-ARIA radio group) and form-control passthrough.
import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Radio from "./Radio";
import RadioGroup from "./RadioGroup";

function Fruits(props: { defaultValue?: string; onChange?: () => void }) {
  return (
    <>
      <RadioGroup aria-label="Fruit" {...props}>
        <Radio label="Apple" value="apple" />
        <Radio label="Banana" value="banana" disabled />
        <Radio label="Cherry" value="cherry" />
      </RadioGroup>
      <button type="button">after</button>
    </>
  );
}

const radio = (name: string) => screen.getByRole("radio", { name });

describe("Radio keyboard", () => {
  it("tabs into the checked radio and out of the group in one stop", async () => {
    const user = userEvent.setup();
    render(<Fruits defaultValue="cherry" />);
    await user.tab();
    expect(radio("Cherry")).toHaveFocus();
    await user.tab();
    expect(screen.getByRole("button", { name: "after" })).toHaveFocus();
  });

  it("arrow keys move and select, skipping disabled radios and wrapping", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Fruits defaultValue="apple" onChange={onChange} />);
    await user.tab();
    expect(radio("Apple")).toHaveFocus();

    await user.keyboard("{ArrowRight}");
    expect(radio("Cherry")).toHaveFocus();
    expect(radio("Cherry")).toBeChecked();
    expect(onChange).toHaveBeenLastCalledWith("cherry", expect.anything());

    await user.keyboard("{ArrowDown}");
    expect(radio("Apple")).toHaveFocus();
    expect(radio("Apple")).toBeChecked();

    await user.keyboard("{ArrowUp}");
    expect(radio("Cherry")).toBeChecked();
    await user.keyboard("{ArrowLeft}");
    expect(radio("Apple")).toBeChecked();
    expect(radio("Banana")).not.toBeChecked();
  });

  it("is not reachable when the whole group is disabled", async () => {
    const user = userEvent.setup();
    render(
      <RadioGroup aria-label="Fruit" disabled defaultValue="apple">
        <Radio label="Apple" value="apple" />
        <Radio label="Cherry" value="cherry" />
      </RadioGroup>,
    );
    await user.tab();
    expect(document.body).toHaveFocus();
  });

  it("forwards id, aria-describedby (merged with helper text) and ref to the input", () => {
    const ref = createRef<HTMLInputElement>();
    render(
      <>
        <label htmlFor="r-yes">External label</label>
        <span id="hint">Extra hint</span>
        <Radio
          ref={ref}
          id="r-yes"
          value="yes"
          aria-describedby="hint"
          helperText="Helper"
        />
      </>,
    );
    const input = screen.getByRole("radio", { name: "External label" });
    expect(ref.current).toBe(input);
    expect(input).toHaveAttribute("id", "r-yes");
    expect(input).toHaveAccessibleDescription("Helper Extra hint");
  });

  it("omits aria-describedby without descriptions", () => {
    render(<Radio value="yes" aria-label="Yes" />);
    expect(radio("Yes")).not.toHaveAttribute("aria-describedby");
    expect(radio("Yes")).not.toHaveAttribute("id");
  });
});
