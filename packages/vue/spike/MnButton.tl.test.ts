import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/vue";
import MnButton from "./MnButton.vue";

afterEach(() => cleanup());

describe("MnButton (@testing-library/vue)", () => {
  it("emits press via role query", async () => {
    const { emitted } = render(MnButton, { slots: { default: "Save" } });
    await fireEvent.click(screen.getByRole("button", { name: "Save" }));
    expect(emitted().press).toHaveLength(1);
  });

  it("disabled button does not emit", async () => {
    const { emitted } = render(MnButton, {
      props: { disabled: true },
      slots: { default: "Save" },
    });
    const btn = screen.getByRole("button", {
      name: "Save",
    }) as HTMLButtonElement;
    expect(btn.disabled).toBe(true);
    await fireEvent.click(btn);
    expect(emitted().press).toBeUndefined();
  });
});
