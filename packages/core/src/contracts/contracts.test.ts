import { describe, expect, it } from "vitest";
import {
  PLATFORMS,
  componentContracts,
  contractsForTrack,
  getContract,
  getSupport,
  supportSummary,
} from "./index";

describe("component contracts", () => {
  it("lists every component once, sorted by name", () => {
    const names = componentContracts.map((c) => c.name);
    expect(names.length).toBeGreaterThan(100);
    expect(new Set(names).size).toBe(names.length);
    expect([...names].sort((a, b) => a.localeCompare(b))).toEqual(names);
    const tags = componentContracts.flatMap((c) => (c.tag ? [c.tag] : []));
    expect(new Set(tags).size).toBe(tags.length);
  });

  it("has a status on every platform: implemented platforms and explicitly planned components", () => {
    for (const contract of componentContracts) {
      expect(Object.keys(contract.platforms).sort()).toEqual(
        [...PLATFORMS].sort(),
      );
      for (const platform of ["react", "wc"] as const) {
        const { status, notes } = contract.platforms[platform];
        expect(["stable", "n/a"]).toContain(status);
        // not applicable is always explained
        if (status === "n/a") expect(notes).toBeTruthy();
      }
      expect(
        contract.platforms.react.status === "stable" ||
          contract.platforms.wc.status === "stable" ||
          contract.platforms.native.status === "beta",
      ).toBe(true);
      expect(contract.platforms.wc.status === "stable").toBe(!!contract.tag);
      for (const platform of PLATFORMS.slice(2))
        expect(["stable", "beta", "planned", "n/a"]).toContain(
          contract.platforms[platform].status,
        );
    }
  });

  it("describes props, events and slots consistently", () => {
    for (const contract of componentContracts) {
      expect(contract.tracks.length).toBeGreaterThan(0);
      if (contract.docs)
        expect(contract.descriptionKey).toBe(
          `docs.${contract.docs}.description`,
        );
      const props = contract.props.map((p) => p.name);
      expect(new Set(props).size, contract.name).toBe(props.length);
      for (const prop of contract.props) {
        if (prop.kind === "enum") {
          expect(prop.values?.length, `${contract.name}.${prop.name}`).toBe(
            new Set(prop.values).size,
          );
          if (typeof prop.default === "string")
            expect(prop.values).toContain(prop.default);
        } else {
          expect(prop.values).toBeUndefined();
        }
      }
      for (const event of contract.events)
        expect(event.react ?? event.wc ?? event.native).toBeTruthy();
    }
  });

  it("finds contracts by name or tag and summarizes support", () => {
    const button = getContract("Button")!;
    expect(getContract("minerva-button")).toBe(button);
    expect(getContract("Nope")).toBeUndefined();
    expect(getSupport(button, "react").status).toBe("stable");
    expect(getSupport(button, "vue").status).toBe("stable");
    expect(button.props.find((p) => p.name === "variant")).toMatchObject({
      kind: "enum",
      attribute: "variant",
    });

    const summary = supportSummary("vue");
    expect(summary.stable).toBeGreaterThan(0);
    expect(summary.beta).toBeGreaterThan(0);
    expect(Object.values(summary).reduce((a, b) => a + b, 0)).toBe(
      componentContracts.length,
    );
    expect(getSupport(getContract("DataTable")!, "taro").status).toBe(
      "planned",
    );
    expect(supportSummary("react").stable).toBeGreaterThan(90);

    const toB = contractsForTrack("toB");
    expect(toB.some((c) => c.name === "DataTable")).toBe(true);
    expect(toB.some((c) => c.name === "Rating")).toBe(false);
    expect(contractsForTrack()).toHaveLength(componentContracts.length);
  });
});
