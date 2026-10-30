import { act, render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MinervaProvider } from "../../theme/MinervaProvider";
import { DonutChart, RadarChart } from "./index";

const q = (part: string) =>
  document.querySelector(`[data-minerva="chart"][data-part="${part}"]`);

const flush = () =>
  act(() => new Promise<void>((resolve) => setTimeout(resolve, 40)));

describe("shape charts on react-native-web", () => {
  it("renders a donut as clipped, rotated elements", async () => {
    render(
      <MinervaProvider theme="light">
        <DonutChart
          width={360}
          height={240}
          ariaLabel="Traffic"
          data={[
            { name: "Search", value: 5 },
            { name: "Direct", value: 3 },
            { name: "Social", value: 2 },
          ]}
          centerValue="10"
          animation={false}
        />
      </MinervaProvider>,
    );
    await flush();
    const surface = q("surface")!;
    expect(surface.getAttribute("role")).toBe("img");
    expect(surface.getAttribute("aria-label")).toBe("Traffic");
    expect(document.body.textContent).toContain("Search");
    expect(document.body.textContent).toContain("10");
    const divs = [...surface.querySelectorAll("div")];
    const css = (d: HTMLElement) => getComputedStyle(d);
    // half-plane clips of the segments
    const clips = divs.filter(
      (d) =>
        css(d).overflowX === "hidden" && css(d).transform.includes("rotate"),
    );
    expect(clips.length).toBeGreaterThan(0);
    // placed by an exact translation, not by layout offsets the browser would
    // round before the rotation (steps at the segment ends)
    for (const clip of clips) {
      expect(clip.style.left).toBe("0px");
      expect(clip.style.transform).toMatch(
        /^translateX\(-?[\d.]+px\) translateY\(-?[\d.]+px\) rotate\(/,
      );
      expect(Number.isInteger(parseFloat(clip.style.width))).toBe(true);
    }
    // the ring of a segment: a round bordered element
    expect(
      divs.some(
        (d) =>
          parseFloat(css(d).borderRadius) > 0 &&
          parseFloat(css(d).borderTopWidth) > 1,
      ),
    ).toBe(true);
  });

  it("renders a radar with translucent groups", async () => {
    render(
      <MinervaProvider theme="dark">
        <RadarChart
          width={360}
          height={280}
          indicators={[
            { name: "Speed" },
            { name: "Power" },
            { name: "Range" },
            { name: "Cost" },
            { name: "Comfort" },
          ]}
          series={[
            { name: "A", values: [3, 4, 2, 5, 1] },
            { name: "B", values: [2, 1, 4, 3, 5] },
          ]}
          animation={false}
        />
      </MinervaProvider>,
    );
    await flush();
    expect(document.body.textContent).toContain("Comfort");
    const divs = [...q("surface")!.querySelectorAll("div")];
    expect(divs.some((d) => d.style.opacity && +d.style.opacity < 1)).toBe(
      true,
    );
  });
});
