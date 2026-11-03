// AutoComplete: typing filters, ArrowDown / Enter picks the active option,
// Escape closes, and the active-option rule of @minerva/core's
// `resolveActiveOptionIndex`: the highlight follows the option's `value`
// across option updates, is dropped when that option is gone or disabled,
// `autoHighlight` falls back to the first enabled option, and nothing hidden
// by `loading` is active or selectable. The active option is the one the
// combobox input's `aria-activedescendant` refers to.
import { afterEach, describe, expect } from "vitest";
import { contractOf, eventWith } from "../harness/contracts";
import { contractTest, declaredNotApplicable } from "../harness/suite";
import {
  h,
  type ComboboxReads,
  type Driver,
  type Handle,
} from "../harness/types";

interface Option {
  label: string;
  value: string;
  disabled?: boolean;
}

const ALPHA: Option = { label: "Alpha", value: "a" };
const BETA: Option = { label: "Beta", value: "b" };
const GAMMA: Option = { label: "Gamma", value: "c" };
const ABC = [ALPHA, BETA, GAMMA];

/** Dropdown exit animation (200ms) */
const EXIT = 300;

export function autoCompleteSuite(driver: Driver) {
  const SUITE = "AutoComplete active option";
  let handle: Handle | undefined;
  afterEach(async () => {
    await handle?.unmount();
    handle = undefined;
  });

  describe(SUITE, () => {
    if (declaredNotApplicable(driver, SUITE)) return;
    const select = eventWith(
      contractOf("AutoComplete"),
      "option",
      driver.platform,
    );

    const reads = (): ComboboxReads => {
      if (!driver.combobox)
        throw new Error(
          `The ${driver.platform} driver has no combobox reads: implement them or declare "${SUITE}" not applicable`,
        );
      return driver.combobox;
    };

    /** Renders the AutoComplete and opens it with a press on its input */
    const open = async (props: Record<string, unknown>) => {
      handle = await driver.render(
        h("AutoComplete", { label: "Search", ...props }),
      );
      const input = driver.getByRole("combobox");
      await driver.press(input);
      return { handle, input };
    };

    const labels = () =>
      driver.queryAllByRole("option").map((el) => el.textContent?.trim());

    /** Label of the active option, which must be a rendered option */
    const active = (input: Element): string | null => {
      if (input.getAttribute("aria-activedescendant") === null) return null;
      const option = reads().activeOption(input);
      expect(
        option,
        "aria-activedescendant refers to no element",
      ).not.toBeNull();
      expect(driver.queryAllByRole("option")).toContain(option);
      return option!.textContent?.trim() ?? "";
    };

    /** Moves the highlight down to `label` with ArrowDown */
    const highlight = async (input: Element, label: string) => {
      for (let i = 0; i < ABC.length && active(input) !== label; i++)
        await driver.keyboard("{ArrowDown}");
      expect(active(input)).toBe(label);
    };

    const selected = () =>
      handle!.emitted(select.name, "AutoComplete").map((e) => e.detail);

    for (const autoHighlight of [false, true]) {
      contractTest(
        driver,
        SUITE,
        `loading blocks a previous highlight until replacement results arrive (autoHighlight=${autoHighlight})`,
        async () => {
          const { handle, input } = await open({
            options: ABC,
            autoHighlight,
            loading: false,
          });
          await highlight(input, "Beta");
          await handle.setProps({ loading: true });
          expect(labels()).toEqual([]);
          expect(active(input)).toBeNull();
          await driver.keyboard("{ArrowDown}{Enter}");
          expect(selected()).toEqual([]);
          await handle.setProps({ options: [GAMMA], loading: false });
          expect(labels()).toEqual(["Gamma"]);
          expect(active(input)).toBe(autoHighlight ? "Gamma" : null);
          await driver.keyboard("{Enter}");
          expect(selected()).toEqual(
            autoHighlight ? [{ value: "c", option: GAMMA }] : [],
          );
        },
      );
    }

    contractTest(
      driver,
      SUITE,
      "autoHighlight has no fallback when every replacement option is disabled",
      async () => {
        const { handle, input } = await open({
          options: ABC,
          autoHighlight: true,
        });
        await handle.setProps({
          options: ABC.map((option) => ({ ...option, disabled: true })),
        });
        expect(active(input)).toBeNull();
        await driver.keyboard("{ArrowDown}{ArrowUp}{Enter}");
        expect(selected()).toEqual([]);
      },
    );

    contractTest(
      driver,
      SUITE,
      driver.platform === "wc" || driver.platform === "angular"
        ? "element/model-owned text can be restored by the parent after a selection"
        : driver.platform === "uni"
          ? "native input text can be restored while option fills remain controlled"
          : "controlled parent rejection preserves the value after typing and selection requests",
      async () => {
        const { handle, input } = await open({
          options: ABC,
          value: "",
          onChange: () => {},
        });
        await driver.type(input, "x");
        expect(reads().inputValue(input)).toBe(
          ["wc", "angular", "uni"].includes(driver.platform) ? "x" : "",
        );
        const change = eventWith(
          contractOf("AutoComplete"),
          "value",
          driver.platform,
        );
        expect(
          handle.emitted(change.name, "AutoComplete").at(-1)?.detail,
        ).toEqual({ value: "x" });
        // Native hosts / Angular models require an actual parent value change;
        // rebinding the unchanged value does not rewrite their live input.
        await handle.setProps({ value: "Alpha" });
        await handle.setProps({ value: "" });
        await highlight(input, "Beta");
        await driver.keyboard("{Enter}");
        expect(selected()).toEqual([{ value: "b", option: BETA }]);
        expect(reads().inputValue(input)).toBe(
          driver.platform === "wc" || driver.platform === "angular"
            ? "Beta"
            : "",
        );
        await handle.setProps({ value: "Alpha" });
        expect(reads().inputValue(input)).toBe("Alpha");
        await handle.setProps({ value: "" });
        expect(reads().inputValue(input)).toBe("");
        expect(selected()).toHaveLength(1);
      },
    );

    contractTest(
      driver,
      SUITE,
      "IME composition owns arrows, Enter and Escape until composition ends",
      async () => {
        const { input } = await open({ options: ABC });
        await highlight(input, "Beta");
        if (!driver.composition)
          throw new Error(
            `${driver.platform} needs a composition event adapter`,
          );
        await driver.composition(input, "start");
        await driver.keyboard("{ArrowDown}{Enter}{Escape}");
        expect(active(input)).toBe("Beta");
        expect(input.getAttribute("aria-expanded")).toBe("true");
        expect(selected()).toEqual([]);
        await driver.composition(input, "end");
        await driver.keyboard("{Enter}");
        expect(selected()).toEqual([{ value: "b", option: BETA }]);
      },
    );

    for (const state of ["disabled", "readOnly"]) {
      contractTest(
        driver,
        SUITE,
        `${state} transition closes the dropdown and blocks selection until unlocked`,
        async () => {
          // React / Vue expose the input state through inputProps; Angular / WC
          // expose it on the component. uni-app accepts both API shapes.
          const lock = (value: boolean) =>
            driver.platform === "react" || driver.platform === "vue"
              ? { inputProps: { [state]: value } }
              : { [state]: value };
          const { handle, input } = await open({
            options: ABC,
            ...lock(false),
          });
          await highlight(input, "Beta");
          await handle.setProps(lock(true));
          await driver.settle(EXIT);
          expect(input.getAttribute("aria-expanded")).toBe("false");
          expect(active(input)).toBeNull();
          expect(labels()).toEqual([]);
          await driver.keyboard("{ArrowDown}{Enter}");
          expect(selected()).toEqual([]);
          expect(reads().inputValue(input)).toBe("");
          await handle.setProps(lock(false));
          await driver.press(input);
          await highlight(input, "Alpha");
          await driver.keyboard("{Enter}");
          expect(selected()).toEqual([{ value: "a", option: ALPHA }]);
        },
      );
    }

    contractTest(driver, SUITE, "typing filters the options", async () => {
      const { input } = await open({ options: ABC });
      expect(labels()).toEqual(["Alpha", "Beta", "Gamma"]);
      await driver.type(input, "mm");
      expect(labels()).toEqual(["Gamma"]);
    });

    contractTest(
      driver,
      SUITE,
      "ArrowDown / Enter selects the active option and emits it",
      async () => {
        const { input } = await open({ options: ABC });
        expect(active(input)).toBeNull();
        await driver.keyboard("{ArrowDown}");
        expect(active(input)).toBe("Alpha");
        await driver.keyboard("{ArrowDown}");
        expect(active(input)).toBe("Beta");
        await driver.keyboard("{Enter}");
        expect(selected()).toEqual([{ value: "b", option: BETA }]);
        expect(reads().inputValue(input)).toBe("Beta");
      },
    );

    contractTest(driver, SUITE, "Escape closes the dropdown", async () => {
      const { input } = await open({ options: ABC });
      expect(input.getAttribute("aria-expanded")).toBe("true");
      expect(labels()).toHaveLength(3);
      await driver.keyboard("{Escape}");
      await driver.settle(EXIT);
      expect(input.getAttribute("aria-expanded")).toBe("false");
      expect(labels()).toEqual([]);
      expect(selected()).toEqual([]);
    });

    contractTest(
      driver,
      SUITE,
      "while loading hides the options, none is active or selectable",
      async () => {
        const { input } = await open({
          options: [{ label: "Old result", value: "old" }],
          loading: true,
          autoHighlight: true,
        });
        expect(labels()).toEqual([]);
        expect(active(input)).toBeNull();
        await driver.keyboard("{ArrowDown}{Enter}");
        expect(active(input)).toBeNull();
        expect(selected()).toEqual([]);
        expect(reads().inputValue(input)).toBe("");
      },
    );

    contractTest(
      driver,
      SUITE,
      "options shrinking below the highlight fall back to the first option with autoHighlight",
      async () => {
        const { handle, input } = await open({
          options: ABC,
          autoHighlight: true,
        });
        expect(active(input)).toBe("Alpha");
        await highlight(input, "Gamma");
        await handle.setProps({ options: [ALPHA] });
        expect(labels()).toEqual(["Alpha"]);
        expect(active(input)).toBe("Alpha");
        await driver.keyboard("{Enter}");
        expect(selected()).toEqual([{ value: "a", option: ALPHA }]);
      },
    );

    for (const autoHighlight of [false, true]) {
      const variant = autoHighlight ? "with" : "without";

      contractTest(
        driver,
        SUITE,
        `reordered options keep the highlight on the same value (${variant} autoHighlight)`,
        async () => {
          const { handle, input } = await open({ options: ABC, autoHighlight });
          await highlight(input, "Beta");
          // new objects, same values: identity is the option's value
          await handle.setProps({
            options: [GAMMA, ALPHA, BETA].map((option) => ({ ...option })),
          });
          expect(labels()).toEqual(["Gamma", "Alpha", "Beta"]);
          expect(active(input)).toBe("Beta");
          await driver.keyboard("{Enter}");
          expect(selected()).toEqual([{ value: "b", option: BETA }]);
        },
      );

      contractTest(
        driver,
        SUITE,
        `a highlighted option that becomes disabled ${
          autoHighlight
            ? "falls back to the first enabled option"
            : "clears the highlight"
        } (${variant} autoHighlight)`,
        async () => {
          const { handle, input } = await open({ options: ABC, autoHighlight });
          await highlight(input, "Beta");
          await handle.setProps({
            options: [ALPHA, { ...BETA, disabled: true }, GAMMA],
          });
          expect(labels()).toEqual(["Alpha", "Beta", "Gamma"]);
          expect(active(input)).toBe(autoHighlight ? "Alpha" : null);
          await driver.keyboard("{Enter}");
          expect(selected()).toEqual(
            autoHighlight ? [{ value: "a", option: ALPHA }] : [],
          );
        },
      );
    }

    contractTest(
      driver,
      SUITE,
      "without autoHighlight, removing the highlighted option leaves none active",
      async () => {
        const { handle, input } = await open({ options: ABC });
        await highlight(input, "Gamma");
        await handle.setProps({ options: [ALPHA, BETA] });
        expect(labels()).toEqual(["Alpha", "Beta"]);
        expect(active(input)).toBeNull();
        await driver.keyboard("{Enter}");
        expect(selected()).toEqual([]);
        expect(reads().inputValue(input)).toBe("");
      },
    );
  });
}
