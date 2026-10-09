import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import TimePicker from "./TimePicker.vue";
import FormControl from "./FormControl.vue";
import { h } from "vue";
const time = (hours: number, minutes = 0, seconds = 0) =>
  new Date(2026, 9, 9, hours, minutes, seconds);
describe("TimePicker shared date and column semantics", () => {
  it("strict typing commits Date, partial typing waits until blur and malformed input rolls back", async () => {
    const w = mount(TimePicker, { props: { defaultValue: time(9, 10, 20) } });
    const input = w.find("input");
    expect((input.element as HTMLInputElement).value).toBe("09:10:20");
    await input.trigger("input", { detail: { value: "1:2:3" } });
    expect(w.emitted("change")).toBeUndefined();
    await input.trigger("blur");
    expect((w.emitted("change")![0][0] as Date).getHours()).toBe(1);
    expect((input.element as HTMLInputElement).value).toBe("01:02:03");
    await input.trigger("input", { detail: { value: "invalid" } });
    await input.trigger("blur");
    expect(w.emitted("change")).toHaveLength(1);
    expect((input.element as HTMLInputElement).value).toBe("01:02:03");
  });
  it("12h display, seconds hiding, interval columns, range restrictions and open callback are real", async () => {
    const w = mount(TimePicker, {
      props: {
        defaultValue: time(13, 30),
        format: "hh:mm:ss a",
        use12Hours: true,
        showSecond: false,
        hourStep: 2,
        minuteStep: 15,
        minTime: time(12, 15),
        maxTime: time(18, 45),
      },
    });
    await w.find("input").trigger("click");
    expect(w.emitted("openChange")).toEqual([[true]]);
    expect(w.findAll("[data-time-column]")).toHaveLength(3);
    expect(
      w.find('[data-time-column="hour"]').findAll('[role="option"]'),
    ).toHaveLength(6);
    expect(
      w.find('[data-time-column="minute"]').findAll('[role="option"]'),
    ).toHaveLength(4);
    expect((w.find("input").element as HTMLInputElement).value).toBe(
      "01:30 PM",
    );
    await w.find('[data-time-column="hour"] [data-unit="3"]').trigger("click");
    expect((w.emitted("change")![0][0] as Date).getHours()).toBe(15);
    expect(
      w
        .find('[data-time-column="hour"] [data-unit="7"]')
        .attributes("disabled"),
    ).toBeDefined();
    await w.find('[data-time-column="ampm"] [data-unit="0"]').trigger("click");
    expect(w.emitted("change")).toHaveLength(2);
    await w.find("input").trigger("keydown", { key: "Escape" });
    expect(w.emitted("openChange")?.at(-1)).toEqual([false]);
  });
  it("controlled null remains empty, clearing emits undefined, inherited readonly blocks all edits", async () => {
    const w = mount(TimePicker, { props: { value: null } });
    await w.find("input").trigger("input", { detail: { value: "09:30:20" } });
    await w.find("input").trigger("blur");
    expect(w.emitted("change")).toHaveLength(2);
    expect((w.find("input").element as HTMLInputElement).value).toBe("");
    await w.setProps({ value: time(9) });
    await w.find('[aria-label="Clear time"]').trigger("click");
    expect(w.emitted("change")?.at(-1)).toEqual([undefined]);
    expect((w.find("input").element as HTMLInputElement).value).toBe(
      "09:00:00",
    );
    const form = mount(FormControl, {
      props: { readOnly: true },
      slots: { default: () => h(TimePicker, { defaultValue: time(9) }) },
    });
    await form.find("input").trigger("click");
    expect(form.find('[role="dialog"]').exists()).toBe(false);
  });
});
it("touching a time option suppresses native blur draft commit before its tap", async () => {
  const w = mount(TimePicker, { props: { defaultValue: time(9, 10, 20) } });
  await w.find("input").trigger("click");
  await w.find("input").trigger("input", { detail: { value: "1:2:3" } });
  const option = w.find('[data-time-column="minute"] [data-unit="15"]');
  await option.trigger("touchstart");
  await w.find("input").trigger("blur");
  await option.trigger("click");
  expect(w.emitted("change")).toHaveLength(1);
  const value = w.emitted("change")![0][0] as Date;
  expect([value.getHours(), value.getMinutes(), value.getSeconds()]).toEqual([
    9, 15, 20,
  ]);
});
