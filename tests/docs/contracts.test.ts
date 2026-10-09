// Component contracts (@minerva/core/contracts) against their sources: the
// committed packages/core/src/contracts/components.generated.json must equal
// a fresh run of tools/generate-contracts.mjs (so a React prop, element
// attribute or event change without `pnpm gen:contracts` fails here), and
// the React and Web Components sides of each contract must agree on enum
// values and literal defaults (the documented exceptions below aside).
// The per-name differences reviewed in parity-differences.json must show up
// in the contracts as one-platform props / events.
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import {
  CONTRACTS_OUTPUT,
  SUPPORT_OUTPUT,
  projectSupport,
  TAG_TO_REACT,
  generateContracts,
  literal,
  readElements,
  readReact,
  serializeContracts,
} from "../../tools/generate-contracts.mjs";
import {
  componentContracts,
  getContract,
} from "../../packages/core/src/contracts";
import { readJson } from "./utils";
import { NATIVE_COMPONENTS } from "../../packages/native/src/manifest";

/**
 * Same prop, different declared default or values on purpose
 * (`<tag>.<prop>`: reason). Keep in sync with tests/docs/parity.test.ts.
 */
const EXPECTED_DIFFERENCES: Record<string, string> = {
  "minerva-app-shell.skipLink":
    "text of the always-rendered skip link (React: boolean | text)",
  "minerva-skeleton.size": "circular placeholder falls back to 32px",
  "minerva-tooltip.enterDelay": "provider, then 200ms",
  "minerva-tooltip.leaveDelay": "provider, then 0ms",
  "minerva-hstack.direction": "fixed by the element (React omits the prop)",
  "minerva-vstack.direction": "fixed by the element (React omits the prop)",
};

const contracts = generateContracts();
const react = readReact();
const elements = readElements();

describe("component contracts", () => {
  it("ships an up-to-date support projection without unused component API payloads", async () => {
    const current = readFileSync(SUPPORT_OUTPUT, "utf8");
    expect(current).toBe(await serializeContracts(projectSupport(contracts)));
    expect(JSON.parse(current)).toEqual(projectSupport(contracts));
    for (const entry of JSON.parse(current)) {
      expect(entry).not.toHaveProperty("props");
      expect(entry).not.toHaveProperty("events");
      expect(entry).not.toHaveProperty("slots");
    }
  });
  it("does not advertise native-specific extensions as unfinished web components", () => {
    for (const extension of NATIVE_COMPONENTS.filter(
      (entry) => entry.contract === null,
    )) {
      const contract = contracts.find(
        (entry) => entry.name === extension.name,
      )!;
      for (const platform of ["react", "wc", "vue", "angular"] as const) {
        expect(
          contract.platforms[platform].status,
          `${extension.name}/${platform}`,
        ).toBe("n/a");
        expect(contract.platforms[platform].notes).toBeTruthy();
      }
    }
  });
  it("components.generated.json is up to date (run `pnpm gen:contracts`)", async () => {
    const current = readFileSync(CONTRACTS_OUTPUT, "utf8");
    expect(current === (await serializeContracts(contracts))).toBe(true);
    expect(componentContracts).toEqual(JSON.parse(current));
  });

  it("covers every React component and every custom element", () => {
    const names = new Set(contracts.map((c) => c.name));
    for (const name of react.keys()) expect(names).toContain(name);
    const tags = new Set(contracts.map((c) => c.tag));
    for (const tag of elements.keys()) expect(tags).toContain(tag);
  });

  it("React and Web Components agree on enum values and literal defaults", () => {
    const mismatches: string[] = [];
    for (const [tag, element] of elements) {
      const name = tag in TAG_TO_REACT ? TAG_TO_REACT[tag] : undefined;
      const contract = getContract(tag)!;
      const component = react.get(name ?? contract.name);
      if (name === null || !component) continue;
      for (const property of element.properties ?? []) {
        const prop = component.props.find((p) => p.name === property.name);
        if (!prop || EXPECTED_DIFFERENCES[`${tag}.${prop.name}`]) continue;
        const wcDefault = literal(property.default);
        if (
          prop.default !== undefined &&
          // attributes are strings: "40" is the number 40
          String(wcDefault) !== String(prop.default) &&
          // React `false` default, element property left undefined
          !(prop.default === false && property.default === undefined)
        )
          mismatches.push(
            `${tag}.${prop.name}: default ${property.default} (React ${JSON.stringify(prop.default)})`,
          );
        const merged = contract.props.find((p) => p.name === prop.name)!;
        if (prop.values && merged.values?.join() !== prop.values.join())
          mismatches.push(`${tag}.${prop.name}: values`);
      }
    }
    expect(mismatches).toEqual([]);
  });

  it("reflects the reviewed React <-> WC differences (parity-differences.json)", () => {
    const { differences } = readJson<{
      differences: Record<string, string[]>;
    }>("tests/docs/parity-differences.json");
    const wrong: string[] = [];
    for (const [tag, list] of Object.entries(differences)) {
      const contract = getContract(tag);
      if (!contract) {
        wrong.push(`${tag}: no contract`);
        continue;
      }
      for (const entry of list) {
        const [kind, name] = entry.split(" ");
        if (kind === "event") {
          const event = contract.events.find((e) => e.react === name);
          if (event?.wc) wrong.push(`${tag}: ${entry} maps to ${event.wc}`);
          continue;
        }
        const prop = contract.props.find((p) => p.name === name);
        // not contracts: React-only props declared by React's DOM types,
        // read-only element properties (DOM APIs such as `files`)
        if (!prop) {
          const readonly = elements
            .get(tag)
            ?.properties?.some((p) => p.name === name && p.readonly);
          if (kind === "wc-only" && !readonly)
            wrong.push(`${tag}: ${entry} missing`);
          continue;
        }
        const only = kind === "react-only" ? "react" : "wc";
        if (prop.only !== only) wrong.push(`${tag}: ${entry} not ${only}-only`);
      }
    }
    expect(wrong).toEqual([]);
  });
});
