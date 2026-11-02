import { afterEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { MinervaSegmentedControl } from "./segmented-control";
import "../../elements/segmented-control";
import { resetDevWarnings } from "../../internal/dev";
import { customStates } from "../../internal/styling-hooks";
import { $, mount, settle } from "../../../tests/utils";

afterEach(() => {
  vi.restoreAllMocks();
  resetDevWarnings();
});

async function setup(attrs = `options="a,b,c" value="b"`) {
  return mount<MinervaSegmentedControl>(
    `<minerva-segmented-control aria-label="View" ${attrs}></minerva-segmented-control><button>After</button>`,
    "minerva-segmented-control",
  );
}

const radios = (el: Element) =>
  Array.from(el.shadowRoot!.querySelectorAll<HTMLElement>('[role="radio"]'));
const focused = (el: Element) =>
  el.shadowRoot!.activeElement as HTMLElement | null;

describe("<minerva-segmented-control>", () => {
  it("registers", () => {
    expect(customElements.get("minerva-segmented-control")).toBe(
      MinervaSegmentedControl,
    );
  });

  it("renders a radiogroup of radio segments from comma-separated options", async () => {
    const el = await setup();
    const group = $(el, '[role="radiogroup"]');
    expect(group.getAttribute("aria-label")).toBe("View");
    expect(radios(el).map((radio) => radio.textContent?.trim())).toEqual([
      "a",
      "b",
      "c",
    ]);
    expect(
      radios(el).map((radio) => radio.getAttribute("aria-checked")),
    ).toEqual(["false", "true", "false"]);
    expect(radios(el).map((radio) => radio.getAttribute("tabindex"))).toEqual([
      "-1",
      "0",
      "-1",
    ]);
    expect(radios(el)[1]!.getAttribute("part")).toBe("item item--selected");
    expect(group.style.getPropertyValue("--_segmented-control-index")).toBe(
      "1",
    );
    expect(group.style.getPropertyValue("--_segmented-control-count")).toBe(
      "3",
    );
  });

  it("accepts JSON options with icons and disabled segments", async () => {
    const el = await setup(
      `options='[{"value":"list","icon":"≡","aria-label":"List"},{"value":"grid","label":"Grid","disabled":true}]'`,
    );
    const [list, grid] = radios(el);
    expect(list!.getAttribute("aria-label")).toBe("List");
    expect(list!.querySelector('[part="icon"]')!.textContent).toBe("≡");
    expect(list!.querySelector('[part="label"]')).toBeNull();
    expect(grid!.getAttribute("aria-disabled")).toBe("true");
    // nothing selected: the thumb is hidden, the first enabled segment is the tab stop
    expect($(el, '[part="indicator"]').hidden).toBe(true);
    expect(list!.getAttribute("tabindex")).toBe("0");
  });

  it("selects by click and fires change + minerva-change", async () => {
    const el = await setup();
    const change = vi.fn();
    const minervaChange = vi.fn();
    el.addEventListener("change", change);
    el.addEventListener("minerva-change", (event) =>
      minervaChange((event as CustomEvent).detail),
    );
    await userEvent.click(radios(el)[2]!);
    await settle();
    expect(el.value).toBe("c");
    expect(radios(el)[2]!.getAttribute("aria-checked")).toBe("true");
    expect(change).toHaveBeenCalledTimes(1);
    expect(minervaChange).toHaveBeenCalledWith({ value: "c" });
    // the selection again: no event
    await userEvent.click(radios(el)[2]!);
    expect(change).toHaveBeenCalledTimes(1);
  });

  it("moves and selects with the arrow keys, skipping disabled segments, Home / End", async () => {
    const el = await setup();
    el.options = ["a", { value: "b", disabled: true }, "c", "d"];
    el.value = "a";
    await settle();
    el.focus();
    expect(focused(el)).toBe(radios(el)[0]);
    await userEvent.keyboard("{ArrowRight}");
    await settle();
    expect(el.value).toBe("c");
    expect(focused(el)).toBe(radios(el)[2]);
    await userEvent.keyboard("{End}");
    await settle();
    expect(el.value).toBe("d");
    await userEvent.keyboard("{ArrowRight}");
    await settle();
    expect(el.value).toBe("a");
    await userEvent.keyboard("{ArrowLeft}");
    await settle();
    expect(el.value).toBe("d");
    await userEvent.keyboard("{Home}");
    await settle();
    expect(el.value).toBe("a");
    expect(focused(el)).toBe(radios(el)[0]);
  });

  it("exposes hook states and blocks everything when disabled", async () => {
    const el = await setup(
      `options="a,b" value="a" size="small" color="primary" disabled`,
    );
    const states = [...customStates(el)];
    expect(states).toEqual(
      expect.arrayContaining(["disabled", "size-small", "color-primary"]),
    );
    expect(
      radios(el).every((radio) => radio.getAttribute("tabindex") === "-1"),
    ).toBe(true);
    await userEvent.click(radios(el)[1]!);
    expect(el.value).toBe("a");
  });

  it("participates in forms: value, required, reset", async () => {
    document.body.innerHTML = `<form><minerva-segmented-control name="view" options="list,grid" required aria-label="View"></minerva-segmented-control></form>`;
    await settle();
    const form = document.querySelector("form")!;
    const el = form.querySelector<MinervaSegmentedControl>(
      "minerva-segmented-control",
    )!;
    expect(new FormData(form).get("view")).toBeNull();
    expect(el.checkValidity()).toBe(false);
    expect(el.validity?.valueMissing).toBe(true);
    await userEvent.click(radios(el)[1]!);
    await settle();
    expect(new FormData(form).get("view")).toBe("grid");
    expect(el.checkValidity()).toBe(true);
    form.reset();
    await settle();
    expect(el.value).toBe("");
    expect(new FormData(form).get("view")).toBeNull();
  });
});
