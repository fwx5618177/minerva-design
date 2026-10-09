import { expect, it } from "vitest";
import * as controls from "./index";
it("published native method metadata points to real instance methods and stays outside Component definitions", () => {
  const entries = Object.entries(controls).filter(
    ([, c]) => c && typeof c === "object" && "definition" in c,
  ) as [
    string,
    {
      definition: WechatMiniprogram.IAnyObject;
      publicApi?: {
        methods: { name: string; signature: string }[];
        events: { name: string; detail: string }[];
      };
    },
  ][];
  expect(entries).toHaveLength(74);
  for (const [name, c] of entries) {
    expect(c.definition.publicApi, `${name} registration`).toBeUndefined();
    for (const method of c.publicApi?.methods ?? []) {
      expect(
        c.definition.methods?.[method.name],
        `${name}.${method.name}`,
      ).toBeTypeOf("function");
      expect(method.signature).not.toContain("WechatMiniprogram");
    }
  }
  expect(
    (
      controls.table as unknown as (typeof entries)[number][1]
    ).publicApi?.events.find((event) => event.name === "cellaction")?.detail,
  ).toContain("columnKey");
});
