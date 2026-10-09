// minerva-design/native against the component contracts: a native component
// implementing a contract (packages/native/src/manifest.ts) uses the same
// prop names with the same literal defaults and enum values as the web
// renderers, except the reviewed mobile differences below.
import { describe, expect, it } from "vitest";
import { readNative } from "../../tools/generate-contracts.mjs";
import { getContract, getSupport } from "../../packages/core/src/contracts";
import { NATIVE_COMPONENTS } from "../../packages/native/src/manifest";

/**
 * `<NativeComponent>.<prop>`: why the default / values differ on mobile
 * (kept in sync with the React Native docs)
 */
const NATIVE_DIFFERENCES: Record<string, string> = {
  "CodeBlock.maxHeight":
    "384 device-independent pixels on native; the web 24rem default is the same height at its 16px root baseline. Native has no CSS rem unit.",
  "ToastProvider.position":
    "full-width mobile toasts: top / center / bottom (default top); the web corner values are accepted and map to top or bottom",
  "Progress.variant":
    "value-based line / circle progress; spinners are Loading (LoadingState)",
  "Progress.color":
    "semantic colors of the bar (the web indicator uses current / neutral / primary)",
  "Popup.side":
    "alias of `placement`, whose mobile default is bottom (bottom sheet) instead of the web drawer's right side",
  "DrawerContent.side":
    "the composition form of the native Popup uses its same bottom-sheet default; pass side=right for the web drawer's default placement",
  "Skeleton.size":
    "no implicit 32px circle: circular skeletons take `size`, else width / height",
  "FormField.invalid":
    "follows the validation result when unset (the web field defaults to false and is driven by the form)",
};

const native = readNative();

describe("React Native contract parity", () => {
  const implemented = NATIVE_COMPONENTS.filter((c) => c.contract !== null);

  it("extracts actual callable props for aliases and composition parts without named Props exports", () => {
    expect(
      native
        .get("ThemeProvider")
        ?.props.map((prop: { name: string }) => prop.name),
    ).toContain("theme");
    expect(native.get("SelectLabel")?.children).toBe(true);
    expect(native.get("TableRoot")).toBeDefined();
  });

  it.each(implemented.map((c) => [c.name, c] as const))(
    "%s: same defaults and enum values as its contract",
    (name, component) => {
      const contract = getContract(component.contract!);
      expect(contract, component.contract!).toBeDefined();
      expect(getSupport(contract!, "native").status).toBe("beta");
      const props = native.get(name)?.props;
      expect(props, `${name}Props`).toBeDefined();
      const mismatches: string[] = [];
      for (const prop of props!) {
        const shared = contract!.props.find(
          (p) => p.name === prop.name && p.only !== "wc",
        );
        if (!shared || NATIVE_DIFFERENCES[`${name}.${prop.name}`]) continue;
        if (
          shared.default !== undefined &&
          JSON.stringify(shared.default) !== JSON.stringify(prop.default)
        )
          mismatches.push(
            `${prop.name}: default ${JSON.stringify(prop.default)} (web ${JSON.stringify(shared.default)})`,
          );
        if (
          shared.values &&
          prop.values &&
          !prop.values.every((v: string) => shared.values!.includes(v))
        )
          mismatches.push(`${prop.name}: values ${prop.values.join("|")}`);
      }
      expect(mismatches).toEqual([]);
    },
  );

  it("every documented difference is a real prop of the native component", () => {
    for (const key of Object.keys(NATIVE_DIFFERENCES)) {
      const [name, prop] = key.split(".");
      expect(
        native.get(name)?.props.some((p: { name: string }) => p.name === prop),
        key,
      ).toBe(true);
    }
  });

  it("native-only components have a toC contract of their own", () => {
    for (const component of NATIVE_COMPONENTS.filter((c) => !c.contract)) {
      const contract = getContract(component.name);
      expect(contract, component.name).toBeDefined();
      expect(contract!.tracks).toEqual(["toC"]);
      expect(contract!.platforms.native.status).toBe("beta");
      expect(contract!.platforms.react.status).toBe("n/a");
      expect(contract!.platforms.wc.status).toBe("n/a");
    }
  });
});
