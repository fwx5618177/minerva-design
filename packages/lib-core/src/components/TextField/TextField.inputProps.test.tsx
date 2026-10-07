import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import TextField from "./TextField";

describe("TextField inputProps", () => {
  it("forwards native attributes / handlers and merges aria-describedby", () => {
    const onCompositionEnd = vi.fn();
    render(
      <>
        <span id="extra">Extra hint</span>
        <TextField
          name="q"
          label="Query"
          helperText="Required"
          inputProps={{
            autoComplete: "off",
            "aria-describedby": "extra",
            onCompositionEnd,
          }}
        />
      </>,
    );
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("autocomplete", "off");
    expect(input).toHaveAccessibleDescription(/Required.*Extra hint/);
    fireEvent.compositionEnd(input);
    expect(onCompositionEnd).toHaveBeenCalledTimes(1);
  });
});
