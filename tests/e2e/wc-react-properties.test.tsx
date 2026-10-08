// React 19 creates a custom element, sets its properties, then inserts it:
// values set that way survive the element's first update (input, select,
// autocomplete, cascader and time-picker used to fall back to their empty
// default).
import { render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import "minerva-design/web-components";
import type {} from "../../packages/web-components/tests/e2e/jsx";

const settle = () => new Promise((resolve) => setTimeout(resolve, 0));

afterEach(() => vi.restoreAllMocks());

describe("Web Components rendered by React 19", () => {
  it("keep the values React sets as properties before connecting", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const options = [
      { value: "a", label: "Apple" },
      { value: "b", label: "Banana" },
    ];
    const { container } = render(
      <>
        <minerva-input aria-label="Name" value="Ada"></minerva-input>
        <minerva-select
          aria-label="Fruit"
          options={options}
          value="b"
        ></minerva-select>
        <minerva-time-picker
          aria-label="Time"
          value="09:30"
        ></minerva-time-picker>
      </>,
    );
    await settle();
    const [input, select, time] = Array.from(container.children) as Array<
      HTMLElement & { value: unknown }
    >;
    expect(input.value).toBe("Ada");
    expect(select.value).toBe("b");
    expect(time.value).toBe("09:30");
  });
});
