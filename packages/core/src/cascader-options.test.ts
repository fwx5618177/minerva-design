import { describe, expect, it } from "vitest";
import { findCascaderPath, flattenCascaderOptions } from "./cascader-options";

interface Option {
  value: string | number;
  label: string;
  disabled?: boolean;
  children?: Option[];
}

const options: Option[] = [
  {
    value: "fr",
    label: "France",
    children: [
      { value: "par", label: "Paris" },
      { value: "lyo", label: "Lyon", disabled: true },
    ],
  },
  {
    value: "jp",
    label: "Japan",
    disabled: true,
    children: [{ value: "tky", label: "Tokyo" }],
  },
  { value: 1, label: "One" },
];

describe("findCascaderPath", () => {
  it("resolves one option per level", () => {
    expect(
      findCascaderPath(options, ["fr", "par"]).map((o) => o.label),
    ).toEqual(["France", "Paris"]);
    expect(findCascaderPath(options, [1]).map((o) => o.label)).toEqual(["One"]);
  });

  it("stops at the first unknown value or missing level", () => {
    expect(findCascaderPath(options, ["fr", "nope", "x"])).toHaveLength(1);
    expect(findCascaderPath(options, [1, "x"])).toHaveLength(1);
    expect(findCascaderPath(options, [])).toEqual([]);
  });
});

describe("flattenCascaderOptions", () => {
  it("lists enabled options depth first with their path", () => {
    const flat = flattenCascaderOptions(options);
    expect(flat.map(({ option }) => option.label)).toEqual([
      "France",
      "Paris",
      "One",
    ]);
    expect(flat[1].path.map((o) => o.label)).toEqual(["France", "Paris"]);
  });
});
