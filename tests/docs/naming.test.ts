// Library-wide naming convention of position / placement values: kebab-case
// (`"top-right"`, `"bottom-start"`), in React and Web Components alike.
import { describe, expect, it } from "vitest";
import {
  generateApi,
  generateElements,
} from "../../packages/sample/scripts/generate-api.mjs";

const api = { ...generateApi(), ...generateElements() } as Record<
  string,
  {
    props?: { name: string; type?: string }[];
    properties?: { name: string; type?: string }[];
  }
>;
const CAMEL_PLACEMENT =
  /"(top|bottom|left|right)(Left|Right|Center|Start|End)"/;

describe("placement values", () => {
  it("are kebab-case everywhere", () => {
    const offenders: string[] = [];
    for (const [key, entry] of Object.entries(api)) {
      const alias = (entry as { type?: string }).type;
      if (CAMEL_PLACEMENT.test(alias ?? "")) offenders.push(`${key}: ${alias}`);
      for (const member of [
        ...(entry.props ?? []),
        ...(entry.properties ?? []),
      ]) {
        if (CAMEL_PLACEMENT.test(member.type ?? "")) {
          offenders.push(`${key}.${member.name}: ${member.type}`);
        }
      }
    }
    expect(offenders).toEqual([]);
  });

  it("toast positions use the same vocabulary as overlay placements", () => {
    const toast = api.ToastProviderProps.props!.find(
      (p) => p.name === "position",
    )!;
    const element = api["wc:minerva-toast-region"].properties!.find(
      (p) => p.name === "position",
    )!;
    const alias = api.ToastPosition as unknown as { type?: string };
    for (const type of [alias.type ?? toast.type, element.type]) {
      expect(type).toContain('"top-right"');
      expect(type).toContain('"bottom-center"');
    }
  });
});
