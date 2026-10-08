import { afterEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { MinervaTimePicker } from "./time-picker";
import "../../elements/time-picker";
import "../../elements/modal";
import type { MinervaModal } from "../modal/modal";
import { resetDevWarnings } from "../../internal/dev";
import { $, mount, settle, wait } from "../../../tests/utils";
import { formatTime, parseTimeInput, parseTimeValue } from "@minerva/core";

afterEach(() => {
  vi.restoreAllMocks();
  resetDevWarnings();
});

type El = MinervaTimePicker;

const field = (el: El) => $<HTMLInputElement>(el, "input");
const panel = (el: El) =>
  el.shadowRoot!.querySelector<HTMLElement>("[part=content]");
const columns = (el: El) =>
  Array.from(panel(el)!.querySelectorAll<HTMLElement>(".timeColumn"));
const column = (el: El, label: string) =>
  columns(el).find((c) => c.getAttribute("aria-label") === label)!;
const option = (col: HTMLElement, text: string) =>
  Array.from(col.querySelectorAll<HTMLElement>("[role=option]")).find(
    (o) => o.textContent?.trim() === text,
  )!;
const labels = (col: HTMLElement) =>
  Array.from(col.querySelectorAll("[role=option]")).map((o) =>
    o.textContent?.trim(),
  );
const active = (el: El) => el.shadowRoot!.activeElement;
const changes = (el: El) => {
  const fn = vi.fn();
  el.addEventListener("minerva-change", (e) =>
    fn((e as CustomEvent<{ value: string }>).detail.value),
  );
  return fn;
};

const openWithClick = async (el: El) => {
  await userEvent.click(field(el));
  await settle();
};

const openWithKeyboard = async (el: El) => {
  field(el).focus();
  await userEvent.keyboard("{ArrowDown}");
  await settle();
};

describe("<minerva-time-picker>", () => {
  it("is registered", () => {
    expect(customElements.get("minerva-time-picker")).toBe(MinervaTimePicker);
  });

  it("renders an empty field with lib-core's structure and the default placeholder", async () => {
    const el = await mount<El>(`<minerva-time-picker></minerva-time-picker>`);
    expect($(el, ".timePicker")).toBeTruthy();
    const root = $(el, "[data-component=input]");
    expect(root.classList).toContain("root");
    expect(root.classList).toContain("medium");
    expect(field(el).classList).toContain("field");
    expect(field(el).value).toBe("");
    expect(field(el).placeholder).toBe("Select time");
    expect($(el, ".clockIcon")).toHaveAttribute("aria-hidden", "true");
    expect(panel(el)).toBeNull();
  });

  it("has defaults and reflects its attributes", async () => {
    const el = await mount<El>(`<minerva-time-picker></minerva-time-picker>`);
    expect(el.format).toBe("HH:mm:ss");
    expect(el.size).toBe("medium");
    expect(el.open).toBe(false);
    expect(el.use12Hours).toBe(false);
    expect(el.hideClearButton).toBe(false);
    expect(el.hideSecond).toBe(false);
    expect([el.hourStep, el.minuteStep, el.secondStep]).toEqual([1, 1, 1]);
    el.size = "small";
    el.use12Hours = true;
    el.hideClearButton = true;
    el.invalid = true;
    el.readOnly = true;
    await el.updateComplete;
    expect(el.getAttribute("size")).toBe("small");
    expect(el.hasAttribute("use-12-hours")).toBe(true);
    expect(el.hasAttribute("hide-clear-button")).toBe(true);
    expect(el.hasAttribute("invalid")).toBe(true);
    expect(el.hasAttribute("readonly")).toBe(true);
    expect($(el, "[data-component=input]").classList).toContain("small");
    expect(field(el)).toHaveAttribute("aria-invalid", "true");
    expect(field(el)).toHaveAttribute("aria-readonly", "true");
  });

  it("formats the value attribute with the format; the value property follows", async () => {
    const el = await mount<El>(
      `<minerva-time-picker value="09:05:07"></minerva-time-picker>`,
    );
    expect(el.value).toBe("09:05:07");
    expect(field(el).value).toBe("09:05:07");
    expect(el.valueAsDate?.getHours()).toBe(9);
    el.format = "hh:mm a";
    await el.updateComplete;
    expect(field(el).value).toBe("09:05 AM");
    el.value = "23:59";
    await el.updateComplete;
    expect(field(el).value).toBe("11:59 PM");
    el.value = "";
    await el.updateComplete;
    expect(field(el).value).toBe("");
  });

  it("supports a custom format and placeholder", async () => {
    const el = await mount<El>(
      `<minerva-time-picker value="14:30" format="HH:mm" placeholder="Pick"></minerva-time-picker>`,
    );
    expect(field(el).value).toBe("14:30");
    expect(field(el).placeholder).toBe("Pick");
  });

  it("opens the panel on click and toggles closed on a second click", async () => {
    const el = await mount<El>(
      `<minerva-time-picker value="10:30:45"></minerva-time-picker>`,
    );
    await openWithClick(el);
    expect(el.open).toBe(true);
    const cols = columns(el);
    expect(cols).toHaveLength(3);
    expect(labels(cols[0])).toHaveLength(24);
    expect(labels(cols[1])).toHaveLength(60);
    expect(labels(cols[2])).toHaveLength(60);
    expect(option(cols[0], "10").classList).toContain("selected");
    expect(option(cols[1], "30").classList).toContain("selected");
    expect(option(cols[2], "45").classList).toContain("selected");
    expect(panel(el)).toHaveAttribute("popover", "manual");
    expect(panel(el)!.classList).toContain("popup");
    expect(panel(el)!.querySelector(".timePickerPanel .timeColumns")).not.toBe(
      null,
    );
    // a pointer opening keeps focus in the input (the user may type)
    expect(active(el)).toBe(field(el));

    await openWithClick(el);
    expect(el.open).toBe(false);
    expect(panel(el)).toBeNull();
  });

  it("commits hour, minute and second picks", async () => {
    const el = await mount<El>(
      `<minerva-time-picker value="10:30:45"></minerva-time-picker>`,
    );
    const onChange = changes(el);
    const onNativeChange = vi.fn();
    el.addEventListener("change", onNativeChange);
    await openWithClick(el);
    await userEvent.click(option(columns(el)[0], "08"));
    await settle();
    expect(onChange).toHaveBeenLastCalledWith("08:30:45");
    expect(field(el).value).toBe("08:30:45");
    await userEvent.click(option(columns(el)[1], "15"));
    await userEvent.click(option(columns(el)[2], "05"));
    await settle();
    expect(onChange).toHaveBeenLastCalledWith("08:15:05");
    expect(el.value).toBe("08:15:05");
    expect(option(columns(el)[2], "05").classList).toContain("selected");
    expect(onChange).toHaveBeenCalledTimes(3);
    expect(onNativeChange).toHaveBeenCalledTimes(3);
  });

  it("hides the seconds column with hide-second", async () => {
    const el = await mount<El>(
      `<minerva-time-picker hide-second format="HH:mm"></minerva-time-picker>`,
    );
    await openWithClick(el);
    expect(columns(el)).toHaveLength(2);
    await userEvent.click(option(columns(el)[0], "07"));
    // no seconds shown nor formatted: the value is HH:mm
    expect(el.value).toBe("07:00");
  });

  it("respects hour, minute and second steps", async () => {
    const el = await mount<El>(
      `<minerva-time-picker hour-step="2" minute-step="15" second-step="30"></minerva-time-picker>`,
    );
    await openWithClick(el);
    const [hours, minutes, seconds] = columns(el);
    expect(labels(hours)).toEqual(
      Array.from({ length: 12 }, (_, i) => String(i * 2).padStart(2, "0")),
    );
    expect(labels(minutes)).toEqual(["00", "15", "30", "45"]);
    expect(labels(seconds)).toEqual(["00", "30"]);
  });

  it("disables units outside min-time / max-time and ignores clicks on them", async () => {
    const el = await mount<El>(
      `<minerva-time-picker value="09:30:00" min-time="09:15" max-time="17:00"></minerva-time-picker>`,
    );
    const onChange = changes(el);
    await openWithClick(el);
    const [hours, minutes] = columns(el);
    expect(option(hours, "08").classList).toContain("disabled");
    expect(option(hours, "08")).toHaveAttribute("aria-disabled", "true");
    expect(option(hours, "08")).toHaveAttribute("part", "item item--disabled");
    expect(option(hours, "09")).toHaveAttribute("part", "item item--selected");
    expect(option(hours, "09").classList).not.toContain("disabled");
    expect(option(hours, "17").classList).not.toContain("disabled");
    expect(option(hours, "18").classList).toContain("disabled");
    expect(option(minutes, "14").classList).toContain("disabled");
    expect(option(minutes, "15").classList).not.toContain("disabled");
    await userEvent.click(option(hours, "08"));
    await userEvent.click(option(minutes, "14"));
    expect(onChange).not.toHaveBeenCalled();
    expect(field(el).value).toBe("09:30:00");
  });

  it("supports 12-hour mode with AM/PM switching", async () => {
    const el = await mount<El>(
      `<minerva-time-picker value="10:30:45" use-12-hours format="hh:mm:ss a"></minerva-time-picker>`,
    );
    const onChange = changes(el);
    expect(field(el).value).toBe("10:30:45 AM");
    await openWithClick(el);
    expect(columns(el)).toHaveLength(4);
    expect(columns(el)[3].getAttribute("aria-label")).toBe("AM/PM");
    expect(labels(columns(el)[0])).toEqual(
      Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0")),
    );
    expect(option(columns(el)[3], "AM").classList).toContain("selected");

    await userEvent.click(option(columns(el)[3], "PM"));
    await settle();
    expect(onChange).toHaveBeenLastCalledWith("22:30:45");
    expect(field(el).value).toBe("10:30:45 PM");
    expect(option(columns(el)[0], "10").classList).toContain("selected");

    await userEvent.click(option(columns(el)[0], "03"));
    await settle();
    expect(onChange).toHaveBeenLastCalledWith("15:30:45");
    await userEvent.click(option(columns(el)[0], "12"));
    await settle();
    expect(field(el).value).toBe("12:30:45 PM");
    await userEvent.click(option(columns(el)[3], "AM"));
    await settle();
    expect(onChange).toHaveBeenLastCalledWith("00:30:45");
    expect(field(el).value).toBe("12:30:45 AM");
  });

  it("parses typed text, fires minerva-input and commits valid times", async () => {
    const el = await mount<El>(`<minerva-time-picker></minerva-time-picker>`);
    const onChange = changes(el);
    const onInput = vi.fn();
    el.addEventListener("minerva-input", (e) =>
      onInput((e as CustomEvent<{ value: string }>).detail.value),
    );
    await userEvent.type(field(el), "12:34:56");
    expect(field(el).value).toBe("12:34:56");
    expect(onInput).toHaveBeenLastCalledWith("12:34:56");
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(el.value).toBe("12:34:56");
  });

  it("does not commit a half-typed time", async () => {
    const el = await mount<El>(
      `<minerva-time-picker format="HH:mm"></minerva-time-picker>`,
    );
    const onChange = changes(el);
    await userEvent.type(field(el), "12:3");
    expect(onChange).not.toHaveBeenCalled();
    await userEvent.type(field(el), "0", { skipClick: true });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenLastCalledWith("12:30"); // no seconds in the format, none in the value
  });

  it("drops invalid text on blur and normalizes lenient text", async () => {
    const el = await mount<El>(
      `<minerva-time-picker></minerva-time-picker><button>after</button>`,
      "minerva-time-picker",
    );
    const onChange = changes(el);
    await userEvent.type(field(el), "ab");
    expect(onChange).not.toHaveBeenCalled();
    expect(field(el).value).toBe("ab");
    field(el).blur();
    await settle();
    expect(field(el).value).toBe("");

    await userEvent.type(field(el), "1:2:3");
    field(el).blur();
    await settle();
    expect(field(el).value).toBe("01:02:03");
    expect(onChange).toHaveBeenLastCalledWith("01:02:03");
  });

  it("clears the value with the clear button and keeps focus in the input", async () => {
    const el = await mount<El>(
      `<minerva-time-picker value="10:00:00"></minerva-time-picker>`,
    );
    const onChange = changes(el);
    const onClear = vi.fn();
    el.addEventListener("minerva-clear", onClear);
    const clear = $<HTMLButtonElement>(el, "[part=clear-button]");
    expect(clear.classList).toContain("clearButton");
    expect(clear.classList).toContain("iconButton");
    expect(clear).toHaveAttribute("aria-label", "Clear time");
    await userEvent.click(clear);
    await settle();
    expect(onChange).toHaveBeenCalledWith("");
    expect(onClear).toHaveBeenCalledTimes(1);
    expect(el.value).toBe("");
    expect(field(el).value).toBe("");
    expect(el.shadowRoot!.querySelector(".clearButton")).toBeNull();
    expect($(el, ".clockIcon")).toBeTruthy();
    expect(active(el)).toBe(field(el));
  });

  it("has no clear button with hide-clear-button", async () => {
    const el = await mount<El>(
      `<minerva-time-picker value="10:00:00" hide-clear-button></minerva-time-picker>`,
    );
    expect(el.shadowRoot!.querySelector(".clearButton")).toBeNull();
    expect($(el, ".clockIcon")).toBeTruthy();
  });

  it("never opens while disabled or read-only", async () => {
    const el = await mount<El>(
      `<minerva-time-picker value="10:00:00" disabled></minerva-time-picker>`,
    );
    expect(field(el).disabled).toBe(true);
    expect(el.shadowRoot!.querySelector(".clearButton")).toBeNull();
    expect($(el, "[data-component=input]").classList).toContain("disabled");
    await userEvent.click(field(el));
    expect(panel(el)).toBeNull();

    el.disabled = false;
    el.readOnly = true;
    await el.updateComplete;
    expect(field(el)).toHaveAttribute("readonly");
    expect(el.shadowRoot!.querySelector(".clearButton")).toBeNull();
    await userEvent.click(field(el));
    await settle();
    expect(panel(el)).toBeNull();
    await userEvent.type(field(el), "1");
    expect(field(el).value).toBe("10:00:00");
  });

  it("closes when clicking outside", async () => {
    const el = await mount<El>(
      `<minerva-time-picker></minerva-time-picker><p id="out">Outside</p>`,
      "minerva-time-picker",
    );
    await openWithClick(el);
    await wait(5); // dismissable layers ignore pointer events for one tick
    await userEvent.click(document.getElementById("out")!);
    await settle();
    expect(el.open).toBe(false);
    expect(panel(el)).toBeNull();
  });

  describe("minerva-open-change", () => {
    it("fires with the new state", async () => {
      const el = await mount<El>(`<minerva-time-picker></minerva-time-picker>`);
      const onOpen = vi.fn();
      el.addEventListener("minerva-open-change", (e) =>
        onOpen((e as CustomEvent<{ open: boolean }>).detail),
      );
      await openWithClick(el);
      expect(onOpen).toHaveBeenLastCalledWith({ open: true });
      await userEvent.keyboard("{Escape}");
      await settle();
      expect(onOpen).toHaveBeenLastCalledWith({ open: false });
      expect(el.open).toBe(false);
    });

    it("is cancelable: preventDefault keeps the state", async () => {
      const el = await mount<El>(`<minerva-time-picker></minerva-time-picker>`);
      const cancel = (e: Event) => e.preventDefault();
      el.addEventListener("minerva-open-change", cancel);
      await openWithClick(el);
      expect(el.open).toBe(false);
      expect(panel(el)).toBeNull();
      await openWithKeyboard(el);
      expect(panel(el)).toBeNull();

      el.removeEventListener("minerva-open-change", cancel);
      await openWithClick(el);
      expect(el.open).toBe(true);
      el.addEventListener("minerva-open-change", cancel);
      await userEvent.keyboard("{Escape}");
      await settle();
      expect(el.open).toBe(true);
    });

    it("does not fire when open is set programmatically", async () => {
      const el = await mount<El>(`<minerva-time-picker></minerva-time-picker>`);
      const onOpen = vi.fn();
      el.addEventListener("minerva-open-change", onOpen);
      el.show();
      await settle();
      expect(panel(el)).not.toBeNull();
      el.hide();
      await settle();
      expect(panel(el)).toBeNull();
      expect(onOpen).not.toHaveBeenCalled();
    });
  });

  describe("keyboard", () => {
    const setup = (attrs = "") =>
      mount<El>(
        `<minerva-time-picker aria-label="Start" value="10:30:00" ${attrs}></minerva-time-picker><button id="after">After</button>`,
        "minerva-time-picker",
      );

    it("ArrowDown opens the panel and moves focus into the hours column", async () => {
      const el = await setup();
      await openWithKeyboard(el);
      expect(panel(el)).toHaveAttribute("role", "dialog");
      expect(panel(el)).toHaveAttribute("aria-label", "Start");
      expect(active(el)).toBe(option(column(el, "Hours"), "10"));
    });

    it("ArrowDown on an already open (clicked) panel moves focus into it", async () => {
      const el = await setup();
      await openWithClick(el);
      expect(active(el)).toBe(field(el));
      await userEvent.keyboard("{ArrowDown}");
      expect(active(el)).toBe(option(column(el, "Hours"), "10"));
    });

    it("picks units with the keyboard only; Escape returns focus to the input", async () => {
      const el = await setup();
      const onChange = changes(el);
      await openWithKeyboard(el);
      const hours = column(el, "Hours");
      expect(option(hours, "10")).toHaveAttribute(
        "part",
        "item item--selected",
      );
      await userEvent.keyboard("{ArrowDown}{Enter}");
      await settle();
      expect(onChange).toHaveBeenLastCalledWith("11:30:00");
      expect(option(hours, "10")).toHaveAttribute("part", "item");
      expect(option(hours, "11")).toHaveAttribute(
        "part",
        "item item--selected",
      );
      await userEvent.keyboard("{ArrowRight}");
      expect(active(el)).toBe(option(column(el, "Minutes"), "30"));
      await userEvent.keyboard("{End}{Enter}");
      await settle();
      expect(onChange).toHaveBeenLastCalledWith("11:59:00");
      await userEvent.keyboard("{Home}");
      expect(active(el)).toBe(option(column(el, "Minutes"), "00"));
      await userEvent.keyboard("{ArrowUp}");
      expect(active(el)).toBe(option(column(el, "Minutes"), "00"));
      await userEvent.keyboard("{ArrowLeft}");
      expect(active(el)).toBe(option(column(el, "Hours"), "11"));
      await userEvent.keyboard("{Escape}");
      await settle();
      expect(panel(el)).toBeNull();
      expect(active(el)).toBe(field(el));
      expect(field(el).value).toBe("11:59:00");
    });

    it("swaps ArrowLeft / ArrowRight in RTL", async () => {
      document.documentElement.setAttribute("dir", "rtl");
      try {
        const el = await setup();
        await openWithKeyboard(el);
        await userEvent.keyboard("{ArrowLeft}");
        expect(active(el)).toBe(option(column(el, "Minutes"), "30"));
        await userEvent.keyboard("{ArrowRight}");
        expect(active(el)).toBe(option(column(el, "Hours"), "10"));
      } finally {
        document.documentElement.removeAttribute("dir");
      }
    });

    it("picks with Space and ignores Enter / Space on disabled units", async () => {
      const el = await setup(`min-time="09:00"`);
      const onChange = changes(el);
      await openWithKeyboard(el);
      const hours = column(el, "Hours");
      option(hours, "12").focus();
      await userEvent.keyboard(" ");
      await settle();
      expect(onChange).toHaveBeenLastCalledWith("12:30:00");
      onChange.mockClear();
      const disabled = option(column(el, "Hours"), "08");
      expect(disabled).toHaveAttribute("aria-disabled", "true");
      disabled.focus();
      await userEvent.keyboard("{Enter}");
      await userEvent.keyboard(" ");
      expect(onChange).not.toHaveBeenCalled();
    });

    it("Tab past the last column closes the panel and moves to the clear button", async () => {
      const el = await setup();
      await openWithKeyboard(el);
      // happy-dom: user-event's Tab order ignores shadow roots, so the
      // move into the last column is done programmatically; the Tab
      // that leaves the panel is handled by the element itself.
      option(column(el, "Seconds"), "00").focus();
      await userEvent.keyboard("{Tab}");
      await settle();
      expect(active(el)).toBe($(el, "[part=clear-button]"));
      expect(panel(el)).toBeNull();
    });

    it("Tab past the last column goes to the next field without a clear button", async () => {
      const el = await setup("hide-clear-button");
      await openWithKeyboard(el);
      option(column(el, "Seconds"), "00").focus();
      await userEvent.keyboard("{Tab}");
      await settle();
      expect(document.activeElement).toBe(document.getElementById("after"));
      expect(panel(el)).toBeNull();
    });

    it("Shift+Tab before the first column returns focus to the input", async () => {
      const el = await setup();
      await openWithKeyboard(el);
      await userEvent.keyboard("{Shift>}{Tab}{/Shift}");
      await settle();
      expect(active(el)).toBe(field(el));
      expect(panel(el)).toBeNull();
    });

    it("inside a modal, Escape closes only the panel", async () => {
      const modal = await mount<MinervaModal>(
        `<minerva-modal open label="Schedule">
           <minerva-time-picker aria-label="Start" value="10:30:00"></minerva-time-picker>
         </minerva-modal>`,
        "minerva-modal",
      );
      const el = modal.querySelector<El>("minerva-time-picker")!;
      const onModalOpen = vi.fn();
      modal.addEventListener("minerva-open-change", (e) => {
        if (e.target === modal) onModalOpen();
      });
      await openWithKeyboard(el);
      expect(active(el)).toBe(option(column(el, "Hours"), "10"));
      await userEvent.keyboard("{Escape}");
      await settle();
      expect(panel(el)).toBeNull();
      expect(active(el)).toBe(field(el));
      expect(modal.open).toBe(true);
      expect(onModalOpen).not.toHaveBeenCalled();
      await userEvent.keyboard("{Escape}");
      await settle();
      expect(modal.open).toBe(false);
    });
  });

  describe("ARIA", () => {
    it("labels the input, panel, columns and clear button (localized defaults)", async () => {
      const el = await mount<El>(
        `<minerva-time-picker value="10:00:00"></minerva-time-picker>`,
      );
      expect(field(el)).toHaveAttribute("aria-label", "Time");
      await openWithClick(el);
      expect(panel(el)).toHaveAttribute("aria-label", "Time");
      expect(panel(el)).toHaveAttribute("tabindex", "-1");
      expect(columns(el).map((c) => c.getAttribute("aria-label"))).toEqual([
        "Hours",
        "Minutes",
        "Seconds",
      ]);
      const hours = column(el, "Hours");
      expect(hours).toHaveAttribute("role", "listbox");
      expect(option(hours, "10")).toHaveAttribute("aria-selected", "true");
      expect(option(hours, "10")).toHaveAttribute("tabindex", "0");
      expect(option(hours, "11")).toHaveAttribute("aria-selected", "false");
      expect(option(hours, "11")).toHaveAttribute("tabindex", "-1");
      // only the clear button is a button: the clock icon is decorative
      expect(el.shadowRoot!.querySelectorAll("button")).toHaveLength(1);
    });

    it("selects nothing without a value (first unit is the tab stop)", async () => {
      const el = await mount<El>(`<minerva-time-picker></minerva-time-picker>`);
      await openWithClick(el);
      expect(
        panel(el)!.querySelectorAll('[aria-selected="true"]'),
      ).toHaveLength(0);
      expect(option(column(el, "Hours"), "00")).toHaveAttribute(
        "tabindex",
        "0",
      );
    });

    it("label wins over aria-label; <label for> and aria-describedby are forwarded", async () => {
      const el = await mount<El>(
        `<label for="tp">Arrival</label><span id="desc">Local time</span>
         <minerva-time-picker id="tp" aria-describedby="desc"></minerva-time-picker>`,
        "minerva-time-picker",
      );
      expect(field(el)).toHaveAttribute("aria-label", "Arrival");
      expect(field(el)).toHaveAttribute("aria-description", "Local time");
      el.setAttribute("aria-label", "Departure");
      await settle();
      expect(field(el)).toHaveAttribute("aria-label", "Departure");
      el.label = "Start";
      await el.updateComplete;
      expect(field(el)).toHaveAttribute("aria-label", "Start");
    });
  });

  describe("form association", () => {
    it("submits the value, validates required with a localized message and resets", async () => {
      document.body.innerHTML = `<form lang="fr"><minerva-time-picker name="start" value="09:30" required></minerva-time-picker></form>`;
      await settle();
      const form = document.querySelector("form")!;
      const el = form.querySelector<El>("minerva-time-picker")!;
      expect(new FormData(form).get("start")).toBe("09:30:00");
      expect(el.checkValidity()).toBe(true);

      await userEvent.click($(el, "[part=clear-button]"));
      await settle();
      expect(el.value).toBe("");
      expect(new FormData(form).get("start")).toBe("");
      expect(el.checkValidity()).toBe(false);
      expect(el.validity?.valueMissing).toBe(true);
      expect(el.validationMessage).toBe("Veuillez renseigner ce champ.");
      expect(form.checkValidity()).toBe(false);

      form.reset();
      await settle();
      expect(el.value).toBe("09:30");
      expect(field(el).value).toBe("09:30:00");
      expect(el.checkValidity()).toBe(true);
    });

    it("submits HH:mm when seconds are neither shown nor formatted", async () => {
      document.body.innerHTML = `<form><minerva-time-picker name="t" value="07:45:10" hide-second format="HH:mm"></minerva-time-picker></form>`;
      await settle();
      expect(new FormData(document.querySelector("form")!).get("t")).toBe(
        "07:45",
      );
    });

    it("is not submitted nor validated while disabled (also by a fieldset)", async () => {
      document.body.innerHTML = `<form><fieldset disabled><minerva-time-picker name="a" value="10:00" required></minerva-time-picker></fieldset></form>`;
      await settle();
      const el = document.querySelector<El>("minerva-time-picker")!;
      el.formDisabledCallback(true); // the polyfill does not observe fieldsets
      await el.updateComplete;
      expect(field(el).disabled).toBe(true);
      expect(new FormData(document.querySelector("form")!).get("a")).toBeNull();
      el.formDisabledCallback(false);
      el.disabled = true;
      el.value = "";
      await el.updateComplete;
      expect(el.checkValidity()).toBe(true);
    });

    it("restores the form state", async () => {
      const el = await mount<El>(`<minerva-time-picker></minerva-time-picker>`);
      el.formStateRestoreCallback("08:00:00");
      await el.updateComplete;
      expect(field(el).value).toBe("08:00:00");
    });

    it("the value attribute keeps driving value until the user edits it", async () => {
      const el = await mount<El>(
        `<minerva-time-picker value="08:00:00"></minerva-time-picker>`,
      );
      el.setAttribute("value", "09:00:00");
      await el.updateComplete;
      expect(el.value).toBe("09:00:00");
      await openWithClick(el);
      await userEvent.click(option(columns(el)[0], "11"));
      el.setAttribute("value", "12:00:00");
      await el.updateComplete;
      expect(el.value).toBe("11:00:00");
    });
  });

  describe("locale", () => {
    it("follows lang for the built-in texts", async () => {
      const el = await mount<El>(
        `<div lang="fr"><minerva-time-picker value="10:00:00"></minerva-time-picker></div>`,
        "minerva-time-picker",
      );
      expect(field(el).placeholder).toBe("Choisir l'heure");
      expect(field(el)).toHaveAttribute("aria-label", "Heure");
      expect($(el, "[part=clear-button]")).toHaveAttribute(
        "aria-label",
        "Effacer l'heure",
      );
      await openWithClick(el);
      expect(columns(el)[0]).toHaveAttribute("aria-label", "Heures");
      el.parentElement!.setAttribute("lang", "en");
      await settle();
      expect(field(el).placeholder).toBe("Select time");
    });

    it("follows <minerva-config locale>", async () => {
      await import("../../elements/config");
      const el = await mount<El>(
        `<minerva-config locale="fr"><minerva-time-picker></minerva-time-picker></minerva-config>`,
        "minerva-time-picker",
      );
      expect(field(el).placeholder).toBe("Choisir l'heure");
    });
  });

  describe("dev warnings", () => {
    it("warns when min-time is later than max-time", async () => {
      const warn = vi.spyOn(console, "error").mockImplementation(() => {});
      await mount(
        `<minerva-time-picker min-time="18:00" max-time="09:00"></minerva-time-picker>`,
      );
      expect(warn).toHaveBeenCalledWith(
        expect.stringContaining("min-time (18:00) is later than max-time"),
      );
    });

    it("warns about a value that is not a 24-hour time", async () => {
      const warn = vi.spyOn(console, "error").mockImplementation(() => {});
      await mount(`<minerva-time-picker value="9am"></minerva-time-picker>`);
      expect(warn).toHaveBeenCalledWith(
        expect.stringContaining('value "9am" is not a valid time'),
      );
    });

    it("does not warn for valid attributes", async () => {
      const warn = vi.spyOn(console, "error").mockImplementation(() => {});
      await mount(
        `<minerva-time-picker value="10:00" min-time="09:00" max-time="18:00"></minerva-time-picker>`,
      );
      expect(warn).not.toHaveBeenCalled();
    });
  });
});

describe("time-picker utils", () => {
  it("formats with tokens", () => {
    const date = new Date(2024, 0, 1, 13, 5, 9);
    expect(formatTime(date, "HH:mm:ss")).toBe("13:05:09");
    expect(formatTime(date, "h:m:s a")).toBe("1:5:9 PM");
  });

  it("parses strictly or leniently", () => {
    expect(parseTimeInput("12:3", "HH:mm", { strict: true })).toBeUndefined();
    expect(
      parseTimeInput("1:2:3", "HH:mm:ss", { strict: false })?.getHours(),
    ).toBe(1);
    expect(
      parseTimeInput("12:00 AM", "hh:mm a", { strict: true })?.getHours(),
    ).toBe(0);
    expect(
      parseTimeInput("13:00", "hh:mm a", { strict: false }),
    ).toBeUndefined();
  });

  it("parses value strings", () => {
    expect(parseTimeValue("23:59:59")?.getSeconds()).toBe(59);
    expect(parseTimeValue("7:05")?.getHours()).toBe(7);
    expect(parseTimeValue("24:00")).toBeNull();
    expect(parseTimeValue("")).toBeNull();
  });
});
