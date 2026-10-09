import { mount } from "@vue/test-utils";
import { it, expect } from "vitest";
import JsonField from "./JsonField.vue";
it("JsonField edits JSON text, reports invalid status and formats valid content with indent clamp", async () => {
  const w = mount(JsonField, {
    props: { defaultValue: '{"a":1}', indent: 4, rows: 6 },
  });
  expect((w.find("textarea").element as HTMLTextAreaElement).value).toBe(
    '{"a":1}',
  );
  expect(w.text()).toContain("Valid JSON");
  await w.find('[aria-label="Format JSON"]').trigger("click");
  expect(w.emitted("change")?.at(-1)).toEqual(['{\n    "a": 1\n}']);
  expect(w.find("textarea").attributes("rows")).toBe("6");
  await w.find("textarea").trigger("input", { detail: { value: "{" } });
  expect(w.emitted("change")?.at(-1)).toEqual(["{"]);
  expect(w.text()).toContain("Invalid JSON");
  expect(w.find("textarea").attributes("aria-invalid")).toBe("true");
  const before = w.emitted("change")?.length;
  await w.find('[aria-label="Format JSON"]').trigger("click");
  expect(w.emitted("change")).toHaveLength(before!);
});
it("JsonField controlled text rejection, toolbar hiding and readOnly preserve parent state", async () => {
  const w = mount(JsonField, { props: { value: '{"a":1}' } });
  await w.find("textarea").trigger("input", { detail: { value: '{"a":2}' } });
  expect(w.emitted("change")).toEqual([['{"a":2}']]);
  expect((w.find("textarea").element as HTMLTextAreaElement).value).toBe(
    '{"a":1}',
  );
  await w.setProps({ hideToolbar: true, readOnly: true });
  expect(w.find('[aria-label="Format JSON"]').exists()).toBe(false);
  await w.find("textarea").trigger("input", { detail: { value: "{}" } });
  expect(w.emitted("change")).toHaveLength(1);
});
it("format preserves large integer and duplicate-key lexemes, compacts without parsing roundtrip and hides feedback while focused", async () => {
  const raw = '{"a":9007199254740993,"a":1e+9}';
  const w = mount(JsonField, { props: { defaultValue: raw, indent: 4 } });
  await w.find('[aria-label="Format JSON"]').trigger("click");
  expect(w.emitted("change")?.[0][0]).toContain("9007199254740993");
  expect(w.emitted("change")?.[0][0]).toContain("1e+9");
  await w.setProps({ indent: 0 });
  await w.find('[aria-label="Format JSON"]').trigger("click");
  expect(w.emitted("change")?.at(-1)).toEqual([raw]);
  await w.find("textarea").trigger("focus");
  expect(w.find('[role="status"]').text()).toBe("");
  await w.find("textarea").trigger("blur");
  expect(w.find('[role="status"]').text()).toContain("Valid JSON");
});
