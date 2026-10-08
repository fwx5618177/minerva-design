import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import {
  FormControl,
  FormErrorMessage,
  FormField,
  FormHelperText,
  FormLabel,
} from "../FormControl";
import Cascader from "./Cascader";
import type { CascaderOption } from "./types";

const options: CascaderOption[] = [
  {
    value: "zhejiang",
    label: "Zhejiang",
    children: [{ value: "hangzhou", label: "Hangzhou" }],
  },
];

describe("Cascader inside a FormControl", () => {
  it("takes the field id, label and helper text", () => {
    render(
      <FormField id="region" label="Region" helperText="Pick a city">
        <Cascader label="Fallback" name="region" options={options} />
      </FormField>,
    );
    const input = screen.getByLabelText("Region");
    expect(input).toHaveAttribute("id", "region");
    expect(input).toHaveAttribute("aria-labelledby", "region-label");
    expect(screen.getByRole("combobox", { name: "Region" })).toBe(input);
    expect(input.getAttribute("aria-describedby")).toContain("region-helper");
    expect(input).not.toHaveAttribute("aria-invalid");
  });

  it("merges a consumer aria-describedby with the helper id", () => {
    render(
      <FormControl id="f">
        <FormLabel>Region</FormLabel>
        <Cascader
          label="Region"
          name="region"
          options={options}
          aria-describedby="extra"
        />
        <FormHelperText>Help</FormHelperText>
      </FormControl>,
    );
    const ids = screen
      .getByLabelText("Region")
      .getAttribute("aria-describedby")
      ?.split(" ");
    expect(ids).toEqual(expect.arrayContaining(["f-helper", "extra"]));
  });

  it("reflects invalid and required from the context", () => {
    render(
      <FormControl id="f" invalid required>
        <FormLabel>Region</FormLabel>
        <Cascader label="Region" name="region" options={options} />
        <FormErrorMessage>Required</FormErrorMessage>
      </FormControl>,
    );
    const input = screen.getByLabelText(/Region/);
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("aria-required", "true");
    expect(input).toBeRequired();
    expect(input.getAttribute("aria-describedby")).toContain("f-error");
  });

  it("is disabled by the context", async () => {
    const user = userEvent.setup();
    render(
      <FormControl disabled>
        <FormLabel>Region</FormLabel>
        <Cascader label="Region" name="region" options={options} />
      </FormControl>,
    );
    const input = screen.getByLabelText("Region");
    expect(input).toBeDisabled();
    await user.click(input);
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("lets explicit props win over the context", () => {
    render(
      <FormControl disabled required>
        <FormLabel>Region</FormLabel>
        <Cascader
          label="Region"
          name="region"
          options={options}
          disabled={false}
          required={false}
          id="own"
        />
      </FormControl>,
    );
    const input = screen.getByRole("combobox");
    expect(input).toBeEnabled();
    expect(input).not.toBeRequired();
    expect(input).toHaveAttribute("id", "own");
  });

  it("does not open or clear while read-only", async () => {
    const user = userEvent.setup();
    render(
      <FormControl readOnly>
        <FormLabel>Region</FormLabel>
        <Cascader
          label="Region"
          name="region"
          options={options}
          defaultValue={["zhejiang", "hangzhou"]}
        />
      </FormControl>,
    );
    await user.click(screen.getByLabelText("Region"));
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /clear/i }),
    ).not.toBeInTheDocument();
  });

  it("prefers an explicit aria-label over the FormLabel", () => {
    render(
      <FormControl>
        <FormLabel>Region</FormLabel>
        <Cascader
          label="Region"
          name="region"
          options={options}
          aria-label="Shipping region"
        />
      </FormControl>,
    );
    const input = screen.getByRole("combobox", { name: "Shipping region" });
    expect(input).not.toHaveAttribute("aria-labelledby");
  });
});

describe("Cascader root and control attributes", () => {
  it("applies style, className and data-* to the root and aria-* to the input", () => {
    const { container } = render(
      <>
        <span id="lbl">Destination</span>
        <span id="desc">Where to ship</span>
        <Cascader
          label="Region"
          name="region"
          options={options}
          className="custom"
          style={{ margin: "4px" }}
          data-testid="root"
          data-foo="bar"
          aria-labelledby="lbl"
          aria-describedby="desc"
        />
      </>,
    );
    const root = screen.getByTestId("root");
    expect(root).toBe(container.querySelector(".custom"));
    expect(root).toHaveAttribute("data-foo", "bar");
    expect(root.style.margin).toBe("4px");
    expect(root.style.width).toBe("240px");
    const input = screen.getByRole("combobox", { name: "Destination" });
    expect(input).toHaveAttribute("aria-describedby", "desc");
  });

  it("uses aria-label on the input", () => {
    render(
      <Cascader
        label="Region"
        name="region"
        options={options}
        aria-label="Area"
      />,
    );
    expect(screen.getByRole("combobox", { name: "Area" })).toBeInTheDocument();
  });
});
